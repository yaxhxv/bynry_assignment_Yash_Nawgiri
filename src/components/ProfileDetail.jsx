import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProfiles } from "../hooks/useProfiles";
import { getProfileImageByIndex } from "../data/profileImages";

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles, loading, error, fetchProfiles } = useProfiles();

  // Fetch profiles when component mounts
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  // Find the profile after data is loaded
  const profile = profiles.find((p) => p.id.toString() === id);
  const profileImage = profile ? getProfileImageByIndex(profile.id - 1) : null;

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
        <h2 className="text-2xl font-bold text-red-600">
          Error Loading Profile
        </h2>
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
        <p className="text-gray-600 mt-2">
          The requested profile could not be found.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Back to Profiles
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Hero Section with Image */}
        <div className="relative h-80">
          <img
            src={profileImage}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-gray-200 text-xl">@{profile.username}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Personal Information
              </h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-medium">Age:</span> {profile.age}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Gender:</span> {profile.gender}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {profile.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> {profile.phone}
                </p>
                {profile.birthDate && (
                  <p className="text-gray-600">
                    <span className="font-medium">Birth Date:</span>{" "}
                    {profile.birthDate}
                  </p>
                )}
              </div>
            </div>

            {/* Work & Address */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Work & Location
              </h2>
              {profile.company && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Company Details
                  </h3>
                  <p className="text-gray-600">
                    <span className="font-medium">Company:</span>{" "}
                    {profile.company.name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Department:</span>{" "}
                    {profile.company.department}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Title:</span>{" "}
                    {profile.company.title}
                  </p>
                </div>
              )}
              {profile.address && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Address
                  </h3>
                  <p className="text-gray-600">
                    {profile.address.address}, {profile.address.city}
                  </p>
                  <p className="text-gray-600">
                    {profile.address.state}, {profile.address.postalCode}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bank Details Section */}
          {profile.bank && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Banking Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-gray-600">
                  <span className="font-medium">Card Type:</span>{" "}
                  {profile.bank.cardType}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Card Number:</span>{" "}
                  {profile.bank.cardNumber}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Currency:</span>{" "}
                  {profile.bank.currency}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">IBAN:</span> {profile.bank.iban}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between">
            <button
              onClick={() => navigate("/")}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Back to Profiles
            </button>
            <button
              onClick={() => navigate(`/map/${profile.id}`)}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
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
