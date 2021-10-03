import React, { useState } from 'react'
import './Homepage.css'
import Member from '../Member/Member'
import { Link } from 'react-router-dom'

function Homepage() {
    const [currentNumber, setCurrentNumber] = useState(false)
    return (
        <>
            <div className="homepage">
                <h1>Homepage</h1>
                <div className="homepage__contain">
                    <Link className="homepage__order-link" to="/member">
                            1
                    </Link>
                    <Link className="homepage__order-link">2</Link>
                    <Link className="homepage__order-link">3</Link>
                    <Link className="homepage__order-link">4</Link>
                    <Link className="homepage__order-link">5</Link>
                    <Link className="homepage__order-link">6</Link>
                    <Link className="homepage__order-link">7</Link>
                    <Link className="homepage__order-link">8</Link>
                </div>
                
            </div>
        </>
    )
}

export default Homepage
