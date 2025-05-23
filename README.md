# Profile Management Application

A modern React application for managing user profiles with interactive mapping features. Built with React, Tailwind CSS, and Google Maps integration.

## Features

- **Profile Management**
  - View list of user profiles with modern card layout
  - Detailed profile information display
  - Custom profile images integration
  - Responsive design for all screen sizes

- **Interactive Maps**
  - View profile locations on Google Maps
  - Interactive markers with profile information
  - Geocoding support for address visualization
  - Full map controls (zoom, street view, fullscreen)

- **Navigation**
  - Seamless routing between views
  - Profile details view
  - Map view for each profile
  - Error handling and loading states

## Tech Stack

- React
- React Router for navigation
- Tailwind CSS for styling
- @react-google-maps/api for Maps integration
- Custom hooks for data management
- DummyJSON API for profile data

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- Google Maps API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the project root and add your Google Maps API key:
```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Environment Variables

The following environment variables are required:

- `VITE_GOOGLE_MAPS_API_KEY`: Your Google Maps API key (required for map functionality)

## Project Structure

```
src/
├── components/          # React components
│   ├── ProfileCard.jsx  # Profile card component
│   ├── ProfileDetail.jsx# Detailed profile view
│   └── MapView.jsx     # Google Maps integration
├── hooks/              # Custom React hooks
│   └── useProfiles.js  # Profile data management
├── data/              # Static data and utilities
│   └── profileImages.js# Profile image management
└── App.jsx            # Main application component
```

## API Integration

The application uses the DummyJSON API (https://dummyjson.com/users) for profile data. The data is fetched and managed using a custom `useProfiles` hook.

## Styling

- Tailwind CSS for utility-first styling
- Custom animations and transitions
- Responsive design principles
- Modern UI components

## Features in Detail

### Profile Cards
- Display user information in a clean, modern layout
- Quick access to profile details and map view
- Hover effects and smooth transitions
- Error handling for image loading

### Map Integration
- Interactive Google Maps component
- Marker animation and InfoWindow support
- Geocoding for address to coordinates conversion
- Comprehensive map controls
- Error handling for API key and loading states

### Profile Details
- Comprehensive user information display
- Organized sections for different types of data
- Hero image section with profile picture
- Navigation between different views

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Profile images provided by Unsplash
- User data from DummyJSON API
- Icons from React Icons
- Mapping functionality from Google Maps Platform
