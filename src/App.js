import './App.css';
import {useState, useEffect} from "react";
import SignIn from "./screens/SignIn";
import API from "./services/api-config";
import Layout from "./components/shared/layout/Layout";
import AdminPanel from "./screens/AdminPanel";
import { Route, Routes } from "react-router-dom";
import SignUp from "./screens/SignUp";
import PasswordRecovery from "./screens/PasswordRecovery";
import NotVerified from "./screens/NotVerified";
import GeneralUserHome from "./screens/GeneralUserHome";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loaded, setLoaded] = useState(false)
  

  useEffect(()=>{
    const handleVerify = async () => {
      try {
        const resp = await API.get('/logged_in', {withCredentials: false})
        setLoaded(true)
        if (resp.data.logged_in && !currentUser){
          console.log(resp)
          setCurrentUser(resp.data.user);
        }else if (!resp.data.logged_in && currentUser){
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Check login status error",error);
        setLoaded(true)
      }
    }
    handleVerify();
  }, [currentUser]);

  const handleLogout = () => {
    API.delete("/logout", {withCredentials:true})
    .then(response => {
      setCurrentUser(null);
    })
    .catch(error => {
      console.log("logout error", error);
    })
  }
  return (
    <div className="App">
    <Layout user = {currentUser} logout = {handleLogout}>
      <Routes>
        <Route path = "/signup" element={<SignUp setCurrentUser={setCurrentUser}/>}/>
        <Route path = "/recover-password" element={<PasswordRecovery/>}/>
          
        <Route path = "/" element={loaded ? 
          currentUser ? currentUser.verified ? currentUser.is_admin? (<AdminPanel user ={currentUser}/>) : (<GeneralUserHome user={currentUser}/>):(<NotVerified/>) : (<SignIn setCurrentUser={setCurrentUser}/>)
          : <div></div> }/>
          
      </Routes>
    
    </Layout>
    </div>
    
  );
}

export default App;
