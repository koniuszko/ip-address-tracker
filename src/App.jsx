import './App.css'
import arrowIcon from './images/icon-arrow.svg'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";


function App() {
    // const map = L.map('map', {
    //     center: [51.505, -0.09],
    //     zoom: 13
    // });
    return (
        <div className="App">
            <header className="banner">
                <h1>IP Address Tracker</h1>
                <form>
                    <input type="text" placeholder="Search for any IP Address or domain"/>
                    <button>
                        <img src={arrowIcon} alt="arrow-icon"/>
                    </button>
                </form>
                <div className="container">
                    <div className="border flex-item">
                        <p>ip address</p>
                        <h2>192.212.174.101</h2>
                    </div>
                    <div className="border flex-item">
                        <p>location</p>
                        <h2>Brooklyn, NY 10001</h2>
                    </div>
                    <div className="border flex-item">
                        <p>timezone</p>
                        <h2>UTC -05:00</h2>
                    </div>
                    <div className="flex-item">
                        <p>isp</p>
                        <h2>SpaceX Starlink</h2>
                    </div>
                </div>
            </header>
            <div id="map">
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}

export default App
