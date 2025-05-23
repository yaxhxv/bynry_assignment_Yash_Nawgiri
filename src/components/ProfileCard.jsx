import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${profile.id}`);
  };

  const handleShowMap = () => {
    // This will be implemented with map functionality
    navigate(`/map/${profile.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{profile.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{profile.description}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={handleViewProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            View Profile
          </button>
          <button
            onClick={handleShowMap}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
          >
            Show on Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard; 