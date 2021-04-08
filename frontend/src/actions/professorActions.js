import axios from 'axios'
import {
  PROFESSOR_DETAILS_FAIL,
  PROFESSOR_DETAILS_REQUEST,
  PROFESSOR_DETAILS_SUCCESS,
    PROFESSOR_LOGIN_FAIL,
    PROFESSOR_LOGIN_REQUEST,
    PROFESSOR_LOGIN_SUCCESS,
    PROFESSOR_LOGOUT,
    PROFESSOR_REGISTER_FAIL,
    PROFESSOR_REGISTER_REQUEST,
    PROFESSOR_REGISTER_SUCCESS,
    PROFESSOR_UPDATE_PROFILE_FAIL,
    PROFESSOR_UPDATE_PROFILE_REQUEST,
    PROFESSOR_UPDATE_PROFILE_SUCCESS,
} from '../constants/professorConstants.js'

export const professorLoginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: PROFESSOR_LOGIN_REQUEST,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post(
            '/api/professors/login',
            { email, password },
            config
        )
        dispatch({
            type: PROFESSOR_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('professorInfo', JSON.stringify(data))
    } catch (error) {
        dispatch ({
            type: PROFESSOR_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const professorLogoutAction = () => async (dispatch) => {
    localStorage.removeItem('professorInfo')
    dispatch({ type: PROFESSOR_LOGOUT })
}

export const professorRegisterAction = (firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: PROFESSOR_REGISTER_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/professors',
        { firstName, lastName, email, password },
        config
      )
  
      dispatch({
        type: PROFESSOR_REGISTER_SUCCESS,
        payload: data,
      })
  
      dispatch({
        type: PROFESSOR_LOGIN_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('professorInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: PROFESSOR_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getProfessorDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFESSOR_DETAILS_REQUEST,
      })
  
      const {
        professorLogin: { professorInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${professorInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/professors/${id}`, config)
  
      dispatch({
        type: PROFESSOR_DETAILS_SUCCESS,
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
        type: PROFESSOR_DETAILS_FAIL,
        payload: message,
      })
    }
  }
  
  export const updateProfessorProfile = (professor) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFESSOR_UPDATE_PROFILE_REQUEST,
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
  
      const { data } = await axios.put(`/api/professors/profile`, professor, config)
  
      dispatch({
        type: PROFESSOR_UPDATE_PROFILE_SUCCESS,
        payload: data,
      })
      dispatch({
        type: PROFESSOR_LOGIN_SUCCESS,
        payload: data,
      })
      localStorage.setItem('professorInfo', JSON.stringify(data))
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(professorLogoutAction())
      }
      dispatch({
        type: PROFESSOR_UPDATE_PROFILE_FAIL,
        payload: message,
      })
    }
  }