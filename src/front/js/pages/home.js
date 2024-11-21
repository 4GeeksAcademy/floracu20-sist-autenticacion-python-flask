import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import {Link} from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="container d-flex align-items-center">
				<div className="container p-3 border text-center mt-5" style={{width: "50%"}}>
					<h1>Sign-up for free!</h1>
					<Link to="/signup">
						<button className="btn btn-success" style={{width: "20%"}}>Sign-up</button>
					</Link>
					<br/>
					<br/>

					<h4>Already have an account?</h4>
					<Link to="/login">
						<button className="btn btn-success" style={{width: "20%"}}>Login</button>
					</Link>
				</div>
			</div>
			<br/>
			{/* <div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div> */}
		</>
	)
};
