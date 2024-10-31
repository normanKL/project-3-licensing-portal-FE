// - ./src/components/Signup.tsx

import { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IUser } from "../interfaces/user";
import {baseUrl} from '../config'
import './Signup.css'

interface SignupFormData extends IUser {
    password: string
    passwordConfirmation: string
}

function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
        image: "",
        designation: "",
        region: "",
        branch: "",
    });

    const [errorData, setErrorData] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
        image: "",
        designation: "",
        region: "",
        branch: "",
    })

    const navigate = useNavigate();

    function handleChange(e: SyntheticEvent) {
        const targetElement = e.target as HTMLInputElement
        const newFormData = {
            ...formData,
            [targetElement.name]: targetElement.value,
        }
        setFormData(newFormData)
    }

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()

        try {
            // use axios to make a post request. We don't have to do response.json() with axios (if does it for us)
            const response = await axios.post(`${baseUrl}/signup`, formData)
            console.log(response.data)
            navigate("/login")
        } catch (error: any) {
            setErrorData(error.response.data.errors)
        }
    }

    return (
        <div className="signup-section">
            <div className="container" style={{ paddingBottom: '80px' }}>
                <form onSubmit={handleSubmit}>
                    <h2 className="has-text-grey-lighter" style={{ fontSize: '23px', fontWeight: 'bold' }}>Section A: Signup Details</h2>
                    <br />

                    {/* Username Field */}
                    <div className="field">
                        <label htmlFor="username" className="label has-text-white">
                            Username
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {errorData.username && (
                                <small className="has-text-danger">{errorData.username}</small>
                            )}
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="field" style={{ marginTop: '25px', marginBottom: '15px' }}>
                        <label htmlFor="email" className="label has-text-white">
                            Email
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errorData.email && (
                                <small className="has-text-danger">{errorData.email}</small>
                            )}
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="field" style={{ marginTop: '25px', marginBottom: '15px' }}>
                        <label htmlFor="password" className="label has-text-white">
                            Password
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errorData.password && (
                                <small className="has-text-danger">{errorData.password}</small>
                            )}
                        </div>
                    </div>

                    {/* Password Confirmation Field */}
                    <div className="field" style={{ marginTop: '25px', marginBottom: '15px' }}>
                        <label htmlFor="passwordConfirmation" className="label has-text-white">
                            Password Confirmation
                        </label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="passwordConfirmation"
                                value={formData.passwordConfirmation}
                                onChange={handleChange}
                            />
                            {errorData.passwordConfirmation && (
                                <small className="has-text-danger">
                                    {errorData.passwordConfirmation}
                                </small>
                            )}
                        </div>
                    </div>

                    <br />
                    <h2 className="has-text-grey-lighter" style={{ fontSize: '23px', fontWeight: 'bold' }}> Section B: Profile Details</h2>
                    <br />

                    {/* Image URL Field */}
                    <div className="field">
                        <label htmlFor="image" className="label has-text-white">Image URL</label>
                        <div className="control">
                            <input type="text" className="input" name="image" value={formData.image} onChange={handleChange} />
                            {errorData.image && <small className="has-text-danger">{errorData.image}</small>}
                        </div>
                    </div>

                    {/* Designation Field */}
                    <div className="field" style={{ marginTop: '25px', marginBottom: '15px' }}>
                        <label htmlFor="designation" className="label has-text-white">Designation</label>
                        <div className="control">
                            <input type="text" className="input" name="designation" value={formData.designation} onChange={handleChange} />
                            {errorData.designation && <small className="has-text-danger">{errorData.designation}</small>}
                        </div>
                    </div>

                    <div className="columns" style={{ marginTop: '25px', marginBottom: '15px' }}>
                        <div className="column">
                            {/* Region Field */}
                            <div className="field">
                                <label htmlFor="region" className="label has-text-white">Region</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select name="region" value={formData.region} onChange={handleChange}>
                                            <option value="">Select Region</option>
                                            <option value="Northern 1">Northern 1</option>
                                            <option value="Northern 2">Northern 2</option>
                                            <option value="Central 1">Central 1</option>
                                            <option value="Central 2">Central 2</option>
                                            <option value="Southern">Southern</option>
                                            <option value="East Malaysia">East Malaysia</option>
                                        </select>
                                    </div>
                                    {errorData.region && <small className="has-text-danger">{errorData.region}</small>}
                                </div>
                            </div>
                        </div>

                        <div className="column">
                            {/* Branch Field */}
                            <div className="field">
                                <label htmlFor="branch" className="label has-text-white">Branch</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input is-fullwidth"
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleChange}
                                    />
                                    {errorData.branch && <small className="has-text-danger">{errorData.branch}</small>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <br />
                    <button className="submit" type="submit" style={{ fontSize: '23px', fontWeight: 'bold', color: 'gold' }}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup;