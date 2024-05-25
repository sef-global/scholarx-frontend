import React, { type ChangeEvent, useContext, useState } from 'react';
import { UserContext, type UserContextType } from '../../contexts/UserContext';
import useProfile from '../../hooks/useProfile';
import { type Profile } from '../../types';

const EditProfileForm: React.FC = () => {
  const { user, isUserLoading } = useContext(UserContext) as UserContextType;
  const { updateProfile, isPending } = useProfile();
  const [image, setImage] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState(user?.image_url);
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.primary_email);

  const handleProfilePicChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      const file = event.target.files[0];
      setImage(file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const profile = {
      first_name: firstName,
      last_name: lastName,
      contact_email: email,
    };
    updateProfile({
      profile: profile as Profile,
      image,
    });
  };

  const handleImageClick = () => {
    document.getElementById('profilePic')?.click();
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-2/3 p-4 order-2 md:order-1">
        {isUserLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-gray-700">Primary Email</label>
              <input
                type="email"
                value={user?.primary_email}
                disabled
                className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-gray-700">Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {isPending ? 'Loading' : 'Save'}
            </button>
          </form>
        )}
      </div>
      <div className="w-full md:w-1/3 p-4 text-center order-1 md:order-2">
        {isUserLoading ? (
          <div className="animate-pulse">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto"></div>
            <div className="h-6 bg-gray-300 rounded mt-4"></div>
          </div>
        ) : (
          <div className="relative">
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
            <div
              onClick={handleImageClick}
              className="cursor-pointer relative group"
            >
              {profilePic !== '' ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-[90px] h-[90px] rounded-full object-cover"
                />
              ) : (
                <div className="w-[90px] h-[90px] rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-gray-400">+</span>
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 w-[90px] h-1/2 bg-black bg-opacity-40 rounded-b-full flex items-center p-5 justify-center">
                <span className="text-white text-center text-xs">
                  Change Photo
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfileForm;
