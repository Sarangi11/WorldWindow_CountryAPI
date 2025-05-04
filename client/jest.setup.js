// jest.setup.js
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

// Polyfill TextEncoder/TextDecoder for React Router in JSDOM:
import { TextEncoder, TextDecoder } from 'util';

// eslint-disable-next-line no-undef
global.TextEncoder = TextEncoder;
// eslint-disable-next-line no-undef
global.TextDecoder = TextDecoder;

if (!ReactDOM.render) {
    ReactDOM.render = (element, container) => {
      const root = createRoot(container);
      root.render(element);
    };
  }