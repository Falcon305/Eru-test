import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import { Styles } from "./styles/courseSlider.js";
import { useDispatch, useSelector } from 'react-redux'
import { listTopCoursesAction } from './../actions/courseActions.js'

const CourseSlider = () => {


    const dispatch = useDispatch()

    const courseTopRated = useSelector((state) => state.courseTopRated)
    const { courses } = courseTopRated
  
    useEffect(() => {
      dispatch(listTopCoursesAction())
    }, [dispatch])

        
    const settings = {
        slidesPerView: 3,
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        spaceBetween: 30,
        watchSlidesVisibility: true,
        pagination: {
            el: '.slider-dot.text-center',
            clickable: true
        },
       
    };

        return (
            <Styles>
                {/* Course Slider */}
                <section className="course-slider-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="sec-title text-center">
                                    <h4>Popular Courses</h4>
                                </div>
                            </Col>
                            <Col md="12" className="course-slider">
                                <Swiper {...settings}>
                                    {
                                        courses.map((course, i) => (

                                            <div className="course-item" key={i}>
                                                <Link to={`/course/${course._id}`}>
                                                    <div className="course-image" style={{ backgroundImage: `url(${course.image})` }}>
                                                        <div className="author-img d-flex">
                                                            <div className="img">
                                                                <img src={`${course.image}`} alt="" />
                                                            </div>
                                                            <div className="title">
                                                                <p>{course.title}</p>
                                                                <span>{course.title}</span>
                                                            </div>
                                                        </div>
                                                        <div className="course-price">
                                                            <p>{course.duration} Weeks</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="course-content">
                                                    <h6 className="heading"><Link to={`/course/${course._id}`}>{course.title}</Link></h6>
                                                    <p className="desc">{course.description}</p>
                                                    <div className="course-face d-flex justify-content-between">
                                                        <div className="duration">
                                                            <p><i className="las la-clock"></i>120</p>
                                                        </div>
                                                        <div className="rating">
                                                            <ul className="list-unstyled list-inline">
                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                <li className="list-inline-item"><i className="las la-star-half-alt"></i>
                                                                </li>
                                                                <li className="list-inline-item">(4.5)</li>
                                                            </ul>
                                                        </div>
                                                        <div className="student">
                                                            <p><i className="las la-chair"></i>60</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Swiper>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Styles>
        );
}

export default CourseSlider
