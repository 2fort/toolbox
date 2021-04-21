import { render, cleanup } from '../../test-utils';
import Header from './Header';

afterEach(cleanup);

test('renders header', () => {
  const { getByText } = render(<Header />);
  const logo = getByText(/Toolbox/i);
  expect(logo).toBeInTheDocument();
});
