import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import HeaderTwo from '../../components/HeaderTwo.js'
import { BreadcrumbBox } from '../../components/common/Breadcrumb'
import FooterTwo from '../../components/FooterTwo'
import Message from '../../components/Message.js'
import Loader from '../../components/Loader.js'
import { Styles } from './styles/createStyle.js'
import { createCourseAction } from '../../actions/courseActions.js'


const CreateCourse = ({ location, history }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [image, setImage] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const courseCreate = useSelector((state) => state.courseCreate)
    const { loading, error, courseInfo } = courseCreate

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (courseInfo) {
          history.push(redirect)
        }
      }, [history, courseInfo, redirect])
    
      const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
          console.log('Before')
          const { data }  = await axios.post('/api/upload', formData, config)
          console.log('After')
          setImage(data)
          setUploading(false)
        } catch (error) {
          console.error('Shiiiit....')
          console.error(error)
          setUploading(false)
        }
      }
    
      const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createCourseAction(
          title,
          description,
          image,
          duration,
          difficulty,
        ))
      }

      return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper registration-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title="Create New Course" />

                {/* Registration Area */}
                <section className="registration-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="registration-box">
                                    <div className="registration-title text-center">
                                        <h3>Create Course</h3>
                                    </div>
                                    {loading && <Loader />}
                                    {error && <Message variant='danger'>{error}</Message>}
                                    <form id="form_registration" className="form" onSubmit={submitHandler}>
                                        <p className="form-control">
                                            <label htmlFor="firstName">Title</label>
                                            <input 
                                                type="text"
                                                placeholder="Course Title"
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
                                                placeholder="Enter Course Description" 
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label htmlFor="duration">Course Duration</label>
                                            <input
                                                type="number"
                                                placeholder="Course Duration"
                                                id="duration" 
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                            />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label htmlFor="difficulty">Difficulty</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Course Difficulty"
                                                id="difficulty"
                                                value={difficulty}
                                                onChange={(e) => setDifficulty(e.target.value)}
                                            />
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label htmlFor="image">Image</label>
                                            <input
                                                type="file"
                                                id="image-file"
                                                onChange={uploadFileHandler}
                                            />
                                            {uploading && <Loader />}
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <button type='submit'  >Create Course</button>
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

export default CreateCourse
