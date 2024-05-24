import React, { useContext, useEffect, useState } from 'react';
import { UserContext, type UserContextType } from '../../contexts/UserContext';

const EditProfileForm: React.FC = () => {
  const { user, isUserLoading } = useContext(UserContext) as UserContextType;
  const [fileList, setFileList] = useState<File[]>([]);
  const [formValues, setFormValues] = useState<{
    first_name: string;
    last_name: string;
    contact_email: string;
    image_url?: string;
  }>();

  useEffect(() => {
    if (!isUserLoading) {
      user &&
        setFormValues({
          first_name: user.first_name,
          last_name: user.last_name,
          contact_email: user.contact_email,
          image_url: user.image_url,
        });

      if (user?.image_url) {
        setFileList([
          {
            uid: user.uuid,
            name: `ProfilePicture_${user.first_name}${user.last_name}`,
            url: user.image_url,
          },
        ]);
      }
    }
  }, [user, isUserLoading]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileList(Array.from(files));
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-2/3 p-4">
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
                value={formValues?.first_name ?? ''}
                onChange={(e) =>
                  setFormValues({ ...formValues, first_name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={formValues?.last_name ?? ''}
                onChange={(e) => {
                  setFormValues({ ...formValues, last_name: e.target.value });
                }}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-gray-700">Primary Email</label>
              <input
                type="email"
                value={user?.primary_email ?? ''}
                disabled
                className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-gray-700">Contact Email</label>
              <input
                type="email"
                value={formValues?.contact_email || ''}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    contact_email: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Save
            </button>
          </form>
        )}
      </div>
      <div className="w-full md:w-1/3 p-4 text-center">
        {isUserLoading ? (
          <div className="animate-pulse">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto"></div>
            <div className="h-6 bg-gray-300 rounded mt-4"></div>
          </div>
        ) : (
          <>
            <div className="relative inline-block">
              {fileList.length > 0 ? (
                <img
                  src={fileList[0].url || ''}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-gray-400">+</span>
                </div>
              )}
              <input
                type="file"
                onChange={handleChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <h4 className="mt-4 text-lg font-medium">
              {user?.first_name} {user?.last_name}
            </h4>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfileForm;
