// src/setupTests.js
import '@testing-library/jest-dom';

// Mock react-router-dom globally
jest.mock('react-router-dom', () => ({
  MemoryRouter: ({ children }) => <div data-testid="mock-router">{children}</div>,
  BrowserRouter: ({ children }) => <div>{children}</div>,
  HashRouter: ({ children }) => <div>{children}</div>,
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  NavLink: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Navigate: ({ to }) => <div>Navigate to {to}</div>,
  Outlet: () => <div>Outlet</div>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
  useParams: () => ({}),
  useMatch: () => null,
  useRoutes: () => null,
  createBrowserRouter: () => ({}),
  createRoutesFromElements: () => ({}),
  RouterProvider: ({ children }) => <div>{children}</div>,
}));

// Mock window.confirm
global.confirm = jest.fn(() => true);

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Suppress console errors
const originalError = console.error;
console.error = (...args) => {
  if (
    /Warning: ReactDOM.render is no longer supported/.test(args[0]) ||
    /Warning: useLayoutEffect does nothing on the server/.test(args[0]) ||
    /Warning: validateDOMNesting/.test(args[0]) ||
    /Warning: You are importing createRoot/.test(args[0]) ||
    /Warning: React.createElement/.test(args[0])
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// React 19 compatibility
global.IS_REACT_ACT_ENVIRONMENT = true;