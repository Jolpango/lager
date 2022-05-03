import { render } from '@testing-library/react-native';
import DeliveryList from '../components/DeliveryList';
jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


test('When passing empty list to deliverylist there should be text saying "Inga inleveranser"', async () => {
    const { getByText } = render(<DeliveryList deliveries={[]} />);
    const header = await getByText('Inga inleveranser');

    expect(header).toBeDefined();
});