import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import Favours from './Favours';
import Home from "./Home";
import Laundry from './Laundry';
import Login from './Login';
import Meal from './Meal';
import Navbar from "./Navbar";
import NotFound from './NotFound';
import SignUp from './SignUp';
import Details from './Details';
import Profile from './Profile';
import useFetch from "./useFetch";
import { useState } from 'react';

function App() {
  const [isUser, setIsUser] = useState(false);
  const res = useFetch('http://localhost:8080/');
  const data = res.data;

  return (
    <Router>
      <div className="App">
        { data && data.user && <Navbar user={data.user} login={isUser} stateChanger={setIsUser}/> }
        {/* { data && data.user && <Navbar user={user} login={isUser} stateChanger={setIsUser}/> } */}
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login stateChanger={setIsUser}/>
            </Route>
            <Route path="/signup">
              <SignUp stateChanger={setIsUser}/>
            </Route>
            <Route exact path="/favours">
              { data && <Favours user={data.user}/> }
            </Route>
            <Route path="/meal">
              <Meal />
            </Route>
            <Route path="/laundry">
              <Laundry />
            </Route>
            <Route path="/favours/create">
              { data && <Create user={data.user}/> }
            </Route>
            <Route path="/favours/:id">
              { data && <Details user={data.user}/> }
            </Route>
            <Route path="/profile/:id">
              { data && <Profile user={data.user}/> }
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
