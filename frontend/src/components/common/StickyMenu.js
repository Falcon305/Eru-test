import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from "./styles/stickyMenu.js";
import { useDispatch, useSelector } from 'react-redux'
import { professorLogoutAction } from './../../actions/professorActions.js'

function StickyMenu() {
    const dispatch = useDispatch()
    const professorLogin = useSelector((state) => state.professorLogin)
    const { professorInfo } = professorLogin
    const logoutHandler = () => {
        dispatch(professorLogoutAction())
    }
    useEffect(() => {
        window.addEventListener("scroll", () => {
            const stickyMenu = document.querySelector(".sticky-menu");
            if (window.scrollY > 160) {
                stickyMenu.classList.add("sticky");
            } else {
                stickyMenu.classList.remove("sticky");
            }
        });
    });
    return (
        <Styles>
            {/* Sticky Menu */}
            <section className="sticky-menu">
                <Container>
                    <Row>
                        <Col md="4">
                            <div className="logo" >
                                <Link to={process.env.PUBLIC_URL + "/"}><img src={process.env.PUBLIC_URL + "/assets/images/logo.png"} alt="" /></Link>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="menu-box d-flex justify-content-between" >
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
                                </ul>
                            </div>
                        </Col>        
                        { professorInfo ? (
                            <>
                                                    {/* Profile Picture */}
                                <Col md="4">
                                    <div className="menu-box d-flex justify-content-between" style={{
                                                    marginLeft : "200px",
                                                    marginTop : "-13px",
                                                }}>
                                        <ul className="nav menu-nav" >
                                        <li className="nav-item dropdown active">
                                                <a className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink"  data-toggle="dropdown" href='/'>
                                                    <img src={process.env.PUBLIC_URL + "/assets/images/profile3.jpeg"} width="45" height="45" className="rounded-circle" alt="profile" />
                                                </a>
                                                <ul className="dropdown list-unstyled">
                                                    <li className="nav-item active"><Link to='/' className="nav-link" >Profile</Link></li>
                                                    <li className="nav-item"><Link to='/' className="nav-link"  onClick={logoutHandler} > LOG OUT </Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>         
                                        
                            </>
                                    ) :    
                                    (
                                        <div className="menu-box d-flex justify-content-between">
                                            <div className="apply-btn">
                                                <Link style={{ marginRight : "10px" }} to={process.env.PUBLIC_URL + "/login"}> Login </Link> 
                                                <Link to={process.env.PUBLIC_URL + "/registration"}> Register </Link>
                                            </div>
                                        </div>
                                        
                                    )}
                    </Row>
                </Container>
            </section>
        </Styles>
    )
}
export default StickyMenu