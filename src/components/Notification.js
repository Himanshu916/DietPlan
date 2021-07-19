import React from 'react'

const Notification = ({message}) => {
    return (
        <div className="notification">
            <p className="notification-message">
                    {message}
            </p>
        </div>
       
    )
}

export default Notification