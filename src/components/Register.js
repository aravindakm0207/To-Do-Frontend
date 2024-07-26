import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

export default function Register() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [serverErrors, setServerErrors] = useState(null);
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};

    const runValidations = () => {
        if (firstName.trim().length === 0) {
            errors.firstName = 'First Name is required';
        }

        if (lastName.trim().length === 0) {
            errors.lastName = 'Last Name is required';
        }

        if (email.trim().length === 0) {
            errors.email = 'Email is required';
        } else if (!validator.isEmail(email)) {
            errors.email = 'Invalid email format';
        }

        if (password.trim().length === 0) {
            errors.password = 'Password is required';
        } else if (password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'Password should be between 8 - 128 characters';
        }

      
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        runValidations();

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("http://localhost:3333/api/users/register", formData);
                navigate('/login');
            } catch (err) {
                setServerErrors(err.response.data.errors);
            }
        } else {
            setClientErrors(errors);
        }
    };

    return (
        <div>
            <h2>Register With Us</h2>

            {serverErrors && (
                <div>
                    <h3>These errors prohibited the form from being saved:</h3>
                    <ul>
                        {serverErrors.map((ele, i) => (
                            <li key={i}> {ele.msg} </li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">Enter First Name</label><br />
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                />
                {clientErrors.firstName && <span> {clientErrors.firstName}</span>}
                <br />

                <label htmlFor="lastName">Enter Last Name</label><br />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="lastName"
                />
                {clientErrors.lastName && <span> {clientErrors.lastName}</span>}
                <br />

                

                <label htmlFor="email">Enter Email</label><br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                />
                {clientErrors.email && <span> {clientErrors.email}</span>}
                <br />

                <label htmlFor="password">Enter Password</label><br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                />
                {clientErrors.password && <span> {clientErrors.password}</span>}
                <br />

                <br />
                <input type="submit" />
            </form>
        </div>
    );
}
