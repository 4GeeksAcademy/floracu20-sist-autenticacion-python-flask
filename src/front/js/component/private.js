import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Private = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            //redirigir al login si no hay token
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem("token"); //elimina el token
        navigate("/"); //redirige a inicio
    };

    return (
        <div className="text-center mt-5">
            <h1>You are logged in!</h1>
            <h3>You can sign out now:</h3>
            <img src="https://pbs.twimg.com/media/Fo5JEakWAAA4lBz.jpg" className="img-fluid p-2" style={{"width": "20%"}} alt="Logged in"/>
            <br/>
            <button className="btn btn-danger" onClick={handleLogout}>Sign out</button>
            
        </div>
    );
};

export default Private;
