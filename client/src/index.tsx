import ReactDOM from 'react-dom';

/** Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app/layout/styles.css";


/** Components */
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import ScrollToTop from './app/layout/ScrollToTop';

/** Routing */
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

/** Store */
import { store, StoreContext } from './app/stores/store';


export const history = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>    
        <ScrollToTop />
        <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
