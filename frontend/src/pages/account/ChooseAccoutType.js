import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import HeaderTwo from '../../components/HeaderTwo'
import { BreadcrumbBox } from '../../components/common/Breadcrumb'
import FooterTwo from '../../components/FooterTwo'
import { Styles } from './styles/choose.js'
import { LinkContainer } from 'react-router-bootstrap'


const ChooseAccount = () => {

    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper registration-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title="Choose Account Type : " />

                {/* Registration Area */}
                <section className="registration-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                {/* <div>
                                    <Stepone />
                                </div> */}

                                <div className="registration-box">
                                    <div className="registration-title text-center">
                                        <h3>Choose Account Type</h3>
                                    </div>

                                    <section className="service-area">
                                                <Col md="6">
                                                    
                                                        {
                                                            <LinkContainer to={process.env.PUBLIC_URL + "/registration"}>
                                                            <Col md="4" >
                                                                <div className="service-box d-flex">
                                                                    <div className="box-icon">
                                                                        <i className="flaticon-teacher"></i>
                                                                    </div>
                                                                    <div className="box-title">
                                                                        <h6>Professor</h6>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            </LinkContainer>
                                                        }
                                                        {
                                                            <LinkContainer to={process.env.PUBLIC_URL + "/student/registration"}>
                                                            <Col md="4" >
                                                                <div className="service-box d-flex">
                                                                    <div className="box-icon">
                                                                        <i className="flaticon-reading"></i>
                                                                    </div>
                                                                    <div className="box-title">
                                                                        <h6>Student</h6>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            </LinkContainer>
                                                        }
                                                </Col>
                                    </section>

                                    
                                    <div className="have_account-btn text-center">
                                        <p>Already have an account? <Link to="/login">Login Here</Link></p>
                                    </div>
                                </div>
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

export default ChooseAccount