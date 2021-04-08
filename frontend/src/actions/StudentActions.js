import axios from 'axios'
import {
    STUDENT_DETAILS_FAIL,
    STUDENT_DETAILS_REQUEST,
    STUDENT_DETAILS_SUCCESS,
    STUDENT_LOGIN_FAIL,
    STUDENT_LOGIN_REQUEST,
    STUDENT_LOGIN_SUCCESS,
    STUDENT_LOGOUT,
    STUDENT_REGISTER_FAIL,
    STUDENT_REGISTER_REQUEST,
    STUDENT_REGISTER_SUCCESS,
    STUDENT_UPDATE_PROFILE_FAIL,
    STUDENT_UPDATE_PROFILE_REQUEST,
    STUDENT_UPDATE_PROFILE_SUCCESS,
} from '../constants/StudentConstants.js'

export const studentLoginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: STUDENT_LOGIN_REQUEST,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post(
            '/api/students/login',
            { email, password },
            config
        )
        dispatch({
            type: STUDENT_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('studentInfo', JSON.stringify(data))
    } catch (error) {
        dispatch ({
            type: STUDENT_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const studentLogoutAction = () => async (dispatch) => {
    localStorage.removeItem('studentInfo')
    dispatch({ type: STUDENT_LOGOUT })
}

export const studentRegisterAction = (firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: STUDENT_REGISTER_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/students',
        { firstName, lastName, email, password },
        config
      )
  
      dispatch({
        type: STUDENT_REGISTER_SUCCESS,
        payload: data,
      })
  
      dispatch({
        type: STUDENT_LOGIN_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('studentInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: STUDENT_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getStudentDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_DETAILS_REQUEST,
      })
  
      const {
        studentLogin: { studentInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${studentInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/students/${id}`, config)
  
      dispatch({
        type: STUDENT_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(studentLogoutAction())
      }
      dispatch({
        type: STUDENT_DETAILS_FAIL,
        payload: message,
      })
    }
  }
  
  export const updateStudentProfile = (student) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_UPDATE_PROFILE_REQUEST,
      })
  
      const {
        studentLogin: { studentInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${studentInfo.token}`,
        },
      }
  
      const { data } = await axios.put(`/api/students/profile`, student, config)
  
      dispatch({
        type: STUDENT_UPDATE_PROFILE_SUCCESS,
        payload: data,
      })
      dispatch({
        type: STUDENT_LOGIN_SUCCESS,
        payload: data,
      })
      localStorage.setItem('studentInfo', JSON.stringify(data))
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(studentLogoutAction())
      }
      dispatch({
        type: STUDENT_UPDATE_PROFILE_FAIL,
        payload: message,
      })
    }
  }