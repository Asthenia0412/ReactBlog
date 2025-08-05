import { render, screen } from '@testing-library/react';
import App from './App';

test('renders 博客列表 menu', () => {
  render(<App />);
  const menuElement = screen.getByText(/博客列表/i);
  expect(menuElement).toBeInTheDocument();
});
