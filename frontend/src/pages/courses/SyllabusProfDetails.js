import React, { useEffect, useState } from 'react'
import { Conatiner, Row, Col, Tab, Nav } from 'react-bootstrap'
import HeaderTwo from '../../components/HeaderTwo.js'
import  { BreadcrumbBox } from '../../components/common/Breadcrumb.js'
import { useDispatch, useSelector } from 'react-redux'
import FooterTwo from '../../components/FooterTwo.js'
import { Styles } from './../courses/styles/course.js'
import { Link, useParams } from 'react-router-dom'
import { profSyllabusDetailsAction } from '../../actions/syllabusActions.js'

const SyllabusProfDetailsPage = ({ match }) => {

    const dispatch = useDispatch()

    const syllabusProfDetails = useSelector((state) => state.syllabusProfDetails)
    const { syllabus } = syllabusProfDetails

    let { id } = useParams()

    useEffect(() => {
        dispatch(profSyllabusDetailsAction(match.params.id))
    }, [dispatch, match, id])

    console.log('We are at the syllabus details page')

    return (
        <div className="main-wrapper course-details-page" >

            < HeaderTwo />

            {/* Breadcroumb */}
            < BreadcrumbBox title="My Syllabus Details" />

            <Styles>
                <h1>{syllabus.title}</h1>
                <h3>{syllabus.description}</h3>
                {syllabus.estimatedHours}
                {syllabus.videos}
                <Link to={process.env.PUBLIC_URL + `/add-video`} >
                    <button type="sumbit" className="enroll-btn">Add A Video</button>
                </Link>
            </Styles>

            {/* Footer 2 */}
            <FooterTwo />
        </div>
    )
}

export default SyllabusProfDetailsPage
