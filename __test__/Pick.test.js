import { render } from '@testing-library/react-native';
import OrderList from '../components/OrderList';
jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

test('Expect OrderList to only print orders with "Ny" as status', async () => {
    const orderList = [
        {id: 1, name: "Test", status: "Skickad"},
        {id: 2, name: "Test", status: "Ny"},
        {id: 3, name: "Test", status: "Fakturerad"},
        {id: 4, name: "Test", status: "Ny"},
        {id: 5, name: "Test", status: "Ny"},
        {id: 6, name: "Test", status: "Ny"},
        {id: 7, name: "Test", status: "Plockad"}
    ];
    const { queryAllByText } = render(<OrderList orders={orderList} />);
    const skickad = await queryAllByText('Skickad');
    const fakturerad = await queryAllByText('Fakturerad');
    const plockad = await queryAllByText('Plockad');
    const ny = await queryAllByText('Ny');

    expect(skickad).toStrictEqual([]);
    expect(fakturerad).toStrictEqual([]);
    expect(plockad).toStrictEqual([]);
    expect(ny.length).toStrictEqual(4);
});