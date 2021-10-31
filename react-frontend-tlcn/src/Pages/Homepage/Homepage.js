import React from 'react'
import './Homepage.css'
import { Link } from 'react-router-dom'
import Login from '../../Components/Login/Login'

function Homepage() {
    return (
        <>
            <Login />
            <div className="homepage">
                <h1>Homepage</h1>

                <div className="homepage__contain">
                    <Link className="homepage__order-link" to="/order/1">
                        1
                    </Link>
                    <Link className="homepage__order-link" to="/order/2">
                        2
                    </Link>
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
