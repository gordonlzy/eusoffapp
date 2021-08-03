import RequestList from "./RequestList";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import React from "react";

const Favours = ({ user }) => {
    const { data, isPending, error } = useFetch('http://localhost:8080/favours');
    return (
        <div className="favours">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { data && <RequestList requests={data.requests} user={user}/> }
            <br />
            <Link to="favours/create" className="create-btn">Create</Link>
        </div>
    );
}
 
export default Favours;