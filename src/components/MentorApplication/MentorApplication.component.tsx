import React, { useState } from 'react';
import { getStateColor } from '../../utils';
import { useParams } from 'react-router-dom';
import useMentor from '../../hooks/admin/useMentor';
import Toast from '../Toast';
import ActionButtons from '../ActionButtons';
import { ApplicationStatus } from '../../enums';
import axios from 'axios';
import { API_URL } from '../../constants';

const MentorApplication: React.FC = () => {
  const { mentorId } = useParams();
  const {
    isLoading,
    data: mentor,
    changeState,
    isSuccess,
    isError,
  } = useMentor(mentorId);
  const handleStateChange = async (newState: string) => {
    await changeState(newState);
  };
  const [profilePic, setProfilePic] = useState<string | null>(
    mentor?.profile.image_url ?? ''
  );

  const handleImageClick = () => {
    document.getElementById('profilePic')?.click();
  };

  const handleProfilePicChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && mentorId) {
      const formData = new FormData();
      formData.append('profile_image', file);
      try {
        const response = await axios.put(
          `${API_URL}/admin/mentors/${mentorId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );
        setProfilePic(response.data.mentor.profile.image_url);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  return (
    <>
      {isSuccess && (
        <Toast message={'Status updated successfully'} type={'success'} />
      )}
      {isError && (
        <Toast message={'Oops something went wrong'} type={'error'} />
      )}
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="w-full space-y-8">
          <div className="flex items-center">
            <div className="relative">
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
                name="profilePic"
              />
              <div
                onClick={handleImageClick}
                className="cursor-pointer relative group mb-4"
              >
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-[90px] h-[90px] rounded-full object-cover"
                    referrerPolicy="no-referrer"
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
            <div className="ml-5">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-semibold">
                  {mentor?.application.firstName} {mentor?.application.lastName}
                </span>
                <span
                  className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm ${getStateColor(
                    mentor?.state
                  )}`}
                >
                  {mentor?.state}
                </span>
              </div>
              <span className="text-xl font-light">
                {mentor?.application.position},{' '}
                {mentor?.application.institution}
              </span>
            </div>
          </div>
          <div className="ml-auto flex overflow-hidden">
            <ActionButtons
              state={mentor?.state}
              handleApprove={async () => {
                await handleStateChange(ApplicationStatus.APPROVED);
              }}
              handleReject={async () => {
                await handleStateChange(ApplicationStatus.REJECTED);
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-base font-bold">No of Mentees</h3>
                  <p>{mentor?.application.noOfMentees}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Category</h3>
                  <p>{mentor?.category.category}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Country</h3>
                  <p>{mentor?.application.country}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Expertise</h3>
                  <p>{mentor?.application.expertise}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Past Mentor</h3>
                  <p>{mentor?.application.isPastMentor ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Mentored Year</h3>
                  <p>{mentor?.application.mentoredYear}</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 pl-8 border-l">
              <div className="grid grid-cols-2 gap-1">
                <a
                  href={mentor?.application.linkedin}
                  target="_blank"
                  className="underline mb-2"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={mentor?.application.website}
                  target="_blank"
                  className="underline mb-2"
                  rel="noreferrer"
                >
                  Website
                </a>
                <a
                  href={mentor?.application.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="underline mb-2"
                >
                  CV
                </a>
                <a
                  href={`mailto:${mentor?.application.email as string}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline mb-2"
                >
                  {mentor?.application.email}
                </a>
              </div>
            </div>
            <div className="col-span-5">
              <div className="mb-4">
                <h3 className="text-base font-bold">Mentee Expectations</h3>
                <p>{mentor?.application.menteeExpectations}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-base font-bold">Mentoring Philosophy</h3>
                <p>{mentor?.application.mentoringPhilosophy}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-base font-bold">Reason to Mentor</h3>
                <p>{mentor?.application.reasonToMentor}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-base font-bold">Bio</h3>
                <p>{mentor?.application.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorApplication;
