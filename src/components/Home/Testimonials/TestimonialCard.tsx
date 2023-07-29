import React from 'react'
import {Card, Space, Typography} from "antd";
import testimonialImage from '../../../assets/testimonial-image.png'
import styles from "./TestimonialCard.css"

const {Text} = Typography;

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
                <Space direction={"vertical"}>
                    <Text className={styles.testimonialCardTitle}>
                        Adipiscing aliquam scelerisque
                    </Text>
                    <Text className={styles.testimonialCardContent}>
                        Sit tempor in egestas eget risus fames massa. Morbi
                        vitae ante tortor lacinia amet cursus est eget nisi. Est mauris nam a euismod in nibh.
                    </Text>
                </Space>
            </Card>
        </>
    );
}
export default TestimonialCard