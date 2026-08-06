// Mock Lenis since it requires browser APIs not available in jsdom
jest.mock('lenis', () => {
  return jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    raf: jest.fn(),
    destroy: jest.fn(),
  }));
});

jest.mock('gsap', () => ({
  __esModule: true,
  default: {
    registerPlugin: jest.fn(),
    ticker: { add: jest.fn(), remove: jest.fn(), lagSmoothing: jest.fn() },
    context: jest.fn((callback) => { callback(); return { revert: jest.fn() }; }),
    fromTo: jest.fn(),
    to: jest.fn(),
  },
}));

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the CSPARK planning hero', () => {
  render(<App />);
  const linkElement = screen.getByText(/Land and cities are public questions/i);
  expect(linkElement).toBeInTheDocument();
});
