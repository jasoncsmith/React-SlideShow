import { render, screen } from '@testing-library/react';
import App from '../../App';

test('renders learn react link', () => {
  render(<App />);
  const el = screen.getByText(/A small custom code demo written in React 18 using functional components/i);
  expect(el).toBeInTheDocument();
});
