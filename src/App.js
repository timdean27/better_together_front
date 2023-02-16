import './App.css';
import Home from './Pages/Home'
import FireBaseLogin from "./Components/Authentication/FireBaseLogin";
import FireBaseCreateUser from "./Components/Authentication/FireBaseCreateUser";
import { AuthContext } from "./Context/AuthContext";

function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
