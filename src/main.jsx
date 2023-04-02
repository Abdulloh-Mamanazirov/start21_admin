import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ToastContainer } from "react-toastify";

// css
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import axios from 'axios';

// axios
axios.defaults.headers.common['Content-Type'] = "application/json"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  <ToastContainer theme='colored'/>
  </BrowserRouter>,
)
