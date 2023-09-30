import React from 'react';

import styles from './Home.module.css';
import FAQCollapse from '../FAQ/FAQCollapse';
import menteeFAQs from '../FAQ/MenteeFAQs.json';
import mentorFAQs from '../FAQ/MentorFAQs.json';
import TestimonialCard from '../Testimonials/TestimonialCard';

const Home: React.FC = () => (
  <div>
    {/* Main title container */}
    <div className='grid grid-cols-2 px-36 py-16'>
      <div className='flex flex-col justify-center'>
        <p className='text-primary_font_colour font-bold text-4xl'>
          Unlock Mentorship Opportunities with ScholarX
        </p>
        <div className='flex flex-row mt-10 gap-4'>
          <div className='bg-primary_btn_colour px-10 py-1 text-white font-bold rounded-lg'>
            Apply
          </div>
          <div className='border-2 rounded-lg text-sm font-bold px-10 py-1'>See more</div>
        </div>
      </div>
      <div>
        <img
          className={styles.homePageImage}
          src="/new-findmentor.png"
          alt="find-mentor"
          style={{ maxWidth: '600px' }}
        />
      </div>
    </div>

    {/* Statistics container */}
    <div className='bg-stat_container_colour flex justify-center gap-48 px-0 py-10 text-center'>
      <div className='flex flex-col gap-2'>
        <p className='text-secondary_font_colour text-3xl font-bold'>100,000+</p>
        <p className='text-secondary_font_colour text-md'>
          Mentees
        </p>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-secondary_font_colour text-3xl font-bold'>500+</p>
        <p className='text-secondary_font_colour text-md'>
          Mentors
        </p>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-secondary_font_colour text-3xl font-bold'>70%</p>
        <p className='text-secondary_font_colour text-md'>
          Growth
        </p>
      </div>
    </div>

    {/* Testimonials container */}
    <div>
      <div style={{ marginBottom: '30px' }}>
        <div>
          <p
            className={styles.homePageSecondaryTitle}
            style={{ fontSize: '36px', color: '#3D317C' }}
          >
            Testimonials
          </p>
          <p
            className={styles.homePageSecondaryTitle}
            style={{ fontSize: '15px', color: 'black', fontWeight: 300 }}
          >
            Have a look what our past <br /> mentees say about ScholarX
          </p>
        </div>
      </div>
      <div>
        <div
          className={styles.slickDotsBottom}
          style={{ height: 'auto', paddingBottom: '65px' }}
        >
          <div>
            <div>
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
        </div>
      </div>
    </div>

    {/* Success stories container */}
    <div
      className={styles.homePageContainer}
      style={{ backgroundColor: '#F8FDFF' }}
    >
      <div style={{ marginBottom: '10px' }}>
        <img
          className={styles.homePageImage}
          src="/success.png"
          alt="success-image"
          style={{ maxWidth: '300px' }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div>
          <p
            className={styles.homePageSecondaryTitle}
            style={{ textAlign: 'center', fontSize: '30px', color: '#3D317C' }}
          >
            Let`s hear it from our
            <br /> ScholarX Alumni
          </p>
          <div className={styles.homePageSecondaryButton}>
            ScholarX Success Stories
          </div>
        </div>
      </div>
    </div>

    {/* Archive container */}
    <div
      className={styles.homePageContainer}
    >
      <div style={{ textAlign: 'center' }}>
        <div>
          <p
            className={styles.homePageSecondaryTitle}
            style={{ fontSize: '30px', color: '#3D317C' }}
          >
            Checkout our past
            <br /> mentors and mentees
          </p>
          <div className={styles.homePageSecondaryButton}>
            ScholarX Archive
          </div>
        </div>
      </div>
      <div>
        <img
          className={styles.homePageImage}
          src="/scholarX-archive.png"
          alt="scholarX-archive-image"
          style={{ maxWidth: '360px' }}
        />
      </div>
    </div>

    {/* FAQs container */}
    <div
      className={styles.homePageContainer}
    >
      <div style={{ textAlign: 'center' }}>
        <p
          className={styles.homePageSecondaryTitle}
          style={{ fontSize: '25px', color: '#3D317C', fontWeight: 600 }}
        >
          FAQ for Mentors
        </p>
      </div>
      <div>
        <FAQCollapse faqs={mentorFAQs} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p
          className={styles.homePageSecondaryTitle}
          style={{ fontSize: '25px', color: '#3D317C', fontWeight: 600 }}
        >
          FAQ for Mentees
        </p>
      </div>
      <div>
        <FAQCollapse faqs={menteeFAQs} />
      </div>
    </div>
  </div>
);
export default Home;
