import React from 'react'
import {Card} from "antd";
import testimonialImage from '../assets/testimonial-image.png'

function TestimonialCard(){

    return (
        <>
            <Card
                style={{ width: '250px', height:'276px'}}
            >
                <img
                    src={testimonialImage}
                    alt="testimonial-image"
                    width={222}
                    style={{display:'flex', marginRight:'auto', marginLeft:'auto'}}
                />
                <p style={{fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'14px', fontWeight:'bold'}}>
                    Adipiscing aliquam scelerisque
                </p>

                <p style={{fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'12px', fontWeight:'lighter'}}>
                    Sit tempor in egestas eget risus fames massa. Morbi
                    vitae ante tortor lacinia amet cursus est eget nisi. Est mauris nam a euismod in nibh.
                </p>
            </Card>
        </>
    );
}

export default TestimonialCard