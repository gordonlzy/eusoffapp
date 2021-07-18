import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Favours from './Favours';
import Home from "./Home";
import Laundry from './Laundry';
import Login from './Login';
import Meal from './Meal';
import Navbar from "./Navbar";
import NotFound from './NotFound';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/favours">
              <Favours />
            </Route>
            <Route path="/meal">
              <Meal />
            </Route>
            <Route path="/laundry">
              <Laundry />
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
