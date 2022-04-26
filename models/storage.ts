import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    storeToken: async function(token: string) {
        try {
            const tokenAndDate = {
                token: token,
                date: new Date().getTime()
            }
            const jsonValue = JSON.stringify(tokenAndDate);
            await AsyncStorage.setItem("@token", jsonValue);
        } catch (e) {
            //Handle error
        }
    },
    readToken: async function(): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem("@token");
            return jsonValue !== null ? JSON.parse(jsonValue) : null
        } catch (e) {
            //Handle error
        }
    },
    deleteToken: async function(): Promise<void> {
        await AsyncStorage.removeItem("@token");
    }
};

export default storage;
