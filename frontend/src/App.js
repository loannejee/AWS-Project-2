import {
  BrowserRouter,
  Link,
  // In react-router-dom v6, "Switch" is replaced by routes "Routes"
  // Switch 
  Routes,
  Route
} from "react-router-dom";
import Home from "./Home";
import Register from './Register';
import Login from './Login';
import PremiumContent from './PremiumContent';
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* BrowserRouter keeps your UI in sync with the URL */}
        <div className="header">
          {/* Setting up the links */}
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/premium-content">Premium Content</Link>
        </div>

        <div className='content'>
          {/* For react-router-dom v6, <Switch>/<Routes> tag looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Routes>
            {/* Components and their URLs here: */}
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/premium-content" element={<PrivateRoute><PremiumContent /></PrivateRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
