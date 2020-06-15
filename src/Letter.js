import React from 'react'
import PropTypes from 'prop-types'

import './Letter.css'

const Letter = ({ letter, feedback, onClick}) => (
    <div className={`letter ${feedback}`} onClick={() => onClick(letter, feedback)}>
        <span className="text">{letter}</span>
    </div>
) 

Letter.propTypes = {
    letter: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'normal',
        'correct',
        'incorrect'
    ]).isRequired,
    onClick: PropTypes.func.isRequired
}

export default Letter