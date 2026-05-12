import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders training heading', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/click anywhere to deploy/i));
  const heading = screen.getByText(/stratagem training/i);
  expect(heading).toBeInTheDocument();
});
