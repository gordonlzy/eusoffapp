import { Link } from "react-router-dom";

const RequestList = ({ requests }) => {
    console.log(requests);
    return (
        <div className="request-list">
            <h2>All Requests</h2>
            
            {requests.map(request => (
                request.status == "Taken" &&
                <div className="request-preview" key={request._id} >
                    <Link to={`/favours/${request.id}`}>
                        <h2>{ request.category } - { request.credit } credit(s)</h2>
                        <p>{ request.remark }</p>
                    </Link>
                    <p>made by <Link to={`/profile/${request.owner}`}>{ request.ownerName }</Link></p>
                </div>
            ))}
        </div>
    );
}
 
export default RequestList;

{/* <div class="requests content">
      
  
      <% if (requests.length > 0) { %>
        <% requests.forEach(request => { %>
          <% if (request.status == "Available") { %>
            <br>
            <a class="single" href="/favours/<%= request._id %>">
              
            </a>
            <% if (user.id == request.owner) { %>
              <a class="view-btn" href="/favours/<%= request._id %>">View</a>
            <% } else { %>
              <% const ref = request._id; %>
              <a class="take-request-btn" data-request="<%= request._id %>" data-user="<%= user._id %>" id="<%= ref %>" onclick="takeRequest('<%= ref %>')">Take Request</a>
            <% } %>
          <% } %>
        <% }) %>
      <% } else { %>
        <p>There are no active requests to display...</p>
      <% } %>
      <br>
      <a href="favours/create" class="create-btn">Create</a>
    </div> */}