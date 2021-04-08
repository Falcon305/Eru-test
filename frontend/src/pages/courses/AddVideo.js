import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import HeaderTwo from '../../components/HeaderTwo.js'
import { BreadcrumbBox } from '../../components/common/Breadcrumb'
import FooterTwo from '../../components/FooterTwo'
import { useParams } from 'react-router-dom'
import { Styles } from './styles/createStyle.js'
import { createSyllabusVideoAction } from '../../actions/syllabusActions.js'


const AddVideoPage = ({ location, history }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [video, setVideo] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const syllabusCreateVideo = useSelector((state) => state.syllabusCreateVideo)
    const { videoInfo } = syllabusCreateVideo

    const redirect = location.search ? location.search.split('=')[1] : '/'
    let cid = '602bf3bfbc4b10084e975ce7'
    let sid = '603e4550ffa131051d203636'

    useEffect(() => {
        if (videoInfo) {
          history.push(redirect)
        }
      }, [history, videoInfo, redirect])
    
      const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('video', file)
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
          console.log('Before')
          const { data }  = await axios.post('/api/video', formData, config)
          console.log('After')
          setVideo(data)
          setUploading(false)
        } catch (error) {
          console.error('Shiiiit....')
          console.error(error)
          setUploading(false)
        }
      }
    
      const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createSyllabusVideoAction(
          title,
          description,
          video,
          cid,
          sid,
        ))
      }

      return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper registration-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title="Add a new Video" />

                {/* Registration Area */}
                <section className="registration-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="registration-box">
                                    <div className="registration-title text-center">
                                        <h3>Add Video</h3>
                                    </div>
                                    <form id="form_registration" className="form" onSubmit={submitHandler}>
                                        <p className="form-control">
                                            <label htmlFor="title">Title</label>
                                            <input 
                                                type="text"
                                                placeholder="Video Title"
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
                                                placeholder="Enter Video Description" 
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <p className="form-control">
                                            <label htmlFor="video">Video</label>
                                            <input
                                                type="file"
                                                id="video-file"
                                                onChange={uploadFileHandler}
                                            />
                                            
                                            <span className="registration_input-msg"></span>
                                        </p>
                                        <button type='submit'>Add Syllabus Video</button>
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

export default AddVideoPage
