import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../../components/Message'
import Loader from './../../components/Loader'
import { getProfessorDetails, updateProfessorProfile } from './../../actions/professorActions.js'
import { PROFESSOR_UPDATE_PROFILE_RESET } from './../../constants/professorConstants.js'
import HeaderTwo from '../../components/HeaderTwo'
import { BreadcrumbBox } from '../../components/common/Breadcrumb'
import FooterTwo from '../../components/FooterTwo'
import { Styles } from './styles/account.js'

const ProfileScreen = ({ location, history }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const professorDetails = useSelector((state) => state.professorDetails)
  const { loading, error, professor } = professorDetails

  const professorLogin = useSelector((state) => state.professorLogin)
  const { professorInfo } = professorLogin

  const professorUpdateProfile = useSelector((state) => state.professorUpdateProfile)
  const { success } = professorUpdateProfile


  useEffect(() => {
    if (!professorInfo) {
      history.push('/login')
    } else {
      if (!professor || !professor.firstName || !professor.lastName || success) {
        dispatch({ type: PROFESSOR_UPDATE_PROFILE_RESET })
        dispatch(getProfessorDetails('profile'))
      } else {
        setFirstName(professor.firstName)
        setLastName(professor.lastName)
        setEmail(professor.email)
      }
    }
  }, [dispatch, history, professorInfo, professor, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateProfessorProfile({ id: professor._id, firstName, lastName, email, password }))
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

export default ProfileScreen