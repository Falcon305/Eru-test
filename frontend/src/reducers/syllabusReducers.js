import {
    SYLLABUS_LIST_REQUEST,
    SYLLABUS_LIST_SUCCESS,
    SYLLABUS_LIST_FAIL,
    SYLLABUS_CREATE_REQUEST,
    SYLLABUS_CREATE_SUCCESS,
    SYLLABUS_CREATE_FAIL,
    SYLLABUS_PROF_LIST_REQUEST,
    SYLLABUS_PROF_LIST_SUCCESS,
    SYLLABUS_PROF_LIST_FAIL,
    SYLLABUS_DETAILS_REQUEST,
    SYLLABUS_DETAILS_SUCCESS,
    SYLLABUS_DETAILS_FAIL,
    SYLLABUS_PROF_DETAILS_REQUEST,
    SYLLABUS_PROF_DETAILS_SUCCESS,
    SYLLABUS_PROF_DETAILS_FAIL,
    SYLLABUS_CREATE_VIDEO_REQUEST,
    SYLLABUS_CREATE_VIDEO_SUCCESS,
    SYLLABUS_CREATE_VIDEO_FAIL,
} from '../constants/syllabusConstants.js'

export const syllabusListReducer = (state = { syllabi: [] }, action) => {
    switch (action.type) {
        case SYLLABUS_LIST_REQUEST:
            return { loading: true, syllabi: [] }
        case SYLLABUS_LIST_SUCCESS:
            return { loading: false, syllabi: action.payload.syllabi }
        case SYLLABUS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const syllabusProfListReducer = (state = { syllabi: [] }, action) => {
    switch (action.type) {
        case SYLLABUS_PROF_LIST_REQUEST:
            return { loadin: true, syllabi: [] }
        case SYLLABUS_PROF_LIST_SUCCESS:
            return { laoding: false, syllabi: action.payload.syllabi }
        case SYLLABUS_PROF_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const syllabusDetailsReducer = (state = { syllabus: {} }, action) => {
    switch (action.type) {
        case SYLLABUS_DETAILS_REQUEST:
            return { ...state, laoding: true }
        case SYLLABUS_DETAILS_SUCCESS:
            return { loading: false, syllabus: action.payload }
        case SYLLABUS_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const profSyllabusDetailsReducer = (state = { syllabus: {} }, action) => {
    switch (action.type) {
        case SYLLABUS_PROF_DETAILS_REQUEST:
            return { ...state, laoding: true }
        case SYLLABUS_PROF_DETAILS_SUCCESS:
            return { loading: false, syllabus: action.payload }
        case SYLLABUS_PROF_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const syllabusCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SYLLABUS_CREATE_REQUEST:
            return { loading: true }
        case SYLLABUS_CREATE_SUCCESS:
            return { loading: false, success: true, syllabus: action.payload }
        case SYLLABUS_CREATE_FAIL:
            return { laoding: false, error: action.payload }
        default:
            return state
    }
}

export const syllabusVideoCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SYLLABUS_CREATE_VIDEO_REQUEST:
            return { loading: true }
        case SYLLABUS_CREATE_VIDEO_SUCCESS:
            return { loading: false, success: true, syllabus: action.payload }
        case SYLLABUS_CREATE_VIDEO_FAIL:
            return { laoding: false, error: action.payload }
        default:
            return state
    }
}