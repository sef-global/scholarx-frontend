import React from 'react'
import {Button, Col, Row, Carousel, Typography, Space} from 'antd';
import findMentor from '../../../public/assets/new-findmentor.png'
import success from '../../../public/assets/success.png'
import scholarXArchive from '../../../public/assets/scholarX-archive.png'
import TestimonialCard from "../Testimonials/TestimonialCard";
import FAQCollapse from "../FAQ/FAQCollapse";
import mentorFAQs from "../FAQ/MentorFAQs.json"
import menteeFAQs from "../FAQ/MenteeFAQs.json"
import styles from "./Home.css"

const {Text} = Typography;

const Home:React.FC = () => (
        <>
            {/* Main title container*/}
            <Row className={styles.homePageContainer} style={{paddingRight:'10%', paddingLeft:'10%'}} align={"middle"} justify={"center"}>
                <Col xs={24} md={24} lg={24} xl={12}>
                    <Text className={styles.homePageMainTitle}>
                        Unlock Mentorship Opportunities with ScholarX
                    </Text>
                    <div style={{marginTop:'40px'}}>
                        <Button className={styles.homePageMainButton} type={"primary"} style={{marginRight:'20px', marginBottom:'20px'}}>
                            Apply
                        </Button>
                        <Button className={styles.homePageMainButton}>
                            See more
                        </Button>
                    </div>
                </Col>
                <Col xs={24} md={24} xl={12} style={{marginTop:'40px'}}>
                    <img className={styles.homePageImage} src={findMentor} alt='find-mentor' style={{maxWidth:'600px'}}/>
                </Col>
            </Row>

            {/* Statistics container*/}
            <Row className={styles.homePageContainer} style={{backgroundColor:'#F7F8FA', textAlign:"center"}} align={"middle"} justify={"center"}>
                <Col xs={24} md={5} xl={5}>
                    <Space direction={"vertical"}>
                        <Text className={styles.homePageSecondaryTitle}>
                            100,000+
                        </Text>
                        <Text className={styles.homePageSecondaryTitle} style={{fontSize:'20px', fontWeight: 300}}>
                            Mentees
                        </Text>
                    </Space>
                </Col>
                <Col xs={24} md={5} xl={5}>
                    <Space direction={"vertical"}>
                        <Text className={styles.homePageSecondaryTitle}>
                            500+
                        </Text>
                        <Text className={styles.homePageSecondaryTitle} style={{fontSize:'20px', fontWeight: 300}}>
                            Mentors
                        </Text>
                    </Space>
                </Col>
                <Col xs={24} md={5} xl={5}>
                    <Space direction={"vertical"}>
                        <Text className={styles.homePageSecondaryTitle}>
                            70%
                        </Text>
                        <Text className={styles.homePageSecondaryTitle} style={{fontSize:'20px', fontWeight: 300}}>
                            Growth
                        </Text>
                    </Space>
                </Col>
            </Row>

            {/* Testimonials container*/}
            <Row className={styles.homePageContainer} style={{textAlign:'center'}} align={"middle"} justify={"center"}>
                <Col xs={24} xl={6} style={{marginBottom:'30px'}}>
                    <Space direction={"vertical"}>
                        <Text className={styles.homePageSecondaryTitle} style={{fontSize:'36px', color:'#3D317C'}}>
                            Testimonials
                        </Text>
                        <Text className={styles.homePageSecondaryTitle} style={{fontSize:'15px', color:'black', fontWeight:300}}>
                            Have a look what our past <br/> mentees say about ScholarX
                        </Text>
                    </Space>
                </Col>
                <Col span={24}>
                    <Carousel className={styles.slickDotsBottom} style={{height:'auto', paddingBottom:'65px'}} autoplay>
                        <div>
                            <Row align={"middle"} justify={"center"}>
                                <Col xs={24} md={10} lg={6} xl={5}><TestimonialCard/></Col>
                                <Col xs={24} md={10} lg={6} xl={5}><TestimonialCard/></Col>
                                <Col xs={24} md={10} lg={6} xl={5}><TestimonialCard/></Col>
                                <Col xs={24} md={10} lg={6} xl={5}><TestimonialCard/></Col>
                            </Row>
                        </div>
                        <div>
                            <Row align={"middle"} justify={"center"}>
                                <Col xs={24} md={10} lg={6} xl={5}><TestimonialCard/></Col>
                                <Col xs={24} md={10} lg={6} xl={5}><TestimonialCard/></Col>
                                <Col xs={24} md={10} lg={6} xl={5}><TestimonialCard/></Col>
                                <Col xs={24} md={10} lg={6} xl={5}><TestimonialCard/></Col>
                            </Row>
                        </div>
                    </Carousel>
                </Col>
            </Row>

            {/* Success stories container*/}
            <Row className={styles.homePageContainer} style={{backgroundColor:'#F8FDFF'}} align={"middle"} justify={"center"}>
                <Col xs={24} md={10} xl={8} style={{marginBottom:'10px'}}>
                    <img className={styles.homePageImage} src={success} alt="success-image" style={{maxWidth:'300px'}}/>
                </Col>
                <Col xs={24} md={12} xl={8} style={{textAlign:'center'}}>
                    <Space direction={"vertical"}>
                        <Text className={styles.homePageSecondaryTitle} style={{textAlign:'center', fontSize:'30px', color:'#3D317C'}}>
                            Let's hear it from our<br/> ScholarX Alumni
                        </Text>
                        <Button className={styles.homePageSecondaryButton} type={"primary"}>
                            ScholarX Success Stories
                        </Button>
                    </Space>
                </Col>
            </Row>

            {/* Archive container*/}
            <Row className={styles.homePageContainer} align={"middle"} justify={"center"}>
                <Col xs={24} md={12} xl={8} style={{textAlign:'center'}}>
                    <Space direction={"vertical"}>
                        <Text className={styles.homePageSecondaryTitle} style={{fontSize:'30px', color:'#3D317C'}}>
                            Checkout our past<br/> mentors and mentees
                        </Text>
                        <Button className={styles.homePageSecondaryButton} type={"primary"}>
                            ScholarX Archive
                        </Button>
                    </Space>
                </Col>
                <Col xs={24} md={12} xl={8}>
                    <img className={styles.homePageImage} src={scholarXArchive} alt="scholarX-archive-image" style={{maxWidth:'360px'}}/>
                </Col>
            </Row>

            {/* FAQs container*/}
            <Row className={styles.homePageContainer} align={"middle"} justify={"center"}>
                <Col span={24} style={{textAlign:'center'}}>
                    <Text className={styles.homePageSecondaryTitle} style={{fontSize:'25px', color:'#3D317C', fontWeight:600}}>
                        FAQ for Mentors
                    </Text>
                </Col>
                <Col xs={20} xl={12}>
                    <FAQCollapse faqs={mentorFAQs}/>
                </Col>
                <Col span={24} style={{textAlign:'center'}}>
                    <Text className={styles.homePageSecondaryTitle} style={{fontSize:'25px', color:'#3D317C', fontWeight:600}}>
                        FAQ for Mentees
                    </Text>
                </Col>
                <Col xs={20} xl={12}>
                    <FAQCollapse faqs={menteeFAQs}/>
                </Col>
            </Row>
        </>
);
export default Home