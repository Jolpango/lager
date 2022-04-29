import { ScrollView, Button, View, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../../styles';
import OrderTable from '../OrderTable';
import orderModel from "../../models/order";
import MapView, { Marker } from 'react-native-maps';
import getCoordinates from '../../models/nominatim';
import * as Location from 'expo-location';

export default function ShippingDetails({navigation, route, setOrders}: any) {
  const [locationMarker, setLocationMarker] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocationMarker(<Marker
        coordinate={{
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude
        }}
        identifier="me"
        title="Min plats"
        pinColor="blue"
        />);
      })();
    }, []);
  const [errorMessage, setErrorMessage] = useState<string>();
  const {order} = route.params;
  const [marker, setMarker] = useState<any>(null);
  async function setupMarker() {
    // const results = await getCoordinates(`Fogdevägen 7a, Karlskrona`);
    const results = await getCoordinates(`${order.address}, ${order.city}`);
    setMarker(<Marker
      coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
      title={results[0].display_name}
      identifier="target"
      />);
  }
  useEffect(() => {
    setupMarker();
  }, [])
  async function sendOrder() {
    await orderModel.setOrderStatus(order, 400);
    setOrders(await orderModel.getOrders());
    navigation.navigate("ShippingList", {reload: true});
  }
  const mapRef = useRef<any>();
  useEffect(() => {
    const options = {
      edgePadding: {
        top: 200,
        right: 200,
        left: 200,
        bottom: 200
      },
      animated: true
    }
    mapRef.current.fitToSuppliedMarkers(["me", "target"], options);
  }, [marker, locationMarker])
  return (
    <ScrollView style={{...Colors.darkBackgroundColor}}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          ref={mapRef}
          initialRegion={{
            latitude: 56.1612,
            longitude: 15.5869,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }}
        >
          {marker}
          {locationMarker}
        </MapView>
      </View>
      <OrderTable order={order} />
      <Button
        title="Skicka order"
        color={Colors.primaryAccentColor.backgroundColor}
        onPress={sendOrder}
      />
      <View style={{padding: 10}}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  map: {
      ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    height: 300
  }
});
