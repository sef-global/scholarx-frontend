import React from 'react';
import { Col, Row, Typography } from 'antd';
import styles from './Home.module.css';
import FAQSection from '../FAQ';
import menteeFAQs from '../FAQ/MenteeFAQs.json';
import mentorFAQs from '../FAQ/MentorFAQs.json';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const Home: React.FC = () => {
  return (
    <>
      {/* Main title container */}
      <div className="homePageContainerNew flex flex-col md:flex-row items-center justify-center">
        <div className="col">
          <div className="text-3xl md:text-[43px] font-bold text-[#32325D]">
            Unlock Mentorship opportunities with ScholarX
          </div>
          <div className="wrapper mt-[40px]">
            <div className="buttonWrapper flex mt-10">
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
      <div className="homePageContainerNew flex justify-evenly p-[4%] m-0 items-center flex-col md:flex-row flex-wrap bg-[#F7F8FA] ">
        <div className="ContainerOne text-center">
          <div className="homePageSecondaryTitleNew text-3xl font-bold text-[#1D1D1F]">
            100,000+
          </div>
          <div className="homePageSecondaryTitleNew font-normal text-[20px] text-[#1D1D1F]">
            Mentees
          </div>
        </div>
        <div className="ContainerTwo  text-center">
          <div className="homePageSecondaryTitleNew text-3xl font-bold text-[#1D1D1F]">
            500+
          </div>
          <div className="homePageSecondaryTitleNew font-normal text-[20px] text-[#1D1D1F]">
            Mentors
          </div>
        </div>
        <div className="ContainerThree  text-center">
          <div className="homePageSecondaryTitleNew text-3xl font-bold text-[#1D1D1F]">
            70%
          </div>
          <div className="homePageSecondaryTitleNew font-normal font-sans text-[20px] text-[#1D1D1F]">
            Growth
          </div>
        </div>
      </div>

      {/* Success stories container */}
      <div className="homePageContainerNew p-[4%] bg-[#F8FDFF] flex  flex-col md:flex-row justify-center items-center">
        <div className="imageCol mb-2.5">
          <img
            className="max-w-[300px] mx-auto  w-[100%]"
            src="../../../public/success.png"
            alt="success-image"
          />
        </div>
        <div className="textCol md:ml-16 ">
          <div className="homepageSecondaryTitleNew text-3xl font-bold text-darkmod-blue text-center mb-2.5">
            Let&apos;s hear it from our
            <br /> ScholarX Alumni
          </div>
          <div className="homePageSecondaryButtonNew flex justify-center items-center">
            <a href="#">
              <button className=" shadow-[0_2px_0_rgba(5,145,255,0.1)] bg-[#ffffff] hover:bg-[#1677ff] text-[#FFFFFF] font-bold text-sm w-[214px] h-[34px] rounded mx-auto">
                ScholarX Success Stories
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Archive container */}

      <div className="homePagecontainernew p-[4%] bg-[#F8FDFF] flex  flex-col md:flex-row justify-center items-center mb-1">
        <div className="textCol md:mr-16 ">
          <div className="homepageSecondaryTitleNew text-3xl font-bold text-darkmod-blue text-center mb-2.5">
            Checkout our past
            <br /> mentors and mentees
          </div>
          <div className="homePageSecondaryButtonNew flex justify-center items-center">
            <a href="#">
              <button className=" shadow-[0_2px_0_rgba(5,145,255,0.1)] bg-[#ffffff] hover:bg-[#1677ff] text-[#FFFFFF] font-bold text-sm w-[214px] h-[34px] rounded mx-auto">
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
      <Row
        className={styles.homePageContainer}
        align={'middle'}
        justify={'center'}
      >
        <Col span={24} style={{ textAlign: 'center' }}>
          <Text
            className={styles.homePageSecondaryTitle}
            style={{ fontSize: '25px', color: '#3D317C', fontWeight: 600 }}
          >
            FAQ for Mentors
          </Text>
        </Col>
        <Col xs={20} xl={12}>
          <FAQSection faqs={mentorFAQs} />
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Text
            className={styles.homePageSecondaryTitle}
            style={{ fontSize: '25px', color: '#3D317C', fontWeight: 600 }}
          >
            FAQ for Mentees
          </Text>
        </Col>
        <Col xs={20} xl={12}>
          <FAQSection faqs={menteeFAQs} />
        </Col>
      </Row>
    </>
  );
};
export default Home;
