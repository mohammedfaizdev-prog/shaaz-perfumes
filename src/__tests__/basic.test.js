// src/__tests__/basic.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';

// Create a simple MemoryRouter replacement without importing react-router-dom
const MockMemoryRouter = ({ children }) => <div data-testid="mock-router">{children}</div>;

describe('Basic Test Setup', () => {
  test('should render a component', () => {
    const TestComponent = () => <div data-testid="test">Test Component</div>;
    render(<TestComponent />);
    
    expect(screen.getByTestId('test')).toBeInTheDocument();
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  test('should render with mock router', () => {
    const TestComponent = () => <div data-testid="test">Router Test</div>;
    
    render(
      <MockMemoryRouter>
        <TestComponent />
      </MockMemoryRouter>
    );
    
    expect(screen.getByTestId('test')).toBeInTheDocument();
    expect(screen.getByText('Router Test')).toBeInTheDocument();
  });

  test('should handle basic math', () => {
    expect(1 + 1).toBe(2);
    expect(2 * 3).toBe(6);
    expect(10 / 2).toBe(5);
  });
});