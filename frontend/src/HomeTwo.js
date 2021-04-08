import React, { Component } from 'react';
import HeaderTwo from './components/HeaderTwo';
import HeroImage from './components/HeroImage';
import ServiceBox from './components/ServiceBox';
import AboutUsTwo from './components/AboutUsTwo';
import CourseSlider from './components/CourseSlider';
import NumberCounter from './components/NumberCounter';
import TestimonialSlider from './components/TestimonialSlider';
import FooterTwo from './components/Footer';

export default class HomeTwo extends Component {
    render() {
        return (
            <div className="main-wrapper">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Hero Image */}
                <HeroImage />

                {/* Service Box */}
                <ServiceBox />

                {/* About Us 2 */}
                <AboutUsTwo />

                {/* Course Slider */}
                <CourseSlider />

                {/* Counter Area */}
                <NumberCounter />

                {/* Free Course Area */}

                {/* Team Slider */}

                {/* Testimonial Slider */}
                <TestimonialSlider />

                {/* Blog Area */}


                {/* Footer 2 */}
                <FooterTwo />

            </div>
        )
    }
}
