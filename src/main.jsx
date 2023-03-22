import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Map from './assets/Map'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App/>
        <Map/>
    </React.StrictMode>,
)
