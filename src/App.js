import './App.css';
import {useState, useEffect} from "react";
import SignIn from "./screens/SignIn";
import Layout from "./components/shared/layout/Layout";
import AdminPanel from "./screens/AdminPanel";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./screens/SignUp";
import PasswordRecovery from "./screens/PasswordRecovery";
import NotVerified from "./screens/NotVerified";
import GeneralUserHome from "./screens/GeneralUserHome";
import { loginUser, registerUser, removeToken, verifyUser } from "./services/auth";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loaded, setLoaded] = useState(false)
  let navigate = useNavigate();

  

  useEffect(()=>{
    const handleVerify = async () => {
      try {
        const resp = await verifyUser();
        setLoaded(true)
        setCurrentUser(resp)
      } catch (error) {
        console.error("Check login status error",error);
        setLoaded(true)
      }
    }
    handleVerify();
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authToken");
    removeToken();
  }

  const handleLogin = async (formData) => {
    const userData = await loginUser(formData)
    setCurrentUser(userData);
    navigate("/")
  };

  const handleRegister = async(formData)=>{
    try {
      const userData = await registerUser(formData)
      setCurrentUser(userData);
      navigate("/");
    } catch (error) {
      throw error;
    }
  }
  return (
    <div className="App">
    <Layout user = {currentUser} logout = {handleLogout}>
      <Routes>
        <Route path = "/signup" element={<SignUp handleRegister = {handleRegister}/>}/>
        <Route path = "/recover-password" element={<PasswordRecovery/>}/>
          
        <Route path = "/" element={loaded ? 
          currentUser ? currentUser.verified ? currentUser.is_admin? (<AdminPanel user ={currentUser}/>) : (<GeneralUserHome user={currentUser}/>):(<NotVerified/>) : (<SignIn handleLogin={handleLogin} setCurrentUser={setCurrentUser}/>)
          : <div></div> }/>
          
      </Routes>
    
    </Layout>
    </div>
    
  );
}

export default App;
