import React from 'react'
import {Card} from "antd";
import testimonialImage from '../../../assets/testimonial-image.png'
import styles from "./TestimonialCard.css"

function TestimonialCard(){

    return (
        <>
            <Card className={styles.testimonialCardContainer}
            >
                <img
                    className={styles.testimonialCardImage}
                    src={testimonialImage}
                    alt="testimonial-image"
                />
                <p className={styles.testimonialCardTitle}>
                    Adipiscing aliquam scelerisque
                </p>

                <p className={styles.testimonialCardContent}>
                    Sit tempor in egestas eget risus fames massa. Morbi
                    vitae ante tortor lacinia amet cursus est eget nisi. Est mauris nam a euismod in nibh.
                </p>
            </Card>
        </>
    );
}

export default TestimonialCard