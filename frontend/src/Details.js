import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Details = ({ user }) => {
    const { id } = useParams();
    const history = useHistory();

    const [editCategory, setEditCategory] = useState("");
    const [editCredit, setEditCredit] = useState("");
    const [editRemark, setEditRemark] = useState("");

    const [backupCategory, setBackupCategory] = useState("");
    const [backupCredit, setBackupCredit] = useState("");
    const [backupRemark, setBackupRemark] = useState("");

    const setData = (data) => {
        setEditCategory(data.request.category);
        setEditCredit(data.request.credit);
        setEditRemark(data.request.remark);

        setBackupCategory(data.request.category);
        setBackupCredit(data.request.credit);
        setBackupRemark(data.request.remark);
    }
    const { data } = useFetch('http://localhost:8080/favours/' + id, setData)

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
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err));
    }

    const saveEdit = (e) => {
        e.preventDefault();

        const editRequest = { category:editCategory, credit:editCredit, remark:editRemark };

        fetch("http://localhost:8080/favours/" + id, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editRequest),
            withCredentials: true,
            credentials: 'include'
        }).then(() => {
            setBackupCategory(editCategory);
            setBackupCredit(editCredit);
            setBackupRemark(editRemark);
            console.log("edited successfully");
        })
    }

    const cancelEdit = () => {
        setEditCategory(backupCategory);
        setEditCredit(backupCredit);
        setEditRemark(backupRemark);
    }

    return (
        <div >
            { data && (
                <div className="details content">
                    <div className="edit-content">
                        { user._id === data.request.owner && (
                            <input
                                value={editCategory}
                                className="editable"
                                onChange={(e) => setEditCategory(e.target.value)}
                            />
                        )}
                        { user._id !== data.request.owner && (
                            <p>Category: {editCategory}</p>
                        )}
                        {
                            editCategory !== backupCategory && 
                            <div className="inner-edit-content">
                                <p className="save-changes" onClick={saveEdit}>Save</p>
                                <p className="cancel-changes" onClick={cancelEdit}>Cancel</p>
                            </div>
                        }
                    </div>
                    <div className="edit-content">
                        { user._id === data.request.owner && (
                            <input
                                value={editCredit}
                                className="editable"
                                onChange={(e) => setEditCredit(e.target.value)}
                            />
                        )}
                        { user._id !== data.request.owner && (
                            <p>Credit: {editCredit}</p>
                        )}
                        {
                            editCredit != backupCredit && 
                            <div className="inner-edit-content">
                                <p className="save-changes" onClick={saveEdit}>Save</p>
                                <p className="cancel-changes" onClick={cancelEdit}>Cancel</p>
                            </div>
                        }
                    </div>
                    <div className="edit-category">
                        { user._id === data.request.owner && (
                            <input
                                value={editRemark}
                                className="editable"
                                onChange={(e) => setEditRemark(e.target.value)}
                            />
                        )}
                        { user._id !== data.request.owner && (
                            <p>Remark: {editRemark}</p>
                        )}
                        {
                            editRemark !== backupRemark && 
                            <div className="inner-edit-content">
                                <p className="save-changes" onClick={saveEdit}>Save</p>
                                <p className="cancel-changes" onClick={cancelEdit}>Cancel</p>
                            </div>
                        }
                    </div>
                    
                    <div className="content">
                        <p>made by { data.request.ownerName }</p>
                        { !data.request.takenBy && <p>Request is not taken yet</p> }
                        { data.request.takenBy && 
                            <p>taken by 
                                <a href={`/favours/profile/${ data.request.takenBy }`} 
                                   style="text-decoration: underline;">{ data.request.takerName }
                                </a>
                            </p>
                            // { user.id == request.owner && request.status === "Taken"  &&
                            //     <div>
                            //         <a className="remove-btn" id={`r_${request._id}`} onClick={remove(`r_${request._id}`)} data-request={`${request._id}`} data-user={`${user._id}`}>Remove Taker</a>
                            //         <a className="remove-btn" id={`c_${request._id}`} onClick={completeRequest(`c_${request._id}`)} data-request={`${request._id}`} data-user={`${user._id}`} data-takenBy={`${request.takenBy}`}>Complete Request</a>
                            //     </div>
                            // }
                        }
                    </div>
                    { user._id == data.request.owner && (
                        <div>
                            <a className="delete-btn" data-doc={`${ data.request._id }`} onClick={deleteRequest}>
                                DELETE
                            </a>
                        </div>
                    )}
                </div>
            )} 
        </div>
    );
}
 
export default Details;