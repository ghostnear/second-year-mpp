import { render, screen } from '@testing-library/react';
import App from './App';

test('renders item list', () => {
  render(<App />);
  const linkElement = screen.getByText(/Item List/i);
  expect(linkElement).toBeInTheDocument();
});
