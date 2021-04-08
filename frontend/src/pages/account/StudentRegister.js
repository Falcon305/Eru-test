import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import HeaderTwo from '../../components/HeaderTwo'
import { BreadcrumbBox } from '../../components/common/Breadcrumb'
import FooterTwo from '../../components/FooterTwo'
import Message from '../../components/Message.js'
import Loader from '../../components/Loader.js'
import { Styles } from './styles/account.js'
import { studentRegisterAction } from '../../actions/StudentActions.js'

const StudentRegister = ({ location, history }) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()

    const studentRegister = useSelector((state) => state.studentRegister)
    const { loading, error, studentInfo } = studentRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (studentInfo) {
        history.push(redirect)
        }
    }, [history, studentInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
        setMessage('Passwords do not match')
        } else {
        dispatch(studentRegisterAction(firstName, lastName, email, password))
        }
    }

    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper registration-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title="Registration" />

                {/* Registration Area */}
                <section className="registration-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="registration-box">
                                    <div className="registration-title text-center">
                                        <h3>Registration</h3>
                                    </div>
                                    {message && <Message variant='danger'>{message}</Message>}
                                    {error && <Message variant='danger'>{error}</Message>}
                                    {loading && <Loader />}
                                    <form id="form_registration" className="form" onSubmit={submitHandler}>
                                        <p className="form-control">
                                            <label htmlFor="firstName">First Name</label>
                                            <input 
                                                type="text"
                                                placeholder="First name"
                                                id="firstName"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)} 
                                            />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input 
                                                type="text" 
                                                placeholder="Last name" 
                                                id="lastName"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="email"
                                                placeholder="Email address"
                                                id="email" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                placeholder="*******"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <input
                                                type="password"
                                                placeholder="Confirm password"
                                                id="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <button type='submit'  >Register Now</button>
                                    </form>
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

export default StudentRegister