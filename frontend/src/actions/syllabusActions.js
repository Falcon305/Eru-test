import axios from 'axios'
import {
    SYLLABUS_LIST_REQUEST,
    SYLLABUS_LIST_SUCCESS,
    SYLLABUS_LIST_FAIL,
    SYLLABUS_CREATE_REQUEST,
    SYLLABUS_CREATE_SUCCESS,
    SYLLABUS_CREATE_FAIL,
    SYLLABUS_PROF_LIST_SUCCESS,
    SYLLABUS_PROF_LIST_REQUEST,
    SYLLABUS_PROF_LIST_FAIL,
    SYLLABUS_DETAILS_REQUEST,
    SYLLABUS_DETAILS_FAIL,
    SYLLABUS_DETAILS_SUCCESS,
    SYLLABUS_PROF_DETAILS_REQUEST,
    SYLLABUS_PROF_DETAILS_SUCCESS,
    SYLLABUS_PROF_DETAILS_FAIL,
    SYLLABUS_CREATE_VIDEO_REQUEST,
    SYLLABUS_CREATE_VIDEO_SUCCESS,
    SYLLABUS_CREATE_VIDEO_FAIL,
}  from '../constants/syllabusConstants.js'
import { professorLogoutAction } from './professorActions.js'


export const listSyllabusActions = (id) => async (dispatch) =>{
    try {
        dispatch({ type: SYLLABUS_LIST_REQUEST })
        const { data } = await axios.get(`/api/courses/${id}/syllabi`)
        console.log('Here Comes the data')
        console.log(data)
        dispatch ({
            type: SYLLABUS_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch ({
            type: SYLLABUS_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listProfSyllabiAction = (id) => async (dispatch) => {
    try {
        const prof = JSON.parse(localStorage.getItem('professorInfo'))
        const token = prof.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        dispatch({ type: SYLLABUS_PROF_LIST_REQUEST })
        const { data } = await axios.get(`/api/courses/${id}/syllabi/my-syllabi`, config)
        dispatch ({
            type: SYLLABUS_PROF_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch ({
            type: SYLLABUS_PROF_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listSyllabusDetailsAction = (cid, sid) => async (dispatch) => {
    try {
        dispatch({ type: SYLLABUS_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/courses/${cid}/syllabi/${sid}`)
        dispatch ({
            type: SYLLABUS_DETAILS_SUCCESS,
            pyload: data,
        })
    } catch (error) {
        dispatch ({
            type: SYLLABUS_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const profSyllabusDetailsAction = (id, cid) => async (dispatch, getState) => {
    try {
        const {
            professorLogin: { professorInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${professorInfo.token}`,
            },
        }
        dispatch({ type: SYLLABUS_PROF_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/courses/${cid}/syllabus/my-syllabi/${id}`, config)
        dispatch ({
            type: SYLLABUS_PROF_DETAILS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch ({
            type: SYLLABUS_PROF_DETAILS_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

export const createSyllabusAction = (title, description, estimatedHours, courseID) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SYLLABUS_CREATE_REQUEST,
        })

        const {
            professorLogin: { professorInfo },
          } = getState()
      
        const config = {
        headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${professorInfo.token}`,
            },
        }

        const { data } = await axios.post(
            `/api/courses/${courseID}/syllabus`,
            { title, description, estimatedHours, courseID },
            config
        )

        dispatch({
            type: SYLLABUS_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(professorLogoutAction())
        }
        dispatch({
            type: SYLLABUS_CREATE_FAIL,
            payload: message,
        })
    }
}
//hmadiframadi69
export const createSyllabusVideoAction = (title, description, video, cid, sid) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SYLLABUS_CREATE_VIDEO_REQUEST,
        })

        const {
            professorLogin: { professorInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${professorInfo.token}`,
              },
        }
        const { data } = await axios.post(
            `api/courses/${cid}/syllabus/my-syllabus/${sid}`,
            { title, description, video },
            config
          )
      
          dispatch({
            type: SYLLABUS_CREATE_VIDEO_SUCCESS,
            payload: data,
          })
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          if (message === 'Not authorized, token failed') {
            dispatch(professorLogoutAction())
          }
          dispatch({
            type: SYLLABUS_CREATE_VIDEO_FAIL,
            payload: message,
          })
        }   
    }