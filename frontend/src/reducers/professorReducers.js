import {
    PROFESSOR_LOGIN_FAIL,
    PROFESSOR_LOGIN_REQUEST,
    PROFESSOR_LOGIN_SUCCESS,
    PROFESSOR_LOGOUT,
    PROFESSOR_REGISTER_REQUEST,
    PROFESSOR_REGISTER_SUCCESS,
    PROFESSOR_REGISTER_FAIL,
    PROFESSOR_DETAILS_REQUEST,
    PROFESSOR_DETAILS_SUCCESS,
    PROFESSOR_DETAILS_FAIL,
    PROFESSOR_DETAILS_RESET,
    PROFESSOR_UPDATE_PROFILE_REQUEST,
    PROFESSOR_UPDATE_PROFILE_SUCCESS,
    PROFESSOR_UPDATE_PROFILE_FAIL,
    PROFESSOR_UPDATE_PROFILE_RESET,
  } from '../constants/professorConstants.js'

export const professorLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFESSOR_LOGIN_REQUEST:
      return { loading: true }
    case PROFESSOR_LOGIN_SUCCESS:
      return { loading: false, professorInfo: action.payload }
    case PROFESSOR_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case PROFESSOR_LOGOUT:
      return {}
    default:
      return state
  }
}

export const professorRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFESSOR_REGISTER_REQUEST:
      return { loading: true }
    case PROFESSOR_REGISTER_SUCCESS:
      return { loading: false, professorInfo: action.payload }
    case PROFESSOR_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case PROFESSOR_LOGOUT:
      return {}
    default:
      return state
  }
}

export const professorDetailsReducer = (state = { professor: {} }, action) => {
  switch (action.type) {
    case PROFESSOR_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PROFESSOR_DETAILS_SUCCESS:
      return { loading: false, professor: action.payload }
    case PROFESSOR_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case PROFESSOR_DETAILS_RESET:
      return { professor: {} }
    default:
      return state
  }
}

export const professorUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFESSOR_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case PROFESSOR_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, professorInfo: action.payload }
    case PROFESSOR_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case PROFESSOR_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}