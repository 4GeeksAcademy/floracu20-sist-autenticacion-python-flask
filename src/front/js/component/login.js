import React, { useState, useContext } from 'react'
import {Link} from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

	const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                //se guarda el token
                sessionStorage.setItem("token", data.token);
                navigate("/private");
            } else {
                setError(data.msg);
                setShowModal(true);
            }
        } catch (err) {
            setError("Error de conexión");
            setShowModal(true);
        }
    };

    return (
        <div className="text-center mt-5">
			<h1>Login to your account</h1>
			<div className="container p-3" style={{width:"50%"}}>
				<div className="form-floating mb-3">
					<input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
					value={email} onChange={(e)=> setEmail(e.target.value)}/>
					<label htmlFor="floatingInput">Email address</label>
				</div>
				<div className="form-floating mb-3">
					<input type="password" className="form-control" id="floatingPassword" placeholder="Password"
					value={password} onChange={(e)=> setPassword(e.target.value)}/>
					<label htmlFor="floatingPassword">Password</label>
				</div>
				<button className="btn btn-success" style={{width: "20%"}} onClick={handleSubmit}>Login</button>
				<br/>
				<Link to="/">
					Go back
				</Link>
			</div>

            {/* MODAL PARA LOS ERRORES: */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login Error</h5>
                            <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{error}</p> 
                        </div>
                        <div className="modal-footer"> 
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button> 
                        </div>
                    </div>
                </div>
            </div>
            )}

        </div>
    )
}

export default Login