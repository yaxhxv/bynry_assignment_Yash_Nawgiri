import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProfiles } from "../hooks/useProfiles";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { getProfileImageByIndex } from "../data/profileImages";

// Access API key from environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Check if API key is available
if (!GOOGLE_MAPS_API_KEY) {
  console.warn(
    "Google Maps API key is not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your .env file"
  );
}

const MapView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles, loading, error, fetchProfiles } = useProfiles();
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default to India
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const profile = profiles.find((p) => p.id.toString() === id);

  // Check for missing API key first
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
              Current environment: {import.meta.env.MODE}
            </p>
            <button
              onClick={() => navigate(`/profile/${id}`)}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Geocode the address and update map center
  useEffect(() => {
    if (profile && profile.address) {
      const geocoder = new window.google.maps.Geocoder();
      const address = `${profile.address.address}, ${profile.address.city}, ${profile.address.state}`;

      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setCenter({ lat: lat(), lng: lng() });
        }
      });
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error Loading Map</h2>
        <p className="text-gray-600 mt-2">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Back to Profiles
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Profile not found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Back to Profiles
        </button>
      </div>
    );
  }

  const mapContainerStyle = {
    width: "100%",
    height: "600px",
  };

  const options = {
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true,
  };

  const handleMarkerClick = () => {
    setSelectedProfile(profile);
    setIsInfoWindowOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Summary */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src={getProfileImageByIndex(profile.id - 1)}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-600">
                {profile.address.address}, {profile.address.city},{" "}
                {profile.address.state}
              </p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="h-[600px]">
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={15}
              options={options}
              onLoad={(map) => setMap(map)}
            >
              <Marker
                position={center}
                onClick={handleMarkerClick}
                animation={window.google.maps.Animation.DROP}
              />

              {isInfoWindowOpen && selectedProfile && (
                <InfoWindow
                  position={center}
                  onCloseClick={() => setIsInfoWindowOpen(false)}
                >
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-800">
                      {selectedProfile.firstName} {selectedProfile.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedProfile.address.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedProfile.address.city},{" "}
                      {selectedProfile.address.state}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between">
            <button
              onClick={() => navigate(`/profile/${profile.id}`)}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Back to Profile
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
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
