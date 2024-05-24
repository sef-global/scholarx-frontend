import React from 'react';
import FAQSection from '../FAQ';
import menteeFAQs from '../FAQ/MenteeFAQs.json';
import mentorFAQs from '../FAQ/MentorFAQs.json';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      {/* Main title container */}
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div>
          <div className="text-3xl md:text-[43px] font-bold text-[#32325D]">
            Unlock Mentorship opportunities with ScholarX
          </div>
          <div className="wrapper mt-[40px]">
            <div className="flex mt-10">
              <Link to="/mentors">
                <button className="flex justify-center items-center mr-5 mb-5 bg-blue-500 hover:bg-blue-700 text-white py-1 px-16 rounded w-40 h-9 font-bold">
                  Apply
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col mt-[40px] flex justify-right">
          <img
            src="/new-findmentor.png"
            alt="find-mentor"
            className="w-[40rem]"
          />
        </div>
      </div>

      {/* Statistics container */}
      <div className="flex justify-evenly p-[4%] m-0 items-center flex-col md:flex-row flex-wrap bg-[#F7F8FA] ">
        <div className="ContainerOne text-center">
          <div className="text-3xl font-bold text-[#1D1D1F]">100,000+</div>
          <div className="font-normal text-[20px] text-[#1D1D1F]">Mentees</div>
        </div>
        <div className="ContainerTwo  text-center">
          <div className="text-3xl font-bold text-[#1D1D1F]">500+</div>
          <div className="font-normal text-[20px] text-[#1D1D1F]">Mentors</div>
        </div>
        <div className="ContainerThree  text-center">
          <div className="text-3xl font-bold text-[#1D1D1F]">70%</div>
          <div className="font-normal  text-[20px] text-[#1D1D1F]">Growth</div>
        </div>
      </div>

      {/* Success stories container */}
      <div className="p-[4%] bg-[#F8FDFF] flex  flex-col md:flex-row justify-center items-center">
        <div className="imageCol mb-2.5">
          <img
            className="max-w-[300px] mx-auto  w-[100%]"
            src="../../../public/success.png"
            alt="success-image"
          />
        </div>
        <div className="md:ml-16">
          <div className="text-3xl font-bold text-darkmod-blue text-center mb-2.5">
            Let&apos;s hear it from our
            <br /> ScholarX Alumni
          </div>
          <div className="flex justify-center items-center">
            <a href="#">
              <button className="flex justify-center items-center mr-5 mb-5 bg-blue-500 hover:bg-blue-700 text-white py-1 px-16 rounded h-9 font-bold">
                ScholarX Success Stories
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Archive container */}

      <div className="p-[4%] bg-[#F8FDFF] flex  flex-col md:flex-row justify-center items-center mb-1">
        <div className="textCol md:mr-16 ">
          <div className="text-3xl font-bold text-darkmod-blue text-center mb-2.5">
            Checkout our past
            <br /> mentors and mentees
          </div>
          <div className="flex justify-center items-center">
            <a href="#">
              <button className="flex justify-center items-center mr-5 mb-5 bg-blue-500 hover:bg-blue-700 text-white py-1 px-16 rounded h-9 font-bold">
                ScholarX Archive
              </button>
            </a>
          </div>
        </div>
        <div className="imageCol ">
          <img
            className="max-w-[360px] mx-auto  w-[100%]"
            src="../../../public/scholarX-archive.png"
            alt="scholarX-archive-image"
          />
        </div>
      </div>

      {/* FAQs container */}
      <div className="flex flex-col items-center">
        <div className="w-full text-center">
          <h2 className="text-3xl font-semibold text-[#3D317C]">
            FAQ for Mentors
          </h2>
        </div>
        <div className="w-full xs:w-4/5 xl:w-1/2">
          <FAQSection faqs={mentorFAQs} />
        </div>
        <div className="w-full text-center mt-8">
          <h2 className="text-3xl font-semibold text-[#3D317C]">
            FAQ for Mentees
          </h2>
        </div>
        <div className="w-full xs:w-4/5 xl:w-1/2">
          <FAQSection faqs={menteeFAQs} />
        </div>
      </div>
    </>
  );
};
export default Home;
