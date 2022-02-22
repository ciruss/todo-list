import { Route, Routes, matchPath, useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import SingleUser from './Pages/SingleUser';
import SingleTodo from './Pages/Todo';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isHome = !!matchPath(pathname, "/");

  const handleBack = () => {
    navigate(-1);
  }
  
  return (
    <div className="App">
      <div className="nav">
        <h1><Link to="/">TODO list</Link></h1>
        {isHome ? null : <h3 onClick={handleBack}>← Back</h3>}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:userId" element={<SingleUser />} />
        <Route path="/todo/:todoId" element={<SingleTodo />} />
        <Route path="/user/:userId/todo/:todoId" element={<SingleTodo />} />
      </Routes>
    </div>
  );
}

export default App;
