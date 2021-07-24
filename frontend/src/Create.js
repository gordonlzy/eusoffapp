import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = ({ user }) => {
    const [category, setCategory] = useState('');
    const [credit, setCredit] = useState(1);
    const [remark, setRemark] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [creditError, setCreditError] = useState('');
    const [remarkError, setRemarkError] = useState('');
    const [owner, setOwner] = useState(user._id);
    const [status, setStatus] = useState("Available");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8080/favours', {
                method: 'POST',
                body:  JSON.stringify({ category, credit, remark, owner, status, userID: user._id }),
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
                credentials: 'include'
            });
            const data = await res.json();
            if (data.errors) {
                console.log("error");
                setCategoryError(data.errors.category);
                setCreditError(data.errors.credit);
                setRemarkError(data.errors.remark);
            }
            if (data.user) {
                history.push("/favours");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a new request</h2>
            <label>Request category:</label>
            <input 
                type="text" 
                id="category" 
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}  
            />
            <div className="category error">{ categoryError }</div>
            <label>Request credit:</label>
            <input 
                type="number" 
                id="credit" 
                required
                value={credit}
                onChange={(e) => setCredit(e.target.value)} 
            />
            <div className="credit error">{ creditError }</div>
            <label>Request remark:</label>
            <textarea 
                id="remark" 
                name="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)} 
            ></textarea>
            <div className="remark error">{ remarkError }</div>
            <button>Submit</button>
        </form>
    );
}
 
export default Create;