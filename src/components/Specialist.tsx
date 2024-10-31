// - ./src/components/Specialist.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ISpecialist } from '../interfaces/specialist';
import './Specialist.css'

const Specialist: React.FC<ISpecialist> = ({ _id, name, image, designation, region, branch, email, user, insurance, takaful }) => {
    return (
        <div className="column is-one-quarter-desktop is-one-third-tablet has-background-black">
            <Link to={`/specialist/${_id}`} className="card"> {/* Wrap in Link */}
                <div className="card-image">
                    <figure className="image is-1by1">
                        <img src={image} alt={name} style={{ objectFit: 'cover' }}/>
                    </figure>
                </div>
                <div className="card-content has-background-black" style={{ padding: '10px' }}>
                    <p className="has-text-white" style={{fontSize: '18px', fontWeight: 'bold', marginTop:'10px' }}>{name}</p>
                    <p className="has-text-grey-lighter"  style={{fontSize: '16px', fontWeight: 'bold' }}>{designation}</p>
                    <p className="has-text-grey-lighter" style={{fontSize:'16px',fontWeight: 'bold'}}>{email}</p>
                    <p className="has-text-grey-lighter"  style={{marginTop: '10px',fontSize:'16px',fontWeight: 'bold'}}>Region: {region}</p>
                    <p className="has-text-grey-lighter"  style={{fontSize:'16px',fontWeight: 'bold'}}>Branch: {branch}</p>
                    <p className="has-text-grey-lighter"  style={{marginTop: '5px',fontSize:'16px',fontWeight: 'bold'}}> Admin: {user.username}</p>

                    {/* Life Insurance and Takaful Status */}
                    <div className="insurance-status" style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <p className="box has-background-white" style={{ 
                            color: insurance?.status === 'Completed' ? 'green' : 'red', 
                            fontWeight: 'bold', 
                            padding: '5px 10px',
                            width: '100%',
                            fontSize: '18px',
                            marginBottom: '10px' 
                        }}>
                            Life Insurance 
                            <div style={{fontSize:'15px'}}> Status: {insurance ? insurance.status : 'No details'}</div>
                        </p>
                        <p className="box has-background-white" style={{ 
                            color: takaful?.status === 'Completed' ? 'green' : 'red', 
                            fontWeight: 'bold', 
                            padding: '5px 10px',
                            fontSize: '18px',
                            width: '100%' 
                        }}>
                            Takaful 
                            <div style={{fontSize:'15px'}}> Status: {takaful ? takaful.status : 'No details'}</div>
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Specialist


