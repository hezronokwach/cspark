// Mock Lenis since it requires browser APIs not available in jsdom
jest.mock('lenis', () => {
  return jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    raf: jest.fn(),
    destroy: jest.fn(),
  }));
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CSPARK hero heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/Spatial Planning for/i);
  expect(linkElement).toBeInTheDocument();
});