import { render, cleanup } from '../../test-utils';
import Header from './Header';

afterEach(cleanup);

test('renders header', () => {
  const { getByText } = render(<Header />);
  const button1 = getByText(/Main/i);
  expect(button1).toBeInTheDocument();
});
