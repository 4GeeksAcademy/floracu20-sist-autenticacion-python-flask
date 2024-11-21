import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null); 
    const [showModal, setShowModal] = useState(false); //para mostrar el modal de éxito o error

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

		if (!email || !password) { 
			setMessage("Email y contraseña son obligatorios"); 
			setShowModal(true); //muestra el modal
			return; 
		}

        actions.signupUser(email, password)
            .then((data) => {
                setMessage("Usuario registrado con éxito");
                setShowModal(true);
                //redirige al login después de un tiempo
                setTimeout(() => {
                    setShowModal(false);
                    navigate("/login");
                }, 2000);
            })
            .catch((error) => {
                setMessage(error.message || "Error en el registro");
                setShowModal(true);
            });

        //para debug: 
        console.log("email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="text-center mt-5">
            <h1>Sign-up for free!</h1>

            <div className="container p-3" style={{width:"50%"}}>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="btn btn-success" style={{width: "20%"}} onClick={handleSubmit}>Sign-up</button>
                <br/>
                <Link to="/">
                    Go back
                </Link>
            </div>

            {/* Modal de éxito o error */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{message?.includes("éxito") ? "Success" : "Error"}</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>{message}</p>
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

export default Signup;
