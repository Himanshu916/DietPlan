import React from 'react'

const Notification = ({message}) => {
    console.log(message)
    return (
        <div className="notification">
            <p className="notification-message">
                    {message}
            </p>
        </div>
       
    )
}

export default Notification