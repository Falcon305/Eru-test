import axios from 'axios'
import {
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DELETE_REQUEST,
    COURSE_DELETE_SUCCESS,
    COURSE_DELETE_FAIL,
    COURSE_CREATE_REQUEST,
    COURSE_CREATE_SUCCESS,
    COURSE_CREATE_FAIL,
    COURSE_UPDATE_FAIL,
    COURSE_UPDATE_SUCCESS,
    COURSE_UPDATE_REQUEST,
    COURSE_PROF_LIST_REQUEST,
    COURSE_PROF_LIST_SUCCESS,
    COURSE_PROF_LIST_FAIL,
    COURSE_TOP_REQUEST,
    COURSE_TOP_SUCCESS,
    COURSE_TOP_FAIL,
    COURSE_PROF_DETAILS_REQUEST,
    COURSE_PROF_DETAILS_SUCCESS,
    COURSE_PROF_DETAILS_FAIL,
} from '../constants/courseConstants.js'

import { professorLogoutAction } from '../actions/professorActions.js'

export const listCoursesAction = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: COURSE_LIST_REQUEST })
        const { data } = await axios.get(`/api/courses?keyword=${keyword}`)
        dispatch ({
            type: COURSE_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch ({
            type: COURSE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listProfCoursesAction = () => async (dispatch) => {
  try {
      dispatch({ type: COURSE_PROF_LIST_REQUEST })
      const prof = JSON.parse(localStorage.getItem('professorInfo'))
      const token = prof.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.get('/api/courses/my-courses', config)
      dispatch ({
          type: COURSE_PROF_LIST_SUCCESS,
          payload: data,
      })
  } catch (error) {
      dispatch ({
          type: COURSE_PROF_LIST_FAIL,
          payload:
              error.response && error.response.data.message
              ? error.response.data.message
              : error.message
      })
  }
}

export const listCourseDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: COURSE_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/courses/${id}`)
        dispatch ({
            type: COURSE_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch ({
            type: COURSE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listProfCourseDetails = (id) => async (dispatch) => {
  try {
      const prof = JSON.parse(localStorage.getItem('professorInfo'))
      const token = prof.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      dispatch({ type: COURSE_PROF_DETAILS_REQUEST })
      const { data } = await axios.get(`/api/courses/my-courses/${id}`, config)
      dispatch ({
          type: COURSE_PROF_DETAILS_SUCCESS,
          payload: data,
      })
  } catch (error) {
      dispatch ({
          type: COURSE_PROF_DETAILS_FAIL,
          payload:
              error.response && error.response.data.message
              ? error.response.data.message
              : error.message
      })
  }
}

export const deleteCourseAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COURSE_DELETE_REQUEST,
      })
  
      const {
        professorLogin: { professorInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${professorInfo.token}`,
        },
      }
  
      await axios.delete(`/api/courses/${id}`, config)
  
      dispatch({
        type: COURSE_DELETE_SUCCESS,
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
        type: COURSE_DELETE_FAIL,
        payload: message,
      })
    }
  }
  
  export const createCourseAction = (title, description, image, duration, difficulty) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COURSE_CREATE_REQUEST,
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
        `/api/courses`,
        { title, description, image, duration, difficulty },
        config
      )
  
      dispatch({
        type: COURSE_CREATE_SUCCESS,
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
        type: COURSE_CREATE_FAIL,
        payload: message,
      })
    }
  }
  
  export const updateCourseAction = (course) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COURSE_UPDATE_REQUEST,
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
  
      const { data } = await axios.put(
        `/api/courses/${course._id}`,
        course,
        config
      )
  
      dispatch({
        type: COURSE_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: COURSE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(professorLogoutAction())
      }
      dispatch({
        type: COURSE_UPDATE_FAIL,
        payload: message,
      })
    }
  }

  export const listTopCoursesAction = () => async (dispatch) => {
    try {
      dispatch({ type: COURSE_TOP_REQUEST })
  
      const { data } = await axios.get(`/api/courses/top`)
  
      dispatch({
        type: COURSE_TOP_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: COURSE_TOP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }