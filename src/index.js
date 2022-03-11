import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//store
import { Provider } from 'react-redux';
import store from './Store/store'
import { getOffersAction } from './Store/Actions/getOffers';
import { axiosInstance } from "./network/axiosInstance";


axiosInstance
.get(`/offers/`,)
.then((res) => store.dispatch(getOffersAction(res.data)))
.catch((err) => console.log(err));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);