import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
  courseListReducer,
  courseDetailsReducer,
  courseTopRatedReducer,
  courseCreateReducer,
  courseProfListReducer,
  courseDeleteReducer,
  courseProfDetailsReducer,
} from './reducers/courseReducers.js'
import {
  professorDetailsReducer,
  professorLoginReducer,
  professorRegisterReducer,
  professorUpdateProfileReducer,
} from './reducers/professorReducers.js'

import {
  studentDetailsReducer,
  studentLoginReducer,
  studentRegisterReducer,
  studentUpdateProfileReducer,
} from './reducers/studentReducers.js'

import {
  syllabusListReducer,
  syllabusCreateReducer,
  syllabusProfListReducer,
  profSyllabusDetailsReducer,
  syllabusVideoCreateReducer,
} from './reducers/syllabusReducers'


const reducer = combineReducers({
  // COURSES REDUCERS
  courseList: courseListReducer,
  courseDetails: courseDetailsReducer,
  courseTopRated: courseTopRatedReducer,
  courseCreate: courseCreateReducer,
  courseProfList: courseProfListReducer,
  courseDelete: courseDeleteReducer,
  courseProfDetails: courseProfDetailsReducer,
  // SYLLABUS REDUCERS
  syllabusList: syllabusListReducer,
  syllabusCreate: syllabusCreateReducer,
  syllabusProfList: syllabusProfListReducer,
  syllabusProfDetails: profSyllabusDetailsReducer,
  syllabusCreateVideo: syllabusVideoCreateReducer,
  // PROFESSORS REDUCERS
  professorLogin: professorLoginReducer,
  professorRegister: professorRegisterReducer,
  professorDetails: professorDetailsReducer,
  professorUpdateProfile: professorUpdateProfileReducer,
  // STUDENTS REDUCERS
  studentLogin: studentLoginReducer,
  studentRegister: studentRegisterReducer,
  studentDetails: studentDetailsReducer,
  studentUpdateProfile: studentUpdateProfileReducer,
    
})

const professorInfoFromStorage = localStorage.getItem('professorInfo')
  ? JSON.parse(localStorage.getItem('professorInfo'))
  : null

  const studentInfoFromStorage = localStorage.getItem('studentInfo')
  ? JSON.parse(localStorage.getItem('studentInfo'))
  : null

const initialState = {
  professorLogin: { professorInfo: professorInfoFromStorage },
  studentLogin: { studentInfo: studentInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store