import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './stylescss.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  FpjsProvider,
  FingerprintJSPro
} from '@fingerprintjs/fingerprintjs-pro-react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <FpjsProvider
      loadOptions={{
        apiKey:"8BwlBvMUhSHtuEdQzK3j",
        endpoint: [ 
          FingerprintJSPro.defaultEndpoint
        ],
        scriptUrlPattern: [
          FingerprintJSPro.defaultScriptUrlPattern
        ],
      }}
    >
    <App />
    </FpjsProvider>
  </React.StrictMode>
);
reportWebVitals();
