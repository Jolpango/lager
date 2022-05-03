import { render } from '@testing-library/react-native';
import OrderTable from '../components/OrderTable';
jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

test('Expect OrderTable to print order information correctly ', async () => {
    const order = {
        id: 1,
        name: "TestName",
        address: "TestAddress",
        city: "TestCity",
        zip: "TestZip",
        order_items: [
            {
                name: "TestItem",
                amount: 1,
                location: "TestLocation"
            }
        ]
    }
    const { getByText } = render(<OrderTable order={order} />)
    const name = getByText("TestName");
    const address = getByText("TestAddress");
    const city = getByText("TestCity/TestZip");
    const itemName = getByText("TestItem");
    const itemAmount = getByText("1");
    const itemLocation = getByText("TestLocation");

    expect(name).toBeDefined();
    expect(address).toBeDefined();
    expect(city).toBeDefined();
    expect(itemName).toBeDefined();
    expect(itemAmount).toBeDefined();
    expect(itemLocation).toBeDefined();
});