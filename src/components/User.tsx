//- ./src/components/User.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IUser } from '../interfaces/user';
import { ISpecialist } from '../interfaces/specialist';
import { Link, useNavigate } from 'react-router-dom';
import {baseUrl} from '../config'
import './User.css'

const User: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null)
    const [specialists, setSpecialists] = useState<ISpecialist[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setError("Authentication error: No token found")
                setLoading(false)
                return
            }

            try {
                const userResponse = await axios.get(`${baseUrl}/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setUser(userResponse.data)

                if (userResponse.data._id) {
                    fetchSpecialists(userResponse.data._id, token)
                }
            } catch (err) {
                setError("Error fetching user data")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [])

    //This is also to prevent the error for user without specialist (unable to load)
    const fetchSpecialists = async (userId: string, token: string) => {
        try {
            const specialistsResponse = await axios.get(`${baseUrl}/specialists/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setSpecialists(specialistsResponse.data)
        } catch (err) {
            console.error("Error fetching specialists:", err)
        }
    }

    const handleRemoveSpecialist = async (id: string) => {
        const token = localStorage.getItem('token')
        try {
            await axios.delete(`${baseUrl}/specialists/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setSpecialists(prevSpecialists => prevSpecialists.filter(specialist => specialist._id !== id))
            navigate('/user')
        } catch (err) {
            console.error("Error removing specialist:", err)
            setError("Error removing specialist. Please try again.")
        }
    };

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="container">
            <div className="profile-section" style={{ backgroundColor: '#f5f5f5', padding: '20px', marginBottom: '30px', textAlign: 'center' }}>
                {user && (
                    <div className="box has-background-black">
                        {user.image && (
                            <img
                                src={user.image}
                                alt={user.username}
                                style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover', marginTop: '10px' }}
                            />
                        )}
                        <h2 className="subtitle has-text-white" style={{ marginTop: '20px', fontSize: '1.3em', fontWeight: 'bold' }}>{user.username}</h2>
                        <h4 className='has-text-white' style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{user.designation}</h4>
                        <h3 className='has-text-white' style={{ marginTop: '5px', fontSize: '18px', fontWeight: 'bold' }}>{user.email}</h3>
                        <h4 className='has-text-white' style={{ marginTop: '25px', fontSize: '18px', fontWeight: 'bold' }}>Region: {user.region}</h4>
                        <h4 className='has-text-white' style={{ fontSize: '18px', fontWeight: 'bold' }}>Branch: {user.branch}</h4>
                    </div>
                )}
            </div>

            <div className="has-text-centered" style={{ marginBottom: '20px' }}>
                <Link to="/create-specialist">
                    <button className="button is-primary">Create New Specialist</button>
                </Link>
            </div>

            <div className="specialists-section" style={{ backgroundColor: '#f5f5f5', padding: '20px', paddingBottom: '60px', marginBottom: '100px' }}>
                <h1 className="title has-text-centered" style={{ color: 'black', padding: '20px' }}>Specialists in Your Region</h1>
                <br />
                <div className="columns is-multiline" style={{ margin: '0' }}>
                    {specialists.length > 0 ? (
                        specialists.map(specialist => (
                            <div className="column is-one-third" key={specialist._id}>
                                <Link to={`/specialist/${specialist._id}`}>
                                    <div className="card has-background-black">
                                        <div className="card-image">
                                            {specialist.image && (
                                                <figure className="image is-3by3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <img
                                                        src={specialist.image}
                                                        alt={specialist.name}
                                                        style={{ objectFit: 'cover', width: '100%', height: '330px' }}
                                                    />
                                                </figure>
                                            )}
                                        </div>
                                        <div className="card-content" style={{height:'500px'}}>
                                            <h2 className="has-text-white" style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }}>{specialist.name}</h2>
                                            <p className="has-text-white" style={{ fontSize: '16px', fontWeight: 'bold' }}>{specialist.designation}</p>
                                            <p className="has-text-white" style={{ fontSize: '16px', fontWeight: 'bold' }}>{specialist.email}</p>
                                            <p className="has-text-white" style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>Region: {specialist.region}</p>
                                            <p className="has-text-white" style={{ fontSize: '16px', fontWeight: 'bold' }}>Branch: {specialist.branch}</p>

                                            {/* Life Insurance and Takaful Status */}
                                            <div className="insurance-status">
                                                <p className="box has-background-white" style={{ color: specialist.insurance?.status === 'Completed' ? 'green' : 'red', fontWeight: 'bold', marginTop: '30px', fontSize: '17px', padding: '10px' }}>
                                                    Life Insurance
                                                    <p style={{ fontSize: '15px' }}> Status: {specialist.insurance ? specialist.insurance.status : 'No details'}</p>
                                                </p>
                                                <p className="box has-background-white" style={{ color: specialist.takaful?.status === 'Completed' ? 'green' : 'red', fontWeight: 'bold', fontSize: '17px', marginTop: '10px', marginBottom: '20px', padding: '10px' }}>
                                                    Takaful
                                                    <p style={{ fontSize: '15px' }}> Status: {specialist.takaful ? specialist.takaful.status : 'No details'}</p>
                                                </p>
                                            </div>

                                            <div className="columns" style={{ marginTop: '15px' }}>
                                                <div className="column has-text-left">
                                                    <Link to={`/edit-specialist/${specialist._id}`} className="button is-primary is-small" style={{ width: '100%' }}>
                                                        Licensing
                                                    </Link>
                                                </div>
                                                <div className="column has-text-right">
                                                    <button
                                                        className="button is-danger is-small"
                                                        style={{ width: '100%' }}
                                                        onClick={() => handleRemoveSpecialist(specialist._id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No specialists found for this user.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default User





