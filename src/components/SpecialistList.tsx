// - ./src/components/SpecialistList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Specialist from './Specialist'; 
import { ISpecialist } from '../interfaces/specialist'; 
import { Link } from 'react-router-dom'; // Import Link for navigation
import {baseUrl} from '../config'
import './SpecialistList.css'

const SpecialistList: React.FC = () => {
    const [specialists, setSpecialists] = useState<ISpecialist[]>([])

    useEffect(() => {
        const fetchSpecialists = async () => {
            try {
                const response = await axios.get<ISpecialist[]>(`${baseUrl}/specialists`)
                setSpecialists(response.data)
            } catch (error) {
                console.error("Error fetching specialists:", error)
            }
        }

        fetchSpecialists()
    }, [])

    return (
        <>
            <h1 className="title has-text-centered has-text-white" style={{ margin: '40px', marginTop:'150px' }}>HBBC Specialist List</h1>
            <div className="has-text-centered" style={{ marginBottom: '30px' }}>
                <Link to="/search" className="button is-primary">Search Specialists</Link>
            </div>
            <div className="sl-list" style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
                <div className="columns is-multiline box has-background-black">
                    {specialists.map((specialist) => (
                        <Specialist key={specialist._id} {...specialist} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default SpecialistList
