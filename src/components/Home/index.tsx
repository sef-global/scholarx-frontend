import React from 'react';
import FAQSection from '../FAQ';
import menteeFAQs from '../FAQ/MenteeFAQs.json';
import mentorFAQs from '../FAQ/MentorFAQs.json';
import { Link } from 'react-router-dom';

const logos = [
  'google.png',
  'facebook.png',
  'microsoft.png',
  'apple.png',
  'linkedin.png',
  'mit.png',
  'stanford.png',
  'harvard.png',
  'oxford.png',
  'cambridge.png',
];

const Home: React.FC = () => {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <p className="text-3xl md:text-5xl font-bold text-[#32325D] leading-">
            Unlock Mentorship opportunities with ScholarX
          </p>
          <div className="wrapper mt-[40px]">
            <div className="flex mt-10">
              <Link to="/mentors">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                  Find a Mentor
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
      </section>

      <section className="py-12">
        <div className="text-center">
          <div className="text-xl md:text-3xl font-bold text-center mb-4 text-[#32325D]">
            Our mentors are from{' '}
            <span className="text-xl align-text-top">*</span>
          </div>
          <div className="grid justify-center pb-3 grid-cols-2 md:grid-cols-5 gap-5">
            {logos.map((logo, index) => (
              <div key={index} className="p-2 w-40">
                <img
                  className="mx-auto img-fluid"
                  src={`logos/${logo}`}
                  alt={`${logo.split('.')[0]} logo`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#F8FDFF] flex  flex-col md:flex-row justify-center items-center">
        <div className="mb-2">
          <img
            className="max-w-[300px] mx-auto  w-[100%]"
            src="/success.png"
            alt="success-image"
          />
        </div>
        <div className="md:mx-16">
          <div className="text-3xl font-bold text-darkmod-blue text-center mb-2.5">
            Let&apos;s hear it from our
            <br /> ScholarX Alumni
          </div>
          <div className="flex justify-center items-center">
            <a href="#">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                ScholarX Alumni
              </button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#F8FDFF] flex  flex-col md:flex-row justify-center items-center mb-1">
        <div className="md:mx-16">
          <div className="text-3xl font-bold text-darkmod-blue text-center mb-2">
            Checkout our past
            <br /> mentors and mentees
          </div>
          <div className="flex justify-center items-center">
            <a href="#">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                ScholarX Archive
              </button>
            </a>
          </div>
        </div>
        <div>
          <img
            className="max-w-[360px] mx-auto w-full"
            src="/scholarX-archive.png"
            alt="scholarX-archive-image"
          />
        </div>
      </section>

      <section className="flex flex-col items-center py-12">
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
      </section>

      <p className="text-xs mt-12 mx-3 text-center">
        *Our mentors engage in mentoring voluntarily in their leisure time and
        we don&apos;t have a direct affiliation with the mentioned organisations
      </p>
    </>
  );
};
export default Home;
