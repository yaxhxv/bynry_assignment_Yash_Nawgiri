import React from "react";
import { useNavigate } from "react-router-dom";
import { getProfileImageByIndex } from "../data/profileImages";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";

const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();

  // Guard against missing profile data
  if (!profile) {
    return null;
  }

  // Get a consistent image for this profile based on their ID
  const profileImage = getProfileImageByIndex(profile.id - 1);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl">
      <div className="relative">
        <img
          src={profileImage}
          alt={`${profile.firstName} ${profile.lastName}`}
          className="w-full h-48 object-cover"
          onError={(e) => {
            console.log("Image failed to load:", e.target.src);
            e.target.src = getProfileImageByIndex(0); // Use first image as fallback
            e.target.onerror = null;
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="text-gray-200">@{profile.username}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {profile.email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Company:</span>{" "}
            {profile.company?.name}
          </p>
          {profile.address && (
            <p className="text-gray-600 truncate">
              <span className="font-medium">Location:</span>{" "}
              {profile.address.city}, {profile.address.state}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/profile/${profile.id}`)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            <FaUser /> View Profile
          </button>
          <button
            onClick={() => navigate(`/map/${profile.id}`)}
            className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            title="View on Map"
          >
            <FaMapMarkerAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
