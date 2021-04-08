import React, { useState } from 'react';
import { Styles } from '../styles/courseSearch.js';

const CourseSearch = ({ history }) => {

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
      e.preventDefault()
      if (keyword.trim()) {
        history.push(`/search/${keyword}`)
      } else {
        history.push('/')
      }
    }

        return (
            <Styles>
                {/* Course Search */}
                <div className="course-search">
                    <h5>Search Course</h5>
                    <form onSubmit={submitHandler}>
                        <input 
                            type="text"
                            name="q"
                            placeholder="Search Courses"
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button type="submit"><i className="las la-search"></i></button>
                    </form>
                </div>
            </Styles>
        )
}

export default CourseSearch
