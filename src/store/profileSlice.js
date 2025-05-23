import { createSlice } from '@reduxjs/toolkit';

// Sample data for testing
const initialState = {
  items: [
    {
      id: '1',
      name: 'John Doe',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      email: 'john.doe@example.com',
      phone: '+1 234-567-8900',
      address: '123 Main St, New York, NY 10001',
      description: 'Software Engineer with 5 years of experience in web development.',
      interests: ['Programming', 'Travel', 'Photography']
    },
    {
      id: '2',
      name: 'Jane Smith',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg',
      email: 'jane.smith@example.com',
      phone: '+1 234-567-8901',
      address: '456 Park Ave, San Francisco, CA 94102',
      description: 'Product Manager specializing in tech startups.',
      interests: ['Product Strategy', 'UX Design', 'Hiking']
    }
  ],
  loading: false,
  error: null
};

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setProfiles: (state, action) => {
      state.items = action.payload;
    },
    addProfile: (state, action) => {
      state.items.push(action.payload);
    },
    updateProfile: (state, action) => {
      const index = state.items.findIndex(profile => profile.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProfile: (state, action) => {
      state.items = state.items.filter(profile => profile.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setProfiles,
  addProfile,
  updateProfile,
  deleteProfile,
  setLoading,
  setError
} = profileSlice.actions;

export default profileSlice.reducer; 