import RequestList from "./RequestList";
import useFetch from "./useFetch";
// import axios from 'axios';

const Favours = () => {
    const { data, isPending, error } = useFetch('http://localhost:8080/favours');
    return (
        <div className="favours">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { data && <RequestList requests={data.requests} /> }
        </div>
    );
}
 
export default Favours;