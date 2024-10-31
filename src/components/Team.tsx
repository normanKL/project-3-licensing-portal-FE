// - ./src/components/Team.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IUser } from '../interfaces/user';
import {baseUrl} from '../config'
import './Team.css'

const Team: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`${baseUrl}/team`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUsers(response.data)
            } catch (err) {
                console.error("Error fetching user data", err)
                setError("Error fetching user data")
            }
        }

        fetchUsers()
    }, [])

    return (
        <div>
            <h1 className="title has-text-centered has-text-white" style={{ margin: '30px', marginTop:'100px', marginBottom:'30px' }}>Team Members</h1>
            {error && <p>{error}</p>}

            <div className="team-section has-background-black" style={{ backgroundColor: '#f5f5f5', padding: '20px', margin: '20px', marginBottom: '100px' }}>
                <div className="columns is-multiline">
                    {users.map(user => (
                        <div className="column is-one-third is-flex" key={user._id}>
                            <div className="box has-background-black" style={{ width: '100%' }}>
                                {user.image && (
                                    <img src={user.image} alt={user.username} style={{ width: '100%', height: 'auto', borderRadius: '50%', marginTop: '5px' }} />
                                )}
                                <p className="has-text-centered has-text-white" style={{ marginTop: '25px', fontSize: '1em', fontWeight: 'bold' }}>{user.username}</p>
                                <p className="has-text-centered has-text-grey-lighter" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{user.designation}</p>
                                <p className="has-text-centered has-text-grey-lighter" style={{ marginTop: '5px', fontSize: '18px', fontWeight: 'bold' }}>
                                    <a
                                        href={`mailto:${user.email}`}
                                        style={{ color: 'inherit', textDecoration: 'none' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'gold'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                                    >
                                        {user.email}
                                    </a>
                                </p>
                                <p className='has-text-white' style={{ marginTop: '25px', fontSize: '18px', fontWeight: 'bold' }}>Region: {user.region}</p>
                                <p className='has-text-white' style={{ fontSize: '18px', fontWeight: 'bold' }}>Branch: {user.branch}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Team


