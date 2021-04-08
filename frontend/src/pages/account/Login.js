import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import HeaderTwo from '../../components/HeaderTwo'
import { BreadcrumbBox } from '../../components/common/Breadcrumb'
import FooterTwo from '../../components/FooterTwo'
import { Styles } from './styles/account.js'
import Message from '../../components/Message.js'
import Loader from '../../components/Loader.js'
import { professorLoginAction } from '../../actions/professorActions.js'

const ProfessorLogin = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const professorLogin = useSelector((state) => state.professorLogin)
    const { loading, error, professorInfo } = professorLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (professorInfo) {
            history.push(redirect)
        }
    }, [history, professorInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(professorLoginAction(email, password))
    }

    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper login-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title="Log In" />

                {/* Login Area */}
                <section className="login-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="login-box">
                                    <div className="login-title text-center">
                                        <h3>Log In</h3>
                                    </div>
                                    {error && <Message variant='danger'>{error}</Message>}
                                    {loading && <Loader />}
                                    <form id="form_login" className="form" onSubmit={submitHandler}>
                                        <p className="form-control">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                placeholder="Username"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <span className="login_input-msg"></span>
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
                                            <span className="login_input-msg"></span>
                                        </p>
                                        <button type='submit'>Log In</button>
                                        <div className="save-forget-password d-flex justify-content-between">
                                            <div className="save-passowrd">
                                                <label htmlFor="save_password"><input type="checkbox" id="save_password" className="check-box" />Save Password</label>
                                            </div>
                                            <div className="forget-password">
                                                <Link to={process.env.PUBLIC_URL + "/"}>Forget Password?</Link>
                                            </div>
                                        </div>
                                        <div className="not_account-btn text-center">
                                            <p>Haven't Any Account Yet? <Link to={process.env.PUBLIC_URL + "/registration"}>Click Here</Link></p>
                                        </div>
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

export default ProfessorLogin