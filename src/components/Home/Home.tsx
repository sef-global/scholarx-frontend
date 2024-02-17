import React from 'react';

import { Button, Col, Row, Carousel, Typography, Space } from 'antd';

import styles from './Home.module.css';
import FAQCollapse from '../FAQ/FAQCollapse';
import menteeFAQs from '../FAQ/MenteeFAQs.json';
import mentorFAQs from '../FAQ/MentorFAQs.json';
import TestimonialCard from '../Testimonials/TestimonialCard';

const { Text } = Typography;

const Home: React.FC = () => (
  <>
    {/* Main title container */}
    <Row
      className={styles.homePageContainer}
      style={{ paddingRight: '10%', paddingLeft: '10%' }}
      align={'middle'}
      justify={'center'}
    >
      <Col xs={24} md={24} lg={24} xl={12}>
        <Text className={styles.homePageMainTitle}>
          Unlock Mentorship Opportunities with ScholarX
        </Text>
        <div style={{ marginTop: '40px' }}>
          <div className="flex mt-10">
            <Button className="flex justify-center items-center mr-5 mb-5 bg-blue-500 hover:bg-blue-700 text-white py-1 px-16 rounded w-40 h-9 font-sans font-bold">
              Apply
            </Button>
            <Button className="flex justify-center items-center mr-5 mb-5 text-black py-1 px-16 rounded w-40 h-9 font-sans">
              See more
            </Button>
          </div>
        </div>
      </Col>
      <Col xs={24} md={24} xl={12} style={{ marginTop: '40px' }}>
        <img
          className={styles.homePageImage}
          src="/new-findmentor.png"
          alt="find-mentor"
          style={{ maxWidth: '600px' }}
        />
      </Col>
    </Row>

    {/* Statistics container */}
    <Row
      className={styles.homePageContainer}
      style={{ backgroundColor: '#F7F8FA', textAlign: 'center' }}
      align={'middle'}
      justify={'center'}
    >
      <Col xs={24} md={5} xl={5}>
        <Space direction={'vertical'}>
          <Text className={styles.homePageSecondaryTitle}>100,000+</Text>
          <Text
            className={styles.homePageSecondaryTitle}
            style={{ fontSize: '20px', fontWeight: 300 }}
          >
            Mentees
          </Text>
        </Space>
      </Col>
      <Col xs={24} md={5} xl={5}>
        <Space direction={'vertical'}>
          <Text className={styles.homePageSecondaryTitle}>500+</Text>
          <Text
            className={styles.homePageSecondaryTitle}
            style={{ fontSize: '20px', fontWeight: 300 }}
          >
            Mentors
          </Text>
        </Space>
      </Col>
      <Col xs={24} md={5} xl={5}>
        <Space direction={'vertical'}>
          <Text className={styles.homePageSecondaryTitle}>70%</Text>
          <Text
            className={styles.homePageSecondaryTitle}
            style={{ fontSize: '20px', fontWeight: 300 }}
          >
            Growth
          </Text>
        </Space>
      </Col>
    </Row>

    {/* Testimonials container */}
    <Row
      className={styles.homePageContainer}
      style={{ textAlign: 'center' }}
      align={'middle'}
      justify={'center'}
    >
      <Col xs={24} xl={6} style={{ marginBottom: '30px' }}>
        <Space direction={'vertical'}>
          <Text
            className={styles.homePageSecondaryTitle}
            style={{ fontSize: '36px', color: '#3D317C' }}
          >
            Testimonials
          </Text>
          <Text
            className={styles.homePageSecondaryTitle}
            style={{ fontSize: '15px', color: 'black', fontWeight: 300 }}
          >
            Have a look what our past <br /> mentees say about ScholarX
          </Text>
        </Space>
      </Col>
      <Col span={24}>
        <Carousel
          className={styles.slickDotsBottom}
          style={{ height: 'auto', paddingBottom: '65px' }}
          autoplay
        >
          <div>
            <Row align={'middle'} justify={'center'}>
              <Col xs={24} md={10} lg={6} xl={5}>
                <TestimonialCard />
              </Col>
              <Col xs={24} md={10} lg={6} xl={5}>
                <TestimonialCard />
              </Col>
              <Col xs={24} md={10} lg={6} xl={5}>
                <TestimonialCard />
              </Col>
              <Col xs={24} md={10} lg={6} xl={5}>
                <TestimonialCard />
              </Col>
            </Row>
          </div>
          <div>
            <Row align={'middle'} justify={'center'}>
              <Col xs={24} md={10} lg={6} xl={5}>
                <TestimonialCard />
              </Col>
              <Col xs={24} md={10} lg={6} xl={5}>
                <TestimonialCard />
              </Col>
              <Col xs={24} md={10} lg={6} xl={5}>
                <TestimonialCard />
              </Col>
              <Col xs={24} md={10} lg={6} xl={5}>
                <TestimonialCard />
              </Col>
            </Row>
          </div>
        </Carousel>
      </Col>
    </Row>

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
        <div className="homepageSecondaryTitleNew font-sans text-3xl font-bold text-darkmod-blue text-center mb-2.5">
          Let`s hear it from our
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
        <div className="homepageSecondaryTitleNew font-sans text-3xl font-bold text-darkmod-blue text-center mb-2.5">
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
        <FAQCollapse faqs={mentorFAQs} />
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
        <FAQCollapse faqs={menteeFAQs} />
      </Col>
    </Row>
  </>
);
export default Home;
