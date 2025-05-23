import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoogleMap } from '@react-google-maps/api';
import { useGoogleMap } from '../utils/maps';

// Get API key from environment variables
const GOOGLE_MAPS_API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = useSelector((state) => 
    state.profiles.items.find((p) => p.id === id)
  );

  // Check if API key is missing
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Google Maps API Key Not Configured
            </h2>
            <p className="text-gray-600 mb-4">
              Please add your Google Maps API key to the .env file:
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm mb-4 overflow-auto">
              VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
            </pre>
            <p className="text-gray-600 mb-4">
              Current environment: {import.meta.env.MODE}<br />
              API Key status: {GOOGLE_MAPS_API_KEY ? 'Present' : 'Missing'}
            </p>
            <p className="text-gray-600 mb-4">
              You can get an API key from the{' '}
              <a
                href="https://console.cloud.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                Google Cloud Console
              </a>
            </p>
            <button
              onClick={() => navigate(`/profile/${id}`)}
              className="btn-primary"
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  const {
    isLoaded,
    loadError,
    isLoading,
    error,
    center,
    onLoad,
    onUnmount,
    mapContainerStyle
  } = useGoogleMap(profile?.address);

  if (loadError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">
          Error loading Google Maps
        </h2>
        <p className="text-gray-600 mt-2">
          {loadError.message || 'Please check your API key and try again'}
        </p>
        <p className="text-gray-600 mt-2">
          Environment: {import.meta.env.MODE}
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 btn-primary"
        >
          Back to Profiles
        </button>
      </div>
    );
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">
          {error || 'Profile not found'}
        </h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 btn-primary"
        >
          Back to Profiles
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Location: {profile.name}
          </h2>
          <p className="text-gray-600">{profile.address}</p>
        </div>
        
        <div className="h-[500px]">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: true,
            }}
          />
        </div>

        <div className="p-4 bg-gray-50">
          <div className="flex justify-between">
            <button
              onClick={() => navigate(`/profile/${profile.id}`)}
              className="btn-secondary"
            >
              Back to Profile
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              View All Profiles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView; 