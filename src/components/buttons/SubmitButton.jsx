import React from 'react'

function SubmitButton({ onClick, text }) {
    return (
        <button className="submitButton" onClick={onClick}>{text}</button>
    )
}

export default SubmitButton