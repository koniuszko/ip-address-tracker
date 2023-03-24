import './App.css'
import arrowIcon from './images/icon-arrow.svg'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {Icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locIcon from './images/icon-location.svg'
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    const [ipAddress, setIpAddress] = useState('');
    const [myIp, setMyIp] = useState('');
    const [ipData, setIpData] = useState({
        ip: "",
        isp: "",
        location: {
            city: "",
            region: "",
            timezone: "",
            lat: 0,
            lng: 0
        }
    });

    const position = [ipData.location.lat, ipData.location.lng]

    // --- (6) Create a custom marker ---
    const customIcon = new Icon({
        iconUrl: locIcon,
        iconSize: [25, 25],
        iconAnchor: [1, 1],
        popupAnchor: [-0, 0]
    })


    useEffect(() => {
        let myIp = "";
        axios.get('https://geolocation-db.com/json/').then((res) => myIp = res.data.IPv4)
        axios.get(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_bNOqPuYzkRFWBQ9skGpsQ88BwDwDm&ipAddress=${myIp}`)
            .then((response) => {
                setIpData(response.data)
                console.log(response.data)
            })
    }, []);


    const ipCheck = (e) => {
        e.preventDefault()
        axios.get(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_bNOqPuYzkRFWBQ9skGpsQ88BwDwDm&ipAddress=${ipAddress}`)
            .then((response) => {
                setIpData(response.data)
            }).catch(err => alert("IP Address seems to be wrong."))
    }

    return (
        <div className="App">
            <header className="banner">
                <h1>IP Address Tracker</h1>
                <form>
                    <input value={ipAddress} onChange={e => setIpAddress(e.target.value)} type="text"
                           placeholder="Search for any IP Address or domain"/>
                    <button onClick={e => ipCheck(e)}>
                        <img src={arrowIcon} alt="arrow-icon"/>
                    </button>
                </form>
                <div className="container">
                    <div className="border flex-item">
                        <p>ip address</p>
                        <h2>{ipData ? ipData.ip : ""}</h2>
                    </div>
                    <div className="border flex-item">
                        <p>location</p>
                        <h2>{ipData ? `${ipData.location.city}, ${ipData.location.region}` : ""}</h2>
                    </div>
                    <div className="border flex-item">
                        <p>timezone</p>
                        <h2>UTC {ipData ? ipData.location.timezone : "00:00"}</h2>
                    </div>
                    <div className="flex-item">
                        <p>isp</p>
                        <h2>{ipData ? ipData.isp : ""}</h2>
                    </div>
                </div>
            </header>
            <section className='map-component'>
                <div id="map" className='map'>
                    <MapContainer center={position} zoom={6} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}
                                icon={customIcon}
                        >
                            <Popup>
                                IP Address
                            </Popup>
                        </Marker>
                    </MapContainer>

                </div>
            </section>
        </div>
    )
}

export default App
