import React from 'react';
import { useSelector } from 'react-redux';
import ProfileCard from './ProfileCard';

const ProfileList = () => {
  const profiles = useSelector((state) => state.profiles.items);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default ProfileList; 