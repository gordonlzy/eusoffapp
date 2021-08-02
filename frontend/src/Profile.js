import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";

const Profile = ({ user }) => {
    const { id } = useParams();
    const { data } = useFetch('http://localhost:8080/profile/' + id);
    console.log(data);

    return (
        <div>
            { data && (
                <div>
                    { user._id === id &&
                        <div>
                            <h2>Welcome back, { data.viewedUser.name }</h2>
                        </div>
                    }
                    { user._id !== id &&
                        <div>
                            <h2>You are viewing { data.viewedUser.name }'s Profile</h2>
                        </div>
                    }

                    <div className="data">
                        <br />
                        <p>Name: { data.viewedUser.name }</p>
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
                                                    {/* { request.status === "Taken" && (
                                                        <a className="remove-btn" id="r_<%= request._id %>" onclick="remove('r_<%= request._id %>')" data-request={`${request._id}`} data-user={`${user._id}`}>Remove Taker</a>
                                                        <a  className="remove-btn" id="c_<%= request._id %>" onclick="completeRequest('c_<%= request._id %>')" data-request={`${request._id}`} data-user={`${user._id}`}data-takenBy="<%= request.takenBy %>">Complete Request</a>
                                                    )} */}
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
                                            {/* <a className="remove-btn" id="<%= requestTaken._id %>" onclick="remove('<%= requestTaken._id %>')" data-request="<%= requestTaken._id %>" data-user="<%= user._id %>">Withdraw</a> */}
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