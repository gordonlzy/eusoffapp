import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Login from './Login';
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
