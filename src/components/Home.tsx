import React from 'react'
import {Button, Col, Row, Carousel} from 'antd';
import findMentor from '../assets/new-findmentor.png'
import success from '../assets/success.png'
import scholarXArchive from '../assets/scholarX-archive.png'
import TestimonialCard from "./TestimonialCard";
import styles from './Home.css'
import FAQCollapse from "./FAQCollapse";

const style: React.CSSProperties = {
    fontFamily:'-apple-system, SanFranciscoText, sans-serif',
    color: '#32325D',
    fontSize:'43px',
    fontWeight:'bold'
};

function Home(){
    return(
        <>
            <Row style={{padding:'8%'}}>
                <Col span={12}>
                    <p style={style}>
                        Lorem ipsum dolor sit amet, consectetur
                    </p>
                    <Button type={"primary"}
                            style={{width:'160px', height:'37px', fontWeight:'bold', marginRight:'20px'}}
                    >
                        Apply
                    </Button>
                    <Button style={{width:'160px', height:'37px', fontWeight:'bold'}}>
                        See more
                    </Button>
                </Col>
                <Col span={12}>
                    <img src={findMentor} alt='find-mentor' width={600}/>
                </Col>
            </Row>
            <Row  style={{backgroundColor:'#F7F8FA', textAlign:"center", height:'185px'}} align={"middle"} justify={"center"}>
                <Col span={5}>
                    <p style={{fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'30px',
                        color:'#1D1D1F', fontWeight:'bold'}}>
                        100,000+
                    </p>
                    <p style={{fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'20px',
                        color:'#1D1D1F', fontWeight: 300}}>
                        Mentees
                    </p>
                </Col>
                <Col span={5}>
                    <p style={{fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'30px',
                        color:'#1D1D1F', fontWeight:'bold'}}>
                        500+
                    </p>
                    <p style={{fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'20px',
                        color:'#1D1D1F', fontWeight:300}}>
                        Mentors
                    </p>
                </Col>
                <Col span={5}>
                    <p style={{fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'30px',
                        color:'#1D1D1F', fontWeight:'bold'}}>
                        70%
                    </p>
                    <p style={{fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'20px',
                        color:'#1D1D1F', fontWeight:300}}>
                        Growth
                    </p>
                </Col>
            </Row>
            <Row align={"middle"} justify={"center"}>
                <Col span={24}>
                    <p style={{textAlign:'center', fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'36px',
                        color:'#3D317C', fontWeight:'bold'}}>
                        Testimonials
                    </p>
                    <p style={{textAlign:'center', fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'15px',
                        color:'black', fontWeight:300}}>
                        Have a look what our past<br/>mentees say about ScholarX
                    </p>
                </Col>
                <Col span={24}>
                    <Carousel style={{height:'400px'}} autoplay>
                        <div>
                            <Row align={"middle"} justify={"center"}>
                                <Col span={4} style={{margin:'10px'}}><TestimonialCard/></Col>
                                <Col span={4} style={{margin:'10px'}}><TestimonialCard/></Col>
                                <Col span={4} style={{margin:'10px'}}><TestimonialCard/></Col>
                                <Col span={4} style={{margin:'10px'}}><TestimonialCard/></Col>
                            </Row>
                        </div>
                        <div>
                            <Row align={"middle"} justify={"center"}>
                                <Col span={4} style={{margin:'10px'}}><TestimonialCard/></Col>
                                <Col span={4} style={{margin:'10px'}}><TestimonialCard/></Col>
                                <Col span={4} style={{margin:'10px'}}><TestimonialCard/></Col>
                                <Col span={4} style={{margin:'10px'}}><TestimonialCard/></Col>
                            </Row>
                        </div>
                    </Carousel>
                </Col>
            </Row>
            <Row style={{padding:'5% 20%', backgroundColor:'#F8FDFF'}}>
                <Col span={12}>
                    <img src={success} alt="success-image"/>
                </Col>
                <Col span={12}>
                    <p style={{textAlign:'center', fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'30px',
                        color:'#3D317C', fontWeight:'bold'}}>Let's hear it from our<br/> ScholarX Alumni</p>
                    <Button type={"primary"}
                            style={{backgroundColor:'#172B4D', display:'flex', marginRight:'auto', marginLeft:'auto',
                            fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontWeight:'bold', fontSize:'13px'}}>
                        ScholarX Success Stories
                    </Button>
                </Col>
            </Row>

            <Row style={{padding:'5% 20%'}}>
                <Col span={12}>
                    <p style={{textAlign:'center', fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'30px',
                        color:'#3D317C', fontWeight:'bold'}}>Checkout our past <br/>mentors and mentees</p>
                    <Button type={"primary"}
                            style={{backgroundColor:'#172B4D', display:'flex', marginRight:'auto', marginLeft:'auto',
                                fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontWeight:'bold', fontSize:'13px'}}>
                        ScholarX Archive
                    </Button>
                </Col>
                <Col span={12}>
                    <img src={scholarXArchive} alt="scholarX-archive-image"/>
                </Col>
            </Row>

            <Row align={"middle"} justify={"center"}>
                <Col span={24}>
                    <p style={{textAlign:'center', fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'25px',
                        color:'#3D317C', fontWeight:600}}>FAQ for Mentors</p>
                </Col>
                <Col span={12}>
                    <FAQCollapse/>
                </Col>
            </Row>

            <Row align={"middle"} justify={"center"} style={{marginBottom:'10%'}}>
                <Col span={24}>
                    <p style={{textAlign:'center', fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'25px',
                        color:'#3D317C', fontWeight:600}}>FAQ for Mentees</p>
                </Col>
                <Col span={12}>
                    <FAQCollapse/>
                </Col>
            </Row>
        </>
    );
}

export default Home
