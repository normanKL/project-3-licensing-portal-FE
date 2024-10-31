//- ./src/components/EditSpecialist.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ISpecialist, IInsurance, ITakaful } from '../interfaces/specialist';
import {baseUrl} from '../config'
import './EditSpecialist.css'

const EditSpecialist = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [specialist, setSpecialist] = useState<ISpecialist | null>(null)
    const [insurance, setInsurance] = useState<IInsurance>({
        completed: '',
        pending: '',
        licensing: '',
        status: ''
    })
    const [takaful, setTakaful] = useState<ITakaful>({
        completed: '',
        pending: '',
        licensing: '',
        status: ''
    })

    useEffect(() => {
        const fetchSpecialist = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`${baseUrl}/specialists/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setSpecialist(response.data)
                setInsurance(response.data.insurance || {
                    completed: '',
                    pending: '',
                    licensing: '',
                    status: ''
                })
                setTakaful(response.data.takaful || {
                    completed: '',
                    pending: '',
                    licensing: '',
                    status: ''
                });
            } catch (error) {
                console.error('Error fetching specialist details:', error)
            }
        }

        fetchSpecialist()
    }, [id])

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token')

            // Ensure that insurance and takaful are correctly structured as objects
            const insuranceData = {
                completed: insurance.completed,
                pending: insurance.pending,
                licensing: insurance.licensing,
                status: insurance.status,
            }

            const takafulData = {
                completed: takaful.completed,
                pending: takaful.pending,
                licensing: takaful.licensing,
                status: takaful.status,
            }

            await axios.put(`${baseUrl}/specialists/${id}`, { insurance: insuranceData, takaful: takafulData }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            navigate(`/specialist/${id}`)
        } catch (error) {
            console.error('Error saving specialist details:', error)
        }
    }

    return (
        <div className="edit-specialist">
        <div className="container">
            {specialist && (
                <div className="card">
                    <div className="card-content" style={{ backgroundColor:'#1E1F1F' }}>
                        <h1 className="title has-text-centered has-text-white" style={{ marginTop: '10px', marginBottom: '25px' }}>
                            Edit Licensing Status for {specialist.name}</h1>
                        <br/>

                        {/* Life Insurance Section */}
                        <div className="box">
                            <h4 className="title is-4" style={{marginBottom: '15px' }}>Life Insurance Details</h4>
                            <label style={{ marginRight: '5px', padding: '5px' }}>Completed:</label>
                            <select
                                value={insurance.completed}
                                onChange={(e) => setInsurance({ ...insurance, completed: e.target.value })}
                                style={{ marginRight: '20px', padding: '5px' }}
                            >
                                <option value="">Select...</option>
                                <option value="Module A">Module A</option>
                                <option value="Module C">Module C</option>
                                <option value="Module A & C">Module A & C</option>
                                <option value="None">None</option>
                            </select>

                            <label style={{ marginRight: '5px', padding: '5px' }}>Pending:</label>
                            <select
                                value={insurance.pending}
                                onChange={(e) => setInsurance({ ...insurance, pending: e.target.value })}
                                style={{ marginRight: '20px', padding: '5px' }}
                            >
                                <option value="">Select...</option>
                                <option value="Module A">Module A</option>
                                <option value="Module C">Module C</option>
                                <option value="Module A & C">Module A & C</option>
                                <option value="None">None</option>
                            </select>

                            <label style={{ marginRight: '5px', padding: '5px' }}>Licensing:</label>
                            <select
                                value={insurance.licensing}
                                onChange={(e) => setInsurance({ ...insurance, licensing: e.target.value })}
                                style={{ marginRight: '20px', padding: '5px' }}
                            >
                                <option value="">Select...</option>
                                <option value="Pending exam">Pending exam</option>
                                <option value="In progress - Transfer">In progress - Transfer</option>
                                <option value="In progress - New">In progress - New</option>
                                <option value="Failed or blacklisted">Failed or blacklisted</option>
                                <option value="Completed">Completed</option>
                            </select>

                            <label style={{ marginRight: '5px', padding: '5px' }}>Status:</label>
                            <select
                                value={insurance.status}
                                onChange={(e) => setInsurance({ ...insurance, status: e.target.value })}
                                style={{ padding: '5px' }}
                            >
                                <option value="">Select...</option>
                                <option value="Completed">Completed</option>
                                <option value="Pending exam">Pending exam</option>
                                <option value="In progress">In progress</option>
                                <option value="Query from regulator">Query from regulator</option>
                                <option value="Failed or blacklisted">Failed or blacklisted</option>
                            </select>
                        </div>

                        {/* Takaful Section */}
                        <div className="box" style={{ marginTop: '20px' }}>
                            <h4 className="title is-4" style={{ marginBottom: '15px' }}>Takaful Details</h4>
                            <label style={{ marginRight: '5px', padding: '5px' }}>Completed:</label>
                            <select
                                value={takaful.completed}
                                onChange={(e) => setTakaful({ ...takaful, completed: e.target.value })}
                                style={{ marginRight: '20px', padding: '5px' }}
                            >
                                <option value="">Select...</option>
                                <option value="Module A">Module A</option>
                                <option value="Module C">Module C</option>
                                <option value="Module A & C">Module A & C</option>
                                <option value="None">None</option>
                            </select>

                            <label style={{ marginRight: '5px', padding: '5px' }}>Pending:</label>
                            <select
                                value={takaful.pending}
                                onChange={(e) => setTakaful({ ...takaful, pending: e.target.value })}
                                style={{ marginRight: '20px', padding: '5px' }}
                            >
                                <option value="">Select...</option>
                                <option value="Module A">Module A</option>
                                <option value="Module C">Module C</option>
                                <option value="Module A & C">Module A & C</option>
                                <option value="None">None</option>
                            </select>

                            <label style={{ marginRight: '5px', padding: '5px' }}>Licensing:</label>
                            <select
                                value={takaful.licensing}
                                onChange={(e) => setTakaful({ ...takaful, licensing: e.target.value })}
                                style={{ marginRight: '20px', padding: '5px' }}
                            >
                                <option value="">Select...</option>
                                <option value="Pending exam">Pending exam</option>
                                <option value="In progress - Transfer">In progress - Transfer</option>
                                <option value="In progress - New">In progress - New</option>
                                <option value="Failed or blacklisted">Failed or blacklisted</option>
                                <option value="Completed">Completed</option>
                            </select>

                            <label style={{ marginRight: '5px', padding: '5px' }}>Status:</label>
                            <select
                                value={takaful.status}
                                onChange={(e) => setTakaful({ ...takaful, status: e.target.value })}
                                style={{ padding: '5px' }}
                            >
                                <option value="">Select...</option>
                                <option value="Completed">Completed</option>
                                <option value="Pending exam">Pending exam</option>
                                <option value="In progress">In progress</option>
                                <option value="Query from regulator">Query from regulator</option>
                                <option value="Failed or blacklisted">Failed or blacklisted</option>
                            </select>
                        </div>

                        <button className="button is-primary is-small"
                            onClick={handleSave}
                            style={{ marginTop: '30px', padding: '10px', fontSize: '18px' }}>
                            Save Changes</button>
                    </div>
                </div>
            )}
        </div>
        </div>
    )
}

export default EditSpecialist;

