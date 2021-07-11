import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { Loading } from './layout/Loading';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
        <React.Suspense fallback={<Loading/>}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
