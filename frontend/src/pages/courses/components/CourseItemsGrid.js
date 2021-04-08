import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listCoursesAction } from './../../../actions/courseActions.js'
import Pagination from './../../../components/Pagination'


const CourseItemGrid = () => {
    const keyword = ''

    const dispatch = useDispatch()

    const courseList = useSelector(state => state.courseList)
    const { courses } = courseList

    // Debbing methode for console log function
    const Console = prop => (
        console[Object.keys(prop)[0]](...Object.values(prop))
        , null // ➜ React components must return something 
      )
      
    useEffect(() => {
        dispatch(listCoursesAction(keyword))
    }, [dispatch, keyword])


        return (
            <Fragment>
                {/* Course Item */}
                {
                    courses.map((course, i) => (
                        <Col lg="6" md="12" key={i++}>
                             <Link to={`/course/${course._id}`}>
                            <div className="course-item">
                                <Console log={course.title}/>
                               
                                    <div className="course-image" style={{ backgroundImage: `url(${course.image})` }}>
                                        <div className="author-img d-flex">
                                            <div className="img">
                                                <img src={course.image} alt="" />
                                            </div>
                                            <div className="title">
                                                <p>{course.title}</p>
                                                <span>{course.title}</span>
                                            </div>
                                        </div>
                                        <div className="course-price">
                                            <p>{course.duration}</p>
                                        </div>
                                    </div>
                                
                                <div className="course-content">
                                    <h6 className="heading">{course.title}</h6>
                                    <p className="desc">{course.discription}</p>
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
                            </Link>
                        </Col>
                        
                    
                    ))
                }

                <Col md="12" className="text-center">
                    <Pagination />
                </Col>
            </Fragment>
        )
}

export default CourseItemGrid
