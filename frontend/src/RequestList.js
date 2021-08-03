import { Link } from "react-router-dom";

const RequestList = ({ requests, user }) => {
    function takeRequest(id) {
      const takeRequestBtn = document.getElementById(id);
      const endpoint = `http://localhost:8080/favours/take-request/${takeRequestBtn.dataset.request}`;
        fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify({ takenBy: takeRequestBtn.dataset.user }),
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          credentials: 'include'
        })
        .then(response => response.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err));
    }

    return (
        <div className="request-list">
            <h2>All Requests</h2>
            <br />
            {requests.map(request => (
                request.status === "Available" &&
                <div className="request-preview" key={request._id} >
                    <Link to={`/favours/${request._id}`}>
                        <h2>{ request.category } - { request.credit } credit(s)</h2>
                        <p>{ request.remark }</p>
                    </Link>
                    <p>made by <Link to={`/profile/${request.owner}`}>{ request.ownerName }</Link></p>
                    { user._id === request.owner && 
                      <div>
                        <a className="view-btn" href={`/favours/${ request._id }`}>View</a>
                      </div>
                    }
                    { user._id !== request.owner && 
                      <div>
                        <a className="view-btn" href={`/favours/${ request._id }`}>View</a>
                        <a 
                          className="take-request-btn" 
                          data-request={`${ request._id }`} 
                          data-user={`${ user._id }`} 
                          id={ request._id } 
                          onClick={() => takeRequest(`${ request._id }`)}
                        >Take Request</a>
                      </div>
                    }
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