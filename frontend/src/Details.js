import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Details = ({ user }) => {
    const { id } = useParams();
    // const { data } = useFetch('http://localhost:8080/favours/' + id);
    const history = useHistory();

    // const [editCategory, setEditCategory] = useState(`${ data.request.category }`);
    // const [editCredit, setEditCredit] = useState(`${ data.request.credit }`);
    // const [editRemark, setEditRemark] = useState(`${ data.request.remark }`);
    const [editCategory, setEditCategory] = useState("");
    const [editCredit, setEditCredit] = useState("");
    const [editRemark, setEditRemark] = useState("");

    const { data, isPending } = useFetch('http://localhost:8080/favours/' + id)
    // if (data) {
    //         setEditCategory(data.request.category);
    //         setEditCredit(data.request.credit);
    //         setEditRemark(data.request.remark);
    // }
        // .then(data => {
        //     setEditCategory(data.request.category);
        //     setEditCredit(data.request.credit);
        //     setEditRemark(data.request.remark);
        // })
    // const { myPromise } = useFetch('http://localhost:8080/favours/' + id)
    //     .then(context => console.log("gay"));

    const handleEdit = (e) => {
        console.log(id);
        e.preventDefault();

        const editRequest = { category:editCategory, credit:editCredit, remark:editRemark };

        fetch("http://localhost:8080/favours/" + id, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editRequest),
            withCredentials: true,
            credentials: 'include'
        }).then(() => {
            console.log("edited successfully");
        })
    }

    const remove = (id) => {
        const remove = document.getElementById(id);
        const endpoint = `http://localhost:8080/favours/remove/${remove.dataset.request}`;
        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({ userID: remove.dataset.user }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err));
    }

    const deleteRequest = () => {
        const trashcan = document.querySelector('a.delete');
        const endpoint = `http://localhost:8080/favours/${trashcan.dataset.doc}`;
        fetch(endpoint, {
            method: 'DELETE',
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
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err));
    }

    return (
        <div >
            { data && (
                <div className="details content">
                    <h1> { data.request.category } - { data.request.credit }  credit(s)</h1>
                    <div className="content">
                        <p>{ data.request.remark }</p>
                        <p>made by { data.request.ownerName }</p>
                        { !data.request.takenBy && <p>Your request is not taken yet</p> }
                        { data.request.takenBy && 
                            <p>taken by 
                                <a href={`/favours/profile/${ data.request.takenBy }`} 
                                   style="text-decoration: underline;">{ data.request.takerName }
                                </a>
                            </p>
                            // { user.id == request.owner && request.status === "Taken"  &&
                            //     <div>
                            //         <a className="remove-btn" id={`r_${request._id}`} onclick="remove(`r_${request._id}`)" data-request={`${request._id}`} data-user={`${user._id}`}>Remove Taker</a>
                            //         <a className="remove-btn" id={`c_${request._id}`} onclick="completeRequest('c_${request._id}')" data-request="<%= request._id %>" data-user="<%= user._id %>" data-takenBy="<%= request.takenBy %>">Complete Request</a>
                            //     </div>
                            // }
                        }
                    </div>
                    { user._id == data.request.owner && (
                        <div>
                            <a className="edit" data-doc={`${ data.request._id }`}>
                                EDIT
                            </a>
                            <a className="delete" data-doc={`${ data.request._id }`} onClick="deleteRequest()">
                                DELETE
                            </a>
                        </div>
                    )}
                    { user._id === data.request.owner && (
                        <form onSubmit={handleEdit}>
                            <h2>Edit request</h2>
                            <label>Request category:</label>
                            <input 
                                required 
                                type="text" 
                                id="category" 
                                value={editCategory} 
                                onChange={(e) => setEditCategory(e.target.value)} 
                            />
                            <div className="category error"></div>
                            <label>Request credit:</label>
                            <input 
                                required 
                                type="text" 
                                id="credit" 
                                value={editCredit} 
                                onChange={(e) => setEditCredit(e.target.value)} 
                            />
                            <div className="credit error"></div>
                            <label>Request remark:</label>
                            <textarea 
                                required 
                                id="remark" 
                                onChange={(e) => setEditRemark(e.target.value)} 
                            >{ data.request.remark }</textarea>
                            <div className="remark error"></div>
                            <button>Edit</button>
                        </form>
                    )}
                </div>
            )} 
        </div>
    );
}
 
export default Details;