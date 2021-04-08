import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import HeaderTwo from './../../components/HeaderTwo';
import { BreadcrumbBox } from './../../components/common/Breadcrumb';
import CourseSearch from '../courses/components/CourseSearch';
import CourseCategory from '../courses/components/CourseCategory';
import FooterTwo from './../../components/FooterTwo';
import { Styles } from './styles/profCourses.js';
import {
    listProfCoursesAction,
    deleteCourseAction,    
 } from './../../actions/courseActions.js'

const ProfCourses = ({ history }) => {

    const dispatch = useDispatch()

    const courseProfList = useSelector((state) => state.courseProfList)
    const { courses} = courseProfList

    const courseDelete = useSelector((state) => state.courseDelete)
    const {
        success: successDelete,
    } = courseDelete

    const professorLogin = useSelector((state) => state.professorLogin)
    const { professorInfo } = professorLogin

    useEffect(() => {

        if (!professorInfo) {
        history.push('/professors/login')
        }
        dispatch(listProfCoursesAction(''))
    }, [
        dispatch,
        history,
        professorInfo,
        successDelete,
    ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
        dispatch(deleteCourseAction(id))
        }
    }
        return (
            <Styles>
                {/* Main Wrapper */}
                <div className="main-wrapper event-page">

                    {/* Header 2 */}
                    <HeaderTwo />

                    {/* Breadcroumb */}
                    <BreadcrumbBox title="My Courses" />

                    {/* Events Area */}
                    <section className="event-page-area">
                        <Container>
                            <Row>
                                <Col lg="9" md="12">
                                    {
                                        courses.map((course) => (
                                            <div className="event-box">
                                                <Row>
                                                    <Col xl="3" lg="4" md="0">
                                                        <div className="event-img">
                                                            <Link to={`/my-courses/${course._id}`}><img src={process.env.PUBLIC_URL + `${course.image}`} alt="" className="img-fluid" /></Link>
                                                        </div>
                                                    </Col>
                                                    <Col xl="9" lg="8" md="12">
                                                        <div className="event-content">
                                                            <div className="content-box">
                                                                <Row>
                                                                    <Col md="9">
                                                                        <div className="event-title">
                                                                            <h6><Link to={`/my-courses/${course._id}`}>{course.title}</Link></h6>
                                                                        </div>
                                                                        <div className="event-time-location">
                                                                            <ul className="list-unstyled list-inline">
                                                                                <li className="list-inline-item"><i className="las la-clock"></i> {course.duration} Weeks</li>
                                                                                <li className="list-inline-item"><i className="las la-star"></i> {course.rating} / 5 </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="event-desc">
                                                                            <p>{course.description}</p>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md="3" className="text-center">
                                                                        <div className="event-date">
                                                                            <p>{course.difficulty}</p>
                                                                        </div>
                                                                        <div className="join-btn">
                                                                            <Link to=''>Edit</Link>
                                                                        </div>
                                                                        <br></br>
                                                                        <div className="delete-btn">
                                                                            <Link to='' onClick={() => deleteHandler(course._id)}>Delete</Link>
                                                                        </div>
                                                                        <br></br>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <br />
                                                </Row>
                                                <br />
                                            </div>
                                        ))
                                    }

                                <Col md="12" className="text-center">
                                       
                                    </Col>
                                </Col>

                                <Col lg="3" md="0">
                                    <Col md="12">
                                    <CourseSearch />
                                </Col>
                                <Col md="12">
                                    <CourseCategory />
                                 </Col>
                                </Col>

                            </Row>
                        </Container>
                    </section>
                    {/* Footer 2 */}
                    <FooterTwo />

                </div>
            </Styles>
        )
}

export default ProfCourses