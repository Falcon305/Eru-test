import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import HeaderTwo from '../../components/HeaderTwo.js'
import { BreadcrumbBox } from '../../components/common/Breadcrumb'
import FooterTwo from '../../components/FooterTwo'
import Message from '../../components/Message.js'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader.js'
import { Styles } from './styles/createStyle.js'
import { createSyllabusAction } from '../../actions/syllabusActions.js'


const CreateSyllabus = ({ location, history }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [estimatedHours, setEstimatedHours] = useState('')

    const dispatch = useDispatch()

    const syllabusCreate = useSelector((state) => state.syllabusCreate)
    const { loading, error, syllabusInfo } = syllabusCreate

    let { id } = useParams()
    const courseID = id
    console.log('Syllabus course id', id)
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (syllabusInfo) {
            history.push(redirect)
        }
    }, [history, syllabusInfo, redirect, courseID])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createSyllabusAction(
            title,
            description,
            estimatedHours,
            id,
        ))
    }

      return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper registration-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title="Create Syllabus" />

                {/* Registration Area */}
                <section className="registration-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="registration-box">
                                    <div className="registration-title text-center">
                                        <h3>Create Syllabus</h3>
                                    </div>
                                    {loading && <Loader />}
                                    {error && <Message variant='danger'>{error}</Message>}
                                    <form id="form_registration" className="form" onSubmit={submitHandler}>
                                        <p className="form-control">
                                            <label htmlFor="title">Title</label>
                                            <input 
                                                type="text"
                                                placeholder="Syllabys Title"
                                                id="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)} 
                                            />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label htmlFor="description">Description</label>
                                             <textarea 
                                                type="text" 
                                                placeholder="Enter Syllabus Description" 
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label htmlFor="duration">Syllabus Duration</label>
                                            <input
                                                type="number"
                                                placeholder="Syllabus Duration"
                                                id="estimatedHours" 
                                                value={estimatedHours}
                                                onChange={(e) => setEstimatedHours(e.target.value)}
                                            />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <button type='submit'  >Create Syllabus</button>
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

export default CreateSyllabus
