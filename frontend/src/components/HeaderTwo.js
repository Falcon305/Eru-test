import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, } from 'react-bootstrap';
import Search from './common/Search';
import StickyMenu from './common/StickyMenu';
import MobileMenu from './common/MobileMenu';
import { Styles } from "./styles/headerTwo.js";
import { useDispatch, useSelector } from 'react-redux'
import { professorLogoutAction } from './../actions/professorActions.js'

const HeaderTwo = () => {

    const dispatch = useDispatch()

    const professorLogin = useSelector((state) => state.professorLogin)
    const { professorInfo } = professorLogin

    const logoutHandler = () => {
        dispatch(professorLogoutAction())
    }
        return (
            <Styles>

                {/* Logo Area 2 */}
                <section className="logo-area2">
                    <Container>
                        <Row>
                            <Col md="4">
                                <div className="logo">
                                    <Link to={process.env.PUBLIC_URL + "/"}><img src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="" /></Link>
                                </div>
                            </Col>
                            <Col md="8">
                                <div className="menu-box d-flex justify-content-between">
                                <ul className="nav menu-nav">

                                    {/* Home */}
                                    <li className="nav-item dropdown active">
                                         <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/"} data-toggle="dropdown">Home </Link>
                                    </li>

                                    {/* Courses */}
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/course-grid"} data-toggle="dropdown">Courses </Link>
                                    </li>

                                    {/* About A */}
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to={process.env.PUBLIC_URL + "/about"} data-toggle="dropdown">About Us </Link>
                                    </li>
                                    <div className="search-box">
                                            <Search />
                                    </div>
                                </ul>
                                { professorInfo ? (
                            <>
                                                    {/* Profile Picture */}

                                <Col md="4">
                                    
                                    <div className="menu-box d-flex justify-content-between" style={{
                                                    marginLeft : "80px",
                                                    marginTop : "-13px",
                                                }}>
                                        <div style={{
                                                    marginLeft : "20px",
                                                    marginTop : "35px",
                                                }}
                                        >
                                            <i className="far fa-comment fa-2x" style={{ color: "#182B49" }}></i>
                                        </div>
                                        <div style={{
                                                    marginLeft : "20px",
                                                    marginTop : "35px",
                                                }}
                                        >
                                            <i className="far fa-bell fa-2x" style={{ color: "#182B49" }}></i>
                                        </div>

                                        <ul className="nav menu-nav" >
                                        <li className="nav-item dropdown active">
                                                <a href= "/" className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink"  data-toggle="dropdown">
                                                    <img alt="profile" src={process.env.PUBLIC_URL + "/assets/images/profile3.jpeg"} width="45" height="45" className="rounded-circle" />
                                                </a>
                                                <ul className="dropdown list-unstyled">
                                                    <li className="nav-item active"><Link to={process.env.PUBLIC_URL + "/profile"} className="nav-link" >Profile</Link></li>
                                                    <li className="nav-item active"><Link to={process.env.PUBLIC_URL + "/my-courses"} className="nav-link" >My Courses</Link></li>
                                                    <li className="nav-item active"><Link to={process.env.PUBLIC_URL + "/create-course"} className="nav-link" >Create Course</Link></li>
                                                    <li className="nav-item"><Link to='' className="nav-link"  onClick={logoutHandler} > LOG OUT </Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                        
                                    </div>
                                </Col>         
                                        
                            </>             
                                    ) : 
                                    
                                                /* LOG IN  LOG OUT */
                                    (
                                        <div className="menu-box d-flex justify-content-between">
                                            <div className="apply-btn">
                                                <Link style={{ marginRight : "10px" }} to={process.env.PUBLIC_URL + "/login"}> Login </Link> 
                                                <Link to={process.env.PUBLIC_URL + "/account-type"}> Register </Link>
                                            </div>
                                        </div>

                                        
                                    )}
                                    
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Sticky Menu */}
                <StickyMenu />

                {/* Mobile Menu */}
                <MobileMenu />
            </Styles>
        )
}

export default HeaderTwo
