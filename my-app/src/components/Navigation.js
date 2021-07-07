import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
      <nav className="navigation">
          <div className="logo">
              <h2>Diet Plan</h2>
              <p>Eat healthy each day</p>
          </div>
            <ul >
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/alldiets">All Diets</Link>
                </li>
            </ul>
      </nav>
    )
}

export default Navigation 

