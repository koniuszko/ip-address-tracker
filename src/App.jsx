import './App.css'
import arrowIcon from './images/icon-arrow.svg'
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import {Icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locIcon from './images/icon-location.svg'
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    const [searchInput, setSearchInput] = useState('');
    const [center, setCenter] = useState([0, 0]);
    const [ipData, setIpData] = useState({
        ip: "",
        isp: "",
        location: {
            city: "",
            region: "",
            timezone: "",
        }
    });

    const customIcon = new Icon({
        iconUrl: locIcon,
        iconSize: [25, 25],
        iconAnchor: [0, 0],
        popupAnchor: [-0, 0]
    })

    const validIpAddress = new RegExp(/^((?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])[.]){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/
    )

    const validDomain = new RegExp(/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/)

    const Recenter = ({lat, lng}) => {
        const map = useMap();
        useEffect(() => {
            map.setView([lat, lng]);
        }, [lat, lng]);
        return null;
    }

    useEffect(() => {
        let myIp = "";
        axios.get('https://geolocation-db.com/json/').then((res) => myIp = res.data.IPv4)
        axios.get(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_bNOqPuYzkRFWBQ9skGpsQ88BwDwDm&ipAddress=${myIp}`)
            .then((response) => {
                setIpData(response.data)
                setCenter([response.data.location.lat, response.data.location.lng])
            })
    }, []);

    const searchHandler = (e) => {
        e.preventDefault()

        if (validIpAddress.test(searchInput)) {
            axios.get(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_bNOqPuYzkRFWBQ9skGpsQ88BwDwDm&ipAddress=${searchInput}`)
                .then((response) => {
                    setIpData(response.data)
                    setCenter([response.data.location.lat, response.data.location.lng])
                }).catch(err => alert("IP Address seems to be wrong."))
        } else if (validDomain.test(searchInput)) {
            axios.get(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_bNOqPuYzkRFWBQ9skGpsQ88BwDwDm&domain=${searchInput}`)
                .then((response) => {
                    setIpData(response.data)
                    setCenter([response.data.location.lat, response.data.location.lng])
                }).catch(err => alert("Domain seems to be wrong."))
        } else {
            alert("Wrong input!")
        }

    }

    return (
        <div className="App">
            <header className="banner">
                <h1>IP Address Tracker</h1>
                <form>
                    <input value={searchInput} onChange={e => setSearchInput(e.target.value)} type="text"
                           placeholder="Search for any IP Address or domain"/>
                    <button onClick={e => searchHandler(e)}>
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
                    <MapContainer center={center} zoom={9} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Recenter lat={center[0]} lng={center[1]}/>
                        <Marker position={center}
                                icon={customIcon}
                        >
                            <Popup>
                                IP Address location
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </section>
        </div>
    )
}

export default App
