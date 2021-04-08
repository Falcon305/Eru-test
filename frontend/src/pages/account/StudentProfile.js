import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../../components/Message'
import Loader from './../../components/Loader'
import { getStudentDetails, updateStudentProfile } from './../../actions/StudentActions.js'
import { STUDENT_UPDATE_PROFILE_RESET } from './../../constants/StudentConstants.js'
import HeaderTwo from '../../components/HeaderTwo'
import { BreadcrumbBox } from '../../components/common/Breadcrumb'
import FooterTwo from '../../components/FooterTwo'
import { Styles } from './styles/account.js'

const StudentProfile = ({ location, history }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const studentDetails = useSelector((state) => state.studentDetails)
  const { loading, error, student } = studentDetails

  const studentLogin = useSelector((state) => state.studentLogin)
  const { studentInfo } = studentLogin

  const studentUpdateProfile = useSelector((state) => state.studentUpdateProfile)
  const { success } = studentUpdateProfile


  useEffect(() => {
    if (!studentInfo) {
      history.push('/login')
    } else {
      if (!student || !student.firstName || !student.lastName || success) {
        dispatch({ type: STUDENT_UPDATE_PROFILE_RESET })
        dispatch(getStudentDetails('profile'))
      } else {
        setFirstName(student.firstName)
        setLastName(student.lastName)
        setEmail(student.email)
      }
    }
  }, [dispatch, history, studentInfo, student, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateStudentProfile({ id: student._id, firstName, lastName, email, password }))
    }
  }

  return (
    <Styles>
    {/* Main Wrapper */}
    <div className="main-wrapper registration-page">

        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Update Profile" />

        {/* Registration Area */}
        <section className="registration-area">
            <Container>
                <Row>
                    <Col md="12">
                        <div className="registration-box">
                            <div className="registration-title text-center">
                                <h3>Update Profile</h3>
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
                                <button type='submit'  >Update</button>
                            </form>
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

export default StudentProfile