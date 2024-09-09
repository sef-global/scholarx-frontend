import { useState, useEffect } from 'react';
import { type UserContextType } from '../contexts/UserContext';

const useUserProfile = (user: UserContextType['user']) => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profilePic: '',
  });
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    setProfile({
      firstName: user?.first_name ?? '',
      lastName: user?.last_name ?? '',
      email: user?.primary_email ?? '',
      profilePic: user?.image_url ?? '',
    });
  }, [user]);

  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files != null) {
      const file = event.target.files[0];
      setImage(file);
      setProfile({
        ...profile,
        profilePic: URL.createObjectURL(file),
      });
    }
  };

  return {
    profile,
    setProfile,
    image,
    handleProfilePicChange,
  };
};

export default useUserProfile;
