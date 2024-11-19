import React from 'react';
import phone from '../pics/telephone.png'
import musicicon from '../pics/musicicon.png'
import mapsicon from '../pics/mapsicon.png'
import appicon from '../pics/appicon.png'
import settingsicon from '../pics/settingsicon.png'
import speedometericon from '../pics/speedometericon.png'
import batteryicon from '../pics/batteryicon.png'
import temperatureicon from '../pics/temperatureicon.png'
import collisionicon from '../pics/collisionicon.png'
import tirepressureicon from '../pics/tirepressureicon.png'
import weathericon from '../pics/weathericon.png'
import bluetoothicon from '../pics/bluetoothicon.png'

function userInterface() {

  return (
    <div className='uibg'>
        <div className='uibg1'>
            <div className='ui1'>
                <div className='ui11'>
                    <img src={phone} alt='phone' />
                    <p>Phone</p>
                </div>
                <div className='ui11'>
                    <img src={musicicon} alt='musicicon' />
                    <p>Music</p>
                </div>
                <div className='ui11'>
                    <img src={mapsicon} alt='mapsicon' />
                    <p>Maps</p>
                </div>
                <div className='ui11'>
                    <img src={appicon} alt='appicon' />
                    <p>Apps</p>
                </div>
                <div className='ui11'>
                    <img src={settingsicon} alt='settingsicon' />
                    <p>Settings</p>
                </div>
                <div className='ui11'>
                    <img src={speedometericon} alt='speedometericon' />
                    <p>Speedometer</p>
                </div>
                <div className='ui11'>
                    <img src={batteryicon} alt='batteryicon' />
                    <p>Battery</p>
                </div>
                <div className='ui11'>
                    <img src={collisionicon} alt='collisionicon' />
                    <p>A C D S</p>
                </div>
                <div className='ui11'>
                    <img src={temperatureicon} alt='temperatureicon' />
                    <p>Temperature</p>
                </div>
                <div className='ui11'>
                    <img src={tirepressureicon} alt='Tire Pressure ' />
                    <p>Tire Pressure </p>
                </div>
                <div className='ui11'>
                    <img src={weathericon} alt='weathericonicon' />
                    <p>Weather</p>
                </div>
                <div className='ui11'>
                    <img src={bluetoothicon} alt='bluetoothicon' />
                    <p>Bluetooth</p>
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default userInterface