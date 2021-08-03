import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";

const Profile = ({ user }) => {
    
    const { id } = useParams();
    const history = useHistory();

    const [editName, setEditName] = useState("");

    const [backupName, setBackupName] = useState("");

    const setData = (data) => {
        setEditName(data.viewedUser.name);

        setBackupName(data.viewedUser.name);
    }

    const { data } = useFetch('http://localhost:8080/profile/' + id, setData);

    const saveEdit = (e) => {
        e.preventDefault();

        const editUser = { name:editName };

        fetch("http://localhost:8080/profile/" + id, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editUser),
            withCredentials: true,
            credentials: 'include'
        }).then(() => {
            setBackupName(editName);
            console.log("edited successfully");
        })
    }

    const cancelEdit = () => {
        setEditName(backupName);
    }

    const remove = (id) => {
        const remove = document.getElementById(id);
        const endpoint = `http://localhost:8080/favours/remove/${remove.dataset.request}`;
        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({ userID: remove.dataset.user }),
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err));
    }

    const completeRequest = (id) => {
        const complete = document.getElementById(id);
        const endpoint = `http://localhost:8080/favours/complete/${complete.dataset.request}`;
        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({ userID: complete.dataset.user, takenByID: complete.dataset.takenby }),
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err));
    }

    return (
        <div>
            { data && (
                <div>
                    { user._id === id &&
                        <div>
                            <h2>Welcome back, { editName }</h2>
                        </div>
                    }
                    { user._id !== id &&
                        <div>
                            <h2>You are viewing { editName }'s Profile</h2>
                        </div>
                    }

                    <div className="data">
                        <br />
                        <div className="edit-content">
                            { user._id === id && (
                                <div className="edit-content">
                                    <p>Name: </p>
                                    <input
                                        value={editName}
                                        className="editable"
                                        onChange={(e) => setEditName(e.target.value)}
                                    />
                                </div>
                            )}
                            { user._id !== id && (
                                <p>Name: { editName }</p>
                            )}
                            {
                                editName !== backupName && 
                                <div className="inner-edit-content">
                                    <p className="save-changes" onClick={saveEdit}>Save</p>
                                    <p className="cancel-changes" onClick={cancelEdit}>Cancel</p>
                                </div>
                            }
                        </div>
                        <p>Room: { data.viewedUser.room }</p>
                        <p>Email: { data.viewedUser.email }</p>
                        <p>Credit: { data.viewedUser.credit }</p>
                        <br />
                    </div>

                    { user._id === id &&
                        <div>
                            <div className="requests content">
                                <br />
                                <h2>My Requests</h2>
                                { data.requests.length > 0 && data.requests.map(request => (
                                        <div>
                                            <br />
                                            <h3 className="category">{request.category} - {request.credit} credit(s)</h3>
                                            <p className="remark">{ request.remark }</p>
                                            <p>Status: { request.status }</p>
                                            { request.takenBy && 
                                                <div>
                                                    <p>taken by <Link to={`/profile/${request.takenBy}`}>{ request.takerName }</Link></p>
                                                    { request.status === "Taken" && (
                                                        <div>
                                                            <a className="remove-btn" id={`r_${ request._id }`} onClick={() => remove(`r_${ request._id }`)} data-request={`${request._id}`} data-user={`${user._id}`}>Remove Taker</a>
                                                            <a className="remove-btn" id={`c_${ request._id }`} onClick={() => completeRequest(`c_${ request._id }`)} data-request={`${request._id}`} data-user={`${user._id}`}data-takenby={`${request.takenBy}`}>Complete Request</a>
                                                        </div>
                                                    )}
                                                </div>
                                            }
                                            { !request.takenBy && 
                                                <p>Your request is not taken yet</p>
                                            }
                                            {/* <a className="single" href="">
                                                
                                            </a> */}
                                        </div>
                                ))}
                                { data.requests.length === 0 && (
                                    <div>
                                        <br />
                                        <p>You have not created any requests</p>
                                        <br />
                                        <a href="../favours/create" className="create-btn">Create one now</a>
                                        <br />
                                    </div>
                                )}
                            </div>
                            <div>
                                <br />
                                <h2>Requests I have taken</h2>
                                { data.requestsTaken.length > 0 && data.requestsTaken.map(requestTaken => (
                                    <div>
                                        <br />
                                        <a className="single" href="/favours/<%= requestTaken._id %>">
                                            <h3 className="category">{ requestTaken.category } - { requestTaken.credit } credit(s)</h3>
                                            <p className="remark">{ requestTaken.remark }</p>
                                            <p>Status: { requestTaken.status }</p>
                                            <p>Owner: <a href="/profile/<%= requestTaken.owner %>">{ requestTaken.ownerName }</a></p>
                                            <a className="remove-btn" id={`${ requestTaken._id }`} onClick={() => remove(`${ requestTaken._id }`)} data-request={`${ requestTaken._id }`} data-user={`${ user._id }`}>Withdraw</a>
                                        </a>
                                    </div>
                                ))}
                                { data.requestsTaken.length === 0 && (
                                    <div>
                                        <br />
                                        <p>You have not taken any requests</p>
                                        <br />
                                        <a href="../favours" className="create-btn">View Requests</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                    { user._id !== id &&
                        <div>
                            <h2>{ data.viewedUser.name }'s requests taken by you</h2>
                        </div>
                    }
                </div>
                
            )}

            
        </div>
         
        
    );
}
 
export default Profile;