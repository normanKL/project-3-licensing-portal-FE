// - ./src/components/SpecialistDetail.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ISpecialist } from '../interfaces/specialist';
import {baseUrl} from '../config'

function SpecialistDetail() {
    const { id } = useParams<{ id: string }>()
    const [specialist, setSpecialist] = useState<ISpecialist | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSpecialist = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`${baseUrl}/specialists/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSpecialist(response.data)
            } catch (error) {
                console.error("Error fetching specialist details:", error)
            }
        };

        fetchSpecialist();
    }, [id])

    const handleBack = () => {
        navigate(-1)} // Navigate back to the previous page

    return (
        <div className="container">
             <button className="button button is-primary" onClick={handleBack} style={{ margin: '20px' }}>Back to Previous</button> 
            {specialist && (
                <div className="card" style={{ margin: 'auto', width: '50%', marginBottom: '70px', backgroundColor:'#f5f5f5'}}>
                    <div className="card-image">
                        <figure className="image">
                            <img src={specialist.image} alt={specialist.name} style={{ objectFit: 'cover', width: '100%', height: 'auto' }} />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="box has-background-black" style={{ marginTop: '20px' }}>
                            <h2 className="title has-text-white" style={{fontSize: '30px', fontWeight: 'bold' }}>{specialist.name}</h2>
                            <h2 className="subtitle has-text-grey-lighter" style={{fontSize: '25px'}}>{specialist.designation}</h2>
                            <p className='has-text-grey-lighter' style={{marginTop:'15px'}}><strong className='has-text-white'>Region:</strong> {specialist.region}</p>
                            <p className='has-text-grey-lighter'><strong className='has-text-white'>Branch:</strong> {specialist.branch}</p>
                            {specialist.user && <p className='has-text-grey-lighter'><strong className='has-text-white'>Admin:</strong> {specialist.user.username}</p>}
                        </div>
                        <div className="box has-background-black" style={{ marginTop: '20px' }}>
                            <h4 className="title is-4 has-text-white" style={{fontSize: '30px', fontWeight: 'bold' }}>Life Insurance Details</h4>
                            {specialist.insurance ? (
                                <div>
                                    <p className='has-text-grey-lighter' style={{marginTop:'15px'}}><strong className='has-text-white'>Completed:</strong> {specialist.insurance.completed}</p>
                                    <p className='has-text-grey-lighter'><strong className='has-text-white'>Pending:</strong> {specialist.insurance.pending}</p>
                                    <p className='has-text-grey-lighter'><strong className='has-text-white'>Licensing:</strong> {specialist.insurance.licensing}</p>
                                    <p className='has-text-grey-lighter'><strong className='has-text-white'>Status:</strong> {specialist.insurance.status}</p>
                                </div>
                            ) : (
                                <p>No Life Insurance details available.</p>
                            )}
                        </div>
                        <div className="box has-background-black" style={{ marginTop: '20px' }}>
                            <h4 className="title is-4 has-text-white" style={{fontSize: '30px', fontWeight: 'bold' }}>Takaful Details</h4>
                            {specialist.takaful ? (
                                <div>
                                    <p className='has-text-grey-lighter' style={{ marginTop: '15px' }}><strong className='has-text-white'>Completed:</strong> {specialist.takaful.completed}</p>
                                    <p className='has-text-grey-lighter'><strong className='has-text-white'>Pending:</strong >{specialist.takaful.pending}</p>
                                    <p className='has-text-grey-lighter'><strong className='has-text-white'>Licensing:</strong> {specialist.takaful.licensing}</p>
                                    <p className='has-text-grey-lighter'><strong className='has-text-white'>Status:</strong> {specialist.takaful.status}</p>
                                </div>
                            ) : (
                                    <p className='has-text-white'>No Takaful details available.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SpecialistDetail


