import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ScrollToTop from './helper/ScrollToTop';
import { GlobalStyle } from "./components/common/styles/global.js";
import HomeTwo from './HomeTwo';
import About from './pages/about/About';
import CourseGrid from './pages/courses/CourseGrid';
import CourseDetails from './pages/courses/CourseDetails';
import Instructor from './pages/instructor/Instructors';
import InstructorDetails from './pages/instructor/InstructorDetails';
import Gallery from './pages/gallery/Gallery';
import MyCourses from './pages/profCourses/MyCourses';
import ProfCourseDetails from './pages/profCourses/ProfCourseDetails';
import ProfessorLogin from './pages/account/Login';
import ProfileScreen from './pages/account/ProfessorProfile';
import ProfessorRegister from './pages/account/Register';
import Contact from './pages/contact/Contact';
import Faq from './pages/faq/Faq';
import PageNotFound from './pages/404/PageNotFound';
import ComingSoon from './pages/comingsoon/ComingSoon';
import CreateCourse from './pages/courses/CreateCourse';
import StudentRegister from './pages/account/StudentRegister';
import StudentLogin from './pages/account/StudentLogin';
import ChooseAccount from './pages/account/ChooseAccoutType';
import CreateSyllabus from './pages/courses/CreateSyllabus.js'
import SyllabusProfDetailsPage from './pages/courses/SyllabusProfDetails.js'
import AddVideo from './pages/courses/AddVideo.js'


function App() {
    return (
        <Router>
            <GlobalStyle />
            <ScrollToTop />
                <Route path={`${process.env.PUBLIC_URL + "/"}`} component={HomeTwo} exact/>
                <Route path={`${process.env.PUBLIC_URL + "/about"}`} component={About} />
                <Route path={`${process.env.PUBLIC_URL + "/course-grid"}`} component={CourseGrid} exact/>
                <Route path={`${process.env.PUBLIC_URL + "/course-grid/search/:keyword"}`} component={CourseGrid} exact/>
                <Route path={`${process.env.PUBLIC_URL + "/course/:id"}`} component={CourseDetails}  />
                <Route path={`${process.env.PUBLIC_URL + "/instructor"}`} component={Instructor} />
                <Route path={`${process.env.PUBLIC_URL + "/instructor-details"}`} component={InstructorDetails} />
                <Route path={`${process.env.PUBLIC_URL + "/gallery"}`} component={Gallery} />
                <Route path={`${process.env.PUBLIC_URL + "/profile"}`} component={ProfileScreen} />
                <Route path={`${process.env.PUBLIC_URL + "/my-courses"}`} component={MyCourses} exact/>
                <Route path={`${process.env.PUBLIC_URL + "/my-courses/:id"}`} component={ProfCourseDetails} exact/>
                <Route path={`${process.env.PUBLIC_URL + "/my-courses/:id/my-syllabi/:id"}`} component={SyllabusProfDetailsPage} exact/>
                <Route path={`${process.env.PUBLIC_URL + "/add-video"}`} component={AddVideo} />
                <Route path={`${process.env.PUBLIC_URL + "/login"}`} component={ProfessorLogin} />
                <Route path={`${process.env.PUBLIC_URL + "/registration"}`} component={ProfessorRegister} />
                <Route path={`${process.env.PUBLIC_URL + "/contact"}`} component={Contact} />
                <Route path={`${process.env.PUBLIC_URL + "/faq"}`} component={Faq} />
                <Route path={`${process.env.PUBLIC_URL + "/404"}`} component={PageNotFound} />
                <Route path={`${process.env.PUBLIC_URL + "/coming-soon"}`} component={ComingSoon} />
                <Route path={`${process.env.PUBLIC_URL + "/create-course"}`} component={CreateCourse} />
                <Route path={`${process.env.PUBLIC_URL + "/my-courses/:id/create-syllabus"}`} component={CreateSyllabus} />
                <Route path={`${process.env.PUBLIC_URL + "/student/login"}`} component={StudentLogin} />
                <Route path={`${process.env.PUBLIC_URL + "/student/registration"}`} component={StudentRegister} />
                <Route path={`${process.env.PUBLIC_URL + "/account-type"}`} component={ChooseAccount} />
        </Router>
    )
}

export default App;