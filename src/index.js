import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import axios from 'axios'
axios.defaults.baseURL = 'https://outline-app-api.herokuapp.com/'
axios.defaults.headers.common['Authorization']= 'Bearer ' + localStorage.getItem('token')
ReactDOM.render(<App />, document.querySelector('#root'));