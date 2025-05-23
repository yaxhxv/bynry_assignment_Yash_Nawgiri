import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// DummyJSON API base URL
const API_BASE_URL = 'https://dummyjson.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all profiles
  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching profiles...'); // Debug log
      const response = await api.get('/users');
      
      if (response.data && response.data.users) {
        setProfiles(response.data.users);
        // console.log('Profiles set:', response.data.users); // Debug log
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (err) {
      console.error('Error fetching profiles:', err); // Debug log
      setError(err.message || 'Failed to fetch profiles');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single profile
  const fetchProfileById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/users/${id}`);
      if (response.data) {
        setCurrentProfile(response.data);
        return response.data;
      }
      throw new Error('Profile not found');
    } catch (err) {
      console.error('Error fetching profile:', err); // Debug log
      setError(err.message || 'Failed to fetch profile');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new profile
  const createProfile = useCallback(async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/users/add', profileData);
      if (response.data) {
        setProfiles(prev => [...prev, response.data]);
        return response.data;
      }
      throw new Error('Failed to create profile');
    } catch (err) {
      console.error('Error creating profile:', err); // Debug log
      setError(err.message || 'Failed to create profile');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update profile
  const updateProfile = useCallback(async (id, profileData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put(`/users/${id}`, profileData);
      if (response.data) {
        setProfiles(prev => 
          prev.map(profile => 
            profile.id === id ? response.data : profile
          )
        );
        return response.data;
      }
      throw new Error('Failed to update profile');
    } catch (err) {
      console.error('Error updating profile:', err); // Debug log
      setError(err.message || 'Failed to update profile');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete profile
  const deleteProfile = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.delete(`/users/${id}`);
      if (response.data && response.data.isDeleted) {
        setProfiles(prev => prev.filter(profile => profile.id !== id));
        return true;
      }
      throw new Error('Failed to delete profile');
    } catch (err) {
      console.error('Error deleting profile:', err); // Debug log
      setError(err.message || 'Failed to delete profile');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Clear current profile
  const clearCurrentProfile = useCallback(() => {
    setCurrentProfile(null);
  }, []);

 

  return {
    profiles,
    currentProfile,
    loading,
    error,
    fetchProfiles,
    fetchProfileById,
    createProfile,
    updateProfile,
    deleteProfile,
    clearError,
    clearCurrentProfile
  };
}; 