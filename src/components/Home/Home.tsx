import React from 'react';

import FAQCollapse from '../FAQ/FAQCollapse';
import menteeFAQs from '../FAQ/MenteeFAQs.json';
import mentorFAQs from '../FAQ/MentorFAQs.json';
import TestimonialCard from '../Testimonials/TestimonialCard';

const Home: React.FC = () => (
  <div>
    {/* Main title container */}
    <div className="grid grid-cols-2 px-36 py-16">
      <div className="flex flex-col justify-center">
        <p className="text-dark_blue_1 font-bold text-4xl">
          Unlock Mentorship Opportunities with ScholarX
        </p>
        <div className="flex flex-row mt-10 gap-4">
          <div className="bg-blue px-10 py-1 text-white font-bold rounded-lg">
            Apply
          </div>
          <div className="border-2 rounded-lg text-sm font-bold px-10 py-1">
            See more
          </div>
        </div>
      </div>
      <div>
        <img src="/new-findmentor.png" alt="find-mentor" />
      </div>
    </div>

    {/* Statistics container */}
    <div className="bg-white_1 flex justify-center gap-48 px-0 py-10 text-center">
      <div className="flex flex-col gap-2">
        <p className="text-black text-3xl font-bold">100,000+</p>
        <p className="text-black text-md">Mentees</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-black text-3xl font-bold">500+</p>
        <p className="text-black text-md">Mentors</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-black text-3xl font-bold">70%</p>
        <p className="text-black text-md">Growth</p>
      </div>
    </div>

    {/* Testimonials container */}
    <div className="px-36 py-16">
      <div className="flex flex-col justify-center text-center gap-2">
        <p className="text-4xl text-purple font-semibold">Testimonials</p>
        <p className="text-sm">
          Have a look what our past <br /> mentees say about ScholarX
        </p>
      </div>
      <div className="flex flex-row justify-center gap-6 mt-6">
        <div>
          <TestimonialCard />
        </div>
        <div>
          <TestimonialCard />
        </div>
        <div>
          <TestimonialCard />
        </div>
        <div>
          <TestimonialCard />
        </div>
      </div>
    </div>

    {/* Success stories container */}
    <div className="bg-white_2 flex justify-center items-center gap-52">
      <div>
        <img className="w-72" src="/success.png" alt="success-image" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-purple text-3xl font-semibold text-center">
          Let`s hear it from our
          <br /> ScholarX Alumni
        </p>
        <button className="bg-dark_blue_2 text-white text-sm font-semibold w-52 py-2 rounded-lg">
          ScholarX Success Stories
        </button>
      </div>
    </div>

    {/* Archive container */}
    <div className="bg-white_2 flex justify-center items-center gap-52 mt-10">
      <div className="flex flex-col items-center gap-3">
        <p className="text-purple text-3xl font-semibold text-center">
          Checkout our past
          <br /> mentors and mentees
        </p>
        <button className="bg-dark_blue_2 text-white text-sm font-semibold w-52 py-2 rounded-lg">
          ScholarX Archive
        </button>
      </div>
      <div>
        <img
          className="w-96"
          src="/scholarX-archive.png"
          alt="scholarX-archive-image"
        />
      </div>
    </div>

    {/* FAQs container */}
    <div className="px-36 py-16">
      <div className="flex justify-center mb-4">
        <p className="text-purple font-semibold text-2xl">FAQ for Mentors</p>
      </div>
      <div className="flex justify-center mb-10">
        <FAQCollapse faqs={mentorFAQs} />
      </div>
      <div className="flex justify-center mb-4">
        <p className="text-purple font-semibold text-2xl">FAQ for Mentees</p>
      </div>
      <div className="flex justify-center">
        <FAQCollapse faqs={menteeFAQs} />
      </div>
    </div>
  </div>
);
export default Home;
