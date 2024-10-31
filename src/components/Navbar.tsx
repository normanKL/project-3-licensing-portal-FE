//- ./src/compenents/Navbar.tsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IUser } from "../interfaces/user";

interface NavbarProps {
    user: null | IUser
    setUser: Function
}

function Navbar({ user, setUser }: NavbarProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const [showWelcome, setShowWelcome] = useState(true)

    function logout() {
        localStorage.removeItem("token")
        setUser(null)
        navigate("/")
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setShowWelcome(false) // Hide welcome message on scroll
            } else {
                setShowWelcome(true) // Show welcome message at the top
            }
        };

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <>
            <header>
                {/* Fixed Navbar */}
                <nav
                    className="navbar is-dark"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        zIndex: 1000, // Ensure it's above other content
                    }}
                >
                    <div className="container">
                        <div className="navbar-brand">
                            {/* Only show Home link when the user is not logged in */}
                            {!user && (
                                <Link to="/" className="navbar-item">
                                    Home
                                </Link>
                            )}
                            {location.pathname !== "/" && !user && (
                                <>
                                    <Link to="/signup" className="navbar-item">
                                        Signup
                                    </Link>
                                    <Link to="/login" className="navbar-item">
                                        Login
                                    </Link>
                                </>
                            )}
                            {user && (
                                <>
                                    <Link to="/specialists" className="navbar-item">
                                        HBBC Specialists
                                    </Link>
                                    <Link to="/team" className="navbar-item">
                                        Your Team
                                    </Link>
                                    <Link to="/user" className="navbar-item">
                                        Your Profile
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="navbar-end">
                            {user && (
                                <button
                                    onClick={logout}
                                    className="button navbar-item is-ghost"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Fixed Welcome Message Below Navbar */}
                {/* {user && showWelcome && ( 
                    <div
                        className="container is-flex"
                        style={{
                            position: 'fixed',
                            top: '50px', // Just below the navbar
                            left: 0,
                            width: '100%',
                            color: '#fff', // White text color
                            padding: '30px 0',
                            zIndex: 999, // Below the navbar but above the content
                            justifyContent: 'center',
                            paddingLeft: '40px',
                        }}
                    >
                        <p>{`🔆 Welcome ${user.username}`}</p>
                    </div>
                )} */}
            </header>

            {/* Add a margin-top to content below to avoid overlap */}
            <div style={{ marginTop: user ? '120px' : '60px' }}>
            </div>
        </>
    )
}

export default Navbar;



