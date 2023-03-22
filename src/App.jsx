import './App.css'
import arrowIcon from '../public/images/icon-arrow.svg'

function App() {


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
             <div>
                 <p>ip address</p>
                 <h2>192.212.174.101</h2>
             </div>
             <div>
                 <p>location</p>
                 <h2>Brooklyn, NY 10001</h2>
             </div>
             <div>
                 <p>timezone</p>
                 <h2>UTC -05:00</h2>
             </div>
             <div>
                 <p>isp</p>
                 <h2>SpaceX Starlink</h2>
             </div>
         </div>
     </header>
        <main className="map"></main>
    </div>
  )
}

export default App
