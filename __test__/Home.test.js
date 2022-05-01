import { render } from '@testing-library/react-native';
import Home from '../components/Home';

jest.mock("../components/Stock", () => "Stock");

test('header should exist containing text "Skruvat Lager"', async () => {
    const { getByText } = render(<Home />);
    const header = await getByText('Skruvat Lager');

    expect(header).toBeDefined();
});