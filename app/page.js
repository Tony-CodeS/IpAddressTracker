'use client'
import Image from 'next/image'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {FaGreaterThan} from 'react-icons/fa'
import { useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_APIKEY

export default function Home() {
 const [formData, setFormData] = useState({ ipAddress: '', data: null });
  const [mapCenter, setMapCenter] = useState([0, 0]);

  const handleInputChange = (event) => {
    setFormData({ ...formData, ipAddress: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Make an HTTP GET request to the API endpoint
    const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${formData.ipAddress}`;

    // Make the request
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response
        setFormData({ ipAddress: formData.ipAddress, data });
        setMapCenter([lat, lng]);
      })

      
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };
  return (
    <main className=''>
    <div className=' bg-red-500 h-56 position-relative'
       style={{
        backgroundImage: `url('/pattern-bg-desktop.png')`,
        }}
    >
     <p className='text-center font-medium text-3xl text-white p-4'> IP Address Tracker</p>
    <div className='flex justify-center items-center'>
    <form onSubmit={handleFormSubmit}
    className=' w-11/12 md:w-6/12 lg:w-4/12 mt-6 mb-6 '>
        <input type='text'
         placeholder='search for any IP address or domain' 
        value={formData.ipAddress}
          onChange={handleInputChange}
         className='  h-fit w-11/12 p-3 rounded-l-xl border-none outline-0'/>
        <button className='bg-black w-1/12 p-3  h-12  rounded-r-xl text-white'><FaGreaterThan size={10}/></button>
      </form>
     
    </div>
    
       <div className='absolute w-3/4 bg-stone-50 lg:h-40 z-20 ml-12 md:ml-28 lg:ml-36 flex flex-col md:flex-row lg:flex-row justify-center items-center rounded-lg text-center'>
       <div className='w-full lg:w-1/4  lg:border-solid border-1 border-black h-20 lg:h-16'> 
       <p className='text-gray-400 font-medium'>IP Address</p>
       <p className='text-xl font-bold'>{formData.data ? formData.data.ip:'' }</p>
       </div>
       <div className='w-full lg:w-1/4 border-t border-black lg:border-solid lg:border-x-2 lg:border-t-0 h-20  lg:h-16 '>
        <p  className=' text-gray-400 font-medium'>Region</p>
        <p className='text-xl font-bold'>{formData.data ? formData.data.location.region: ''}</p>
        </div>
       <div className='w-full border-t lg:border-none lg:w-1/4  border-black h-20   lg:h-16'>
        <p  className='text-gray-400 font-medium'>Country</p>
        <p className='text-xl font-bold'>{formData.data ? formData.data.location.country: ''}</p>
        </div>
       <div className='w-full border-t lg:w-1/4   lg:border-l-2 lg:border-t-0 border-black  h-20  lg:h-16'>
        <p  className='text-gray-400 font-medium'>Timezone</p>
      <p className='text-xl font-bold'>{formData.data ? formData.data.location.timezone: ''}</p>
        </div>
     </div>
  
   
    </div>
    
      {formData.data && formData.data.location && (
        <MapContainer center={[formData.data.location.lat, formData.data.location.lng]} zoom={13} scrollWheelZoom={false} className='h-screen z-10'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[formData.data.location.lat, formData.data.location.lng]}>
            <Popup>{formData.data.location.city}</Popup>
          </Marker>
        </MapContainer>
      )}
    </main>
  )
}
