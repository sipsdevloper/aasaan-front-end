// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { usePromiseTracker } from "react-promise-tracker";
import {ThreeDots} from "react-loader-spinner";
//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------
const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && 
    <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
       >
          <ThreeDots color="#2BAD60" height="100" width="100" />
        </div>

    );  
   }
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
     {/* <BrowserRouter basename='/vts-web-portal'> */}
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
