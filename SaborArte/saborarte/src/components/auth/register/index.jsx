import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../api/auth';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();

        // Reset error message
        setErrorMessage('');

        // Validate passwords match
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        try {
            setIsRegistering(true);

            // Attempt user registration
            await doCreateUserWithEmailAndPassword(email, password);

            // Navigate to login or home on success
            navigate('/home');
        } catch (error) {
            // Handle Firebase errors gracefully
            if (error.code === 'auth/weak-password') {
                setErrorMessage('Password is too weak. Must be at least 6 characters.');
            } else if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('This email is already registered.');
            } else if (error.code === 'auth/invalid-email') {
                setErrorMessage('Invalid email address.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <>
            {userLoggedIn && <Navigate to={'/home'} replace={true} />}

            <main className="register-container">
                <div className="form-container">
                    <div className="form-header">
                        <h3>Create a New Account</h3>
                    </div>
                    <form onSubmit={onSubmit} className="form">
                        <div className="input-group">
                            <label className="input-label">Email</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                disabled={isRegistering}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                disabled={isRegistering}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Confirm Password</label>
                            <input
                                type="password"
                                autoComplete="off"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input-field"
                                disabled={isRegistering}
                            />
                        </div>

                        {errorMessage && <span className="error-message">{errorMessage}</span>}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`submit-btn ${isRegistering ? 'disabled' : ''}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="signin-link">
                            Already have an account?{' '}
                            <Link to="/login" className="signin-link-text">
                                Continue
                            </Link>
                        </div>
                    </form>
                </div>
            </main>

            <style>{`
                .register-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f4f4f4;
                }

                .form-container {
                    width: 24rem;
                    background-color: white;
                    padding: 1rem;
                    border-radius: 1rem;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    color: #4b4b4b;
                }

                .form-header h3 {
                    text-align: center;
                    font-size: 1.25rem;
                    color: #333;
                    margin-bottom: 1.5rem;
                }

                .form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                }

                .input-label {
                    font-size: 0.875rem;
                    font-weight: bold;
                    color: #333;
                }

                .input-field {
                    padding: 0.5rem;
                    font-size: 1rem;
                    border-radius: 0.5rem;
                    border: 1px solid #ccc;
                    outline: none;
                    transition: border 0.3s;
                }

                .input-field:focus {
                    border-color: #6366f1;
                }

                .error-message {
                    font-size: 0.875rem;
                    color: #ef4444;
                    font-weight: bold;
                }

                .submit-btn {
                    padding: 0.75rem;
                    background-color: #6366f1;
                    color: white;
                    font-size: 1rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .submit-btn:hover {
                    background-color: #4f46e5;
                }

                .submit-btn.disabled {
                    background-color: #ddd;
                    cursor: not-allowed;
                }

                .signin-link {
                    text-align: center;
                    font-size: 0.875rem;
                }

                .signin-link-text {
                    font-weight: bold;
                    color: #6366f1;
                    text-decoration: none;
                }

                .signin-link-text:hover {
                    text-decoration: underline;
                }
            `}</style>
        </>
    );
};

export default Register;
