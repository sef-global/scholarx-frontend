import React from 'react'
import {Button, Col, Row, Carousel} from 'antd';
import findMentor from '../../assets/new-findmentor.png'
import success from '../../assets/success.png'
import scholarXArchive from '../../assets/scholarX-archive.png'
import TestimonialCard from "./Testimonials/TestimonialCard";
import FAQCollapse from "./FAQ/FAQCollapse";
import styles from "./Home.css"

function Home(){
    return(
        <>
            {/* Main title container*/}
            <Row className={styles.homePageContainer} style={{paddingRight:'10%', paddingLeft:'10%'}}
                 align={"middle"} justify={"center"}>
                <Col xs={24} md={24} lg={24} xl={12}>
                    <p className={styles.homePageMainTitle}>
                        Unlock Mentorship Opportunities with ScholarX
                    </p>
                    <Button className={styles.homePageMainButton} type={"primary"} style={{marginRight:'20px'}}>
                        Apply
                    </Button>
                    <Button className={styles.homePageMainButton}>
                        See more
                    </Button>
                </Col>
                <Col xs={24} md={24} xl={12}>
                    <img src={findMentor} alt='find-mentor' width={600} style={{display:'flex', marginRight:'auto', marginLeft:'auto'}}/>
                </Col>
            </Row>

            {/* Statistics container*/}
            <Row style={{backgroundColor:'#F7F8FA', textAlign:"center"}} align={"middle"} justify={"center"}>
                <Col xs={24} xl={5}>
                    <p className={styles.homePageSecondaryTitle}>
                        100,000+
                    </p>
                    <p className={styles.homePageSecondaryTitle} style={{fontSize:'20px', fontWeight: 300}}>
                        Mentees
                    </p>
                </Col>
                <Col xs={24} xl={5}>
                    <p className={styles.homePageSecondaryTitle}>
                        500+
                    </p>
                    <p className={styles.homePageSecondaryTitle} style={{fontSize:'20px', fontWeight: 300}}>
                        Mentors
                    </p>
                </Col>
                <Col xs={24} xl={5}>
                    <p className={styles.homePageSecondaryTitle}>
                        70%
                    </p>
                    <p className={styles.homePageSecondaryTitle} style={{fontSize:'20px', fontWeight: 300}}>
                        Growth
                    </p>
                </Col>
            </Row>

            {/* Testimonials container*/}
            <Row className={styles.homePageContainer} align={"middle"} justify={"center"}>
                <Col span={24}>
                    <p className={styles.homePageSecondaryTitle} style={{textAlign:'center', fontSize:'36px', color:'#3D317C'}}>
                        Testimonials
                    </p>
                    <p className={styles.homePageSecondaryTitle} style={{textAlign:'center', fontSize:'15px', color:'black', fontWeight:300}}>
                        Have a look what our past<br/>mentees say about ScholarX
                    </p>
                </Col>
                <Col span={24}>
                    <Carousel className={styles.slickSlider} style={{height:'auto', paddingBottom:'68px'}} autoplay>
                        <div>
                            <Row align={"middle"} justify={"center"}>
                                <Col xs={24} md={8} lg={6} xl={5}><TestimonialCard/></Col>
                                <Col xs={24} md={8} lg={6} xl={5}><TestimonialCard/></Col>
                                <Col xs={24} md={8} lg={6} xl={5}><TestimonialCard/></Col>
                                <Col xs={24} md={8} lg={6} xl={5}><TestimonialCard/></Col>
                            </Row>
                        </div>
                        <div>
                            <Row align={"middle"} justify={"center"}>
                                <Col xs={24} md={8} lg={6} xl={5}><TestimonialCard/></Col>
                                <Col xs={24} md={8} lg={6} xl={5}><TestimonialCard/></Col>
                                <Col xs={24} md={8} lg={6} xl={5}><TestimonialCard/></Col>
                                <Col xs={24} md={8} lg={6} xl={5}><TestimonialCard/></Col>
                            </Row>
                        </div>
                    </Carousel>
                </Col>
            </Row>

            {/* Success stories container*/}
            <Row className={styles.homePageContainer} style={{backgroundColor:'#F8FDFF'}} align={"middle"} justify={"center"}>
                <Col xs={24} xl={8}>
                    <img className={styles.homePageImage} src={success} alt="success-image"/>
                </Col>
                <Col xs={24} xl={8}>
                    <p className={styles.homePageSecondaryTitle} style={{textAlign:'center', fontSize:'30px', color:'#3D317C'}}>
                        Let's hear it from our<br/> ScholarX Alumni
                    </p>
                    <Button className={styles.homePageSecondaryButton} type={"primary"}>
                        ScholarX Success Stories
                    </Button>
                </Col>
            </Row>

            {/* Archive container*/}
            <Row className={styles.homePageContainer} align={"middle"} justify={"center"}>
                <Col xs={24} xl={8}>
                    <p className={styles.homePageSecondaryTitle} style={{textAlign:'center', fontSize:'30px', color:'#3D317C'}}>
                        Checkout our past <br/>mentors and mentees
                    </p>
                    <Button className={styles.homePageSecondaryButton} type={"primary"}>
                        ScholarX Archive
                    </Button>
                </Col>
                <Col xs={24} xl={8}>
                    <img className={styles.homePageImage} src={scholarXArchive} alt="scholarX-archive-image"/>
                </Col>
            </Row>

            {/* FAQs container*/}
            <Row className={styles.homePageContainer} align={"middle"} justify={"center"}>
                <Col span={24}>
                    <p className={styles.homePageSecondaryTitle} style={{textAlign:'center', fontSize:'25px', color:'#3D317C', fontWeight:600}}>
                        FAQ for Mentors
                    </p>
                </Col>
                <Col span={12}>
                    <FAQCollapse/>
                </Col>
                <Col span={24}>
                    <p className={styles.homePageSecondaryTitle} style={{textAlign:'center', fontSize:'25px', color:'#3D317C', fontWeight:600}}>
                        FAQ for Mentees
                    </p>
                </Col>
                <Col span={12}>
                    <FAQCollapse/>
                </Col>
            </Row>
        </>
    );
}

export default Home
