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
                    <Link to="/">Home |</Link> 
                </li>
                <li>
                    <Link to="/alldietstable">All Diets |</Link> 
                </li>
                <li>
                    <Link to="/calculate">Diet Calculator |</Link> 
                </li>
                <li>
                    <Link to="/similarDietPage">Similar Diets |</Link> 
                </li>
            </ul>
      </nav>
    )
}

export default Navigation 

