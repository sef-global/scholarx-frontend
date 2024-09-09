import React from 'react';
import { type ChangeEvent, useContext } from 'react';
import { UserContext, type UserContextType } from '../../contexts/UserContext';
import useProfile from '../../hooks/useProfile';
import useUserProfile from '../../hooks/useUserProfile';
import { type Profile } from '../../types';
import Toast from '../../components/Toast';

const EditProfileForm: React.FC = () => {
  const { user, isUserLoading } = useContext(UserContext) as UserContextType;
  const { updateProfile, isPending, error } = useProfile();
  const { profile, setProfile, image, handleProfilePicChange } =
    useUserProfile(user);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const profileData = {
      primary_email: user?.primary_email as string,
      first_name: profile.firstName,
      last_name: profile.lastName,
      image_url: profile.profilePic,
    };
    await updateProfile({
      profile: profileData as Profile,
      image,
    });
  };

  const handleImageClick = () => {
    document.getElementById('profilePic')?.click();
  };

  const handleProfilePicChangeWithFlag = (e: ChangeEvent<HTMLInputElement>) => {
    handleProfilePicChange(e);
  };

  const isInputChnaged =
    profile.firstName !== user?.first_name ||
    profile.lastName !== user?.last_name ||
    profile.profilePic !== user?.image_url ||
    image !== null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
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
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
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
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
                isInputChnaged
                  ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-600'
                  : 'bg-gray-400 cursor-not-allowed focus:ring-gray-400'
              }`}
              disabled={!isInputChnaged}
            >
              {isPending ? 'Loading' : 'Save'}
            </button>
            {isPending && (
              <Toast message="Successfully updated profile" type={'success'} />
            )}
            {error && (
              <Toast message="Oops something went wrong" type={'error'} />
            )}
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
              onChange={handleProfilePicChangeWithFlag}
              className="hidden"
            />
            <div
              onClick={handleImageClick}
              className="cursor-pointer relative group"
            >
              {profile.profilePic !== '' ? (
                <img
                  src={profile.profilePic}
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
