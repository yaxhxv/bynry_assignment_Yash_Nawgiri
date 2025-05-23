import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = useSelector((state) => 
    state.profiles.items.find((p) => p.id === id)
  );

  if (!profile) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Profile not found</h2>
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{profile.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h2>
              <p className="text-gray-600 mb-2">Email: {profile.email}</p>
              <p className="text-gray-600 mb-2">Phone: {profile.phone}</p>
              <p className="text-gray-600 mb-4">Address: {profile.address}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">About</h2>
              <p className="text-gray-600 mb-4">{profile.description}</p>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests?.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t">
          <div className="flex justify-between">
            <button
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Back to Profiles
            </button>
            <button
              onClick={() => navigate(`/map/${profile.id}`)}
              className="btn-primary"
            >
              View on Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail; 