import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <ul className="navigation">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/alldiets">Diet Plans</Link>
            </li>
        </ul>
    )
}

export default Navigation