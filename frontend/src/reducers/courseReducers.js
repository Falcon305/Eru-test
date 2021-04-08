import {
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
    COURSE_DELETE_REQUEST,
    COURSE_DELETE_SUCCESS,
    COURSE_DELETE_FAIL,
    COURSE_CREATE_REQUEST,
    COURSE_CREATE_SUCCESS,
    COURSE_CREATE_FAIL,
    COURSE_CREATE_RESET,
    COURSE_UPDATE_REQUEST,
    COURSE_UPDATE_SUCCESS,
    COURSE_UPDATE_FAIL,
    COURSE_UPDATE_RESET,
    COURSE_PROF_LIST_REQUEST,
    COURSE_PROF_LIST_SUCCESS,
    COURSE_PROF_LIST_FAIL,
    COURSE_TOP_REQUEST,
    COURSE_TOP_SUCCESS,
    COURSE_TOP_FAIL,
    COURSE_PROF_DETAILS_REQUEST,
    COURSE_PROF_DETAILS_SUCCESS,
    COURSE_PROF_DETAILS_FAIL
} from '../constants/courseConstants.js'

export const courseListReducer = (state = { courses: [] }, action) => {
    switch (action.type) {
        case COURSE_LIST_REQUEST:
            return { loading: true, courses: [] }
        case COURSE_LIST_SUCCESS:
            return { loading: false, courses: action.payload.courses }
        case COURSE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const courseProfListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
      case COURSE_PROF_LIST_REQUEST:
          return { loading: true, courses: [] }
      case COURSE_PROF_LIST_SUCCESS:
          return { loading: false, courses: action.payload }
      case COURSE_PROF_LIST_FAIL:
          return { loading: false, error: action.payload }
      default:
          return state
  }
}

export const courseProfDetailsReducer =  (state = { course: { reviews: [] } }, action) => {
  switch (action.type) {
      case COURSE_PROF_DETAILS_REQUEST:
          return {...state, loading: true, }
      case COURSE_PROF_DETAILS_SUCCESS:
          return { loading: false, course: action.payload }
      case COURSE_PROF_DETAILS_FAIL:
          return { loading: false, error: action.payload }
      default:
          return state
  }
}

export const courseDetailsReducer = (state = { course: { reviews: [] } }, action) => {
    switch (action.type) {
        case COURSE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case COURSE_DETAILS_SUCCESS:
            return { loading: false, course: action.payload }
        case COURSE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const courseDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case COURSE_DELETE_REQUEST:
        return { loading: true }
      case COURSE_DELETE_SUCCESS:
        return { loading: false, success: true }
      case COURSE_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const courseCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case COURSE_CREATE_REQUEST:
        return { loading: true }
      case COURSE_CREATE_SUCCESS:
        return { loading: false, success: true, course: action.payload }
      case COURSE_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case COURSE_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const courseUpdateReducer = (state = { course: {} }, action) => {
    switch (action.type) {
      case COURSE_UPDATE_REQUEST:
        return { loading: true }
      case COURSE_UPDATE_SUCCESS:
        return { loading: false, success: true, course: action.payload }
      case COURSE_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case COURSE_UPDATE_RESET:
        return { course: {} }
      default:
        return state
    }
  }

  export const courseTopRatedReducer = (state = { courses: [] }, action) => {
    switch (action.type) {
      case COURSE_TOP_REQUEST:
        return { loading: true, courses: [] }
      case COURSE_TOP_SUCCESS:
        return { loading: false, courses: action.payload }
      case COURSE_TOP_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }