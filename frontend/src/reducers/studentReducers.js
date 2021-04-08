import {
    STUDENT_LOGIN_FAIL,
    STUDENT_LOGIN_REQUEST,
    STUDENT_LOGIN_SUCCESS,
    STUDENT_LOGOUT,
    STUDENT_REGISTER_REQUEST,
    STUDENT_REGISTER_SUCCESS,
    STUDENT_REGISTER_FAIL,
    STUDENT_DETAILS_REQUEST,
    STUDENT_DETAILS_SUCCESS,
    STUDENT_DETAILS_FAIL,
    STUDENT_DETAILS_RESET,
    STUDENT_UPDATE_PROFILE_REQUEST,
    STUDENT_UPDATE_PROFILE_SUCCESS,
    STUDENT_UPDATE_PROFILE_FAIL,
    STUDENT_UPDATE_PROFILE_RESET,
  } from '../constants/StudentConstants.js'

export const studentLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_LOGIN_REQUEST:
      return { loading: true }
    case STUDENT_LOGIN_SUCCESS:
      return { loading: false, studentInfo: action.payload }
    case STUDENT_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case STUDENT_LOGOUT:
      return {}
    default:
      return state
  }
}

export const studentRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_REGISTER_REQUEST:
      return { loading: true }
    case STUDENT_REGISTER_SUCCESS:
      return { loading: false, studentInfo: action.payload }
    case STUDENT_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case STUDENT_LOGOUT:
      return {}
    default:
      return state
  }
}

export const studentDetailsReducer = (state = { student: {} }, action) => {
  switch (action.type) {
    case STUDENT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case STUDENT_DETAILS_SUCCESS:
      return { loading: false, student: action.payload }
    case STUDENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case STUDENT_DETAILS_RESET:
      return { student: {} }
    default:
      return state
  }
}

export const studentUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case STUDENT_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, studentInfo: action.payload }
    case STUDENT_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case STUDENT_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}