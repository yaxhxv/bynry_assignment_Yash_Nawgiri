import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 20.5937, // Default center (India)
  lng: 78.9629
};

const libraries = ['places'];

// Get API key from environment variables
const GOOGLE_MAPS_API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const useGoogleMap = (address) => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marker, setMarker] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Handle missing or invalid API key
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      console.error('Google Maps API key is missing');
      setError('Google Maps API key is not configured');
      setIsLoading(false);
    }
  }, []);

  // Clean up marker when component unmounts or address changes
  useEffect(() => {
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  const geocodeAddress = useCallback(async (geocoder, address, map) => {
    if (!address) {
      throw new Error('No address provided');
    }

    try {
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results[0]) {
            resolve(results[0].geometry.location);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });
    } catch (err) {
      console.error('Geocoding error:', err);
      throw err;
    }
  }, []);

  const onLoad = useCallback(async (mapInstance) => {
    try {
      if (!window.google) {
        throw new Error('Google Maps not loaded');
      }

      setMap(mapInstance);

      if (!address) {
        setIsLoading(false);
        return;
      }

      const geocoder = new window.google.maps.Geocoder();
      const location = await geocodeAddress(geocoder, address, mapInstance);
      
      const newCenter = { 
        lat: location.lat(), 
        lng: location.lng() 
      };
      
      setCenter(newCenter);
      
      // Remove old marker if it exists
      if (marker) {
        marker.setMap(null);
      }

      // Add new marker
      const newMarker = new window.google.maps.Marker({
        map: mapInstance,
        position: newCenter,
        animation: window.google.maps.Animation.DROP,
        title: address
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><strong>${address}</strong></div>`
      });

      newMarker.addListener('click', () => {
        infoWindow.open(mapInstance, newMarker);
      });

      setMarker(newMarker);
      mapInstance.setCenter(newCenter);
      mapInstance.setZoom(15);
      
      setIsLoading(false);
    } catch (err) {
      console.error('Map initialization error:', err);
      setError(err.message || 'Failed to load location');
      setIsLoading(false);
    }
  }, [address, geocodeAddress, marker]);

  const onUnmount = useCallback(() => {
    if (marker) {
      marker.setMap(null);
    }
    setMap(null);
    setMarker(null);
  }, [marker]);

  return {
    isLoaded,
    loadError,
    isLoading,
    error,
    center,
    onLoad,
    onUnmount,
    mapContainerStyle
  };
}; 