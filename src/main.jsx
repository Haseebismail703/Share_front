import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Rou from './Root/Rou.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
    <Rou>
      <App />
    </Rou>
)
