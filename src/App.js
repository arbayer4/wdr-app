import './App.css';
import {useState, useEffect} from "react";
import SignIn from "./components/SignIn";
import API from "./services/api-config";
import Layout from "./components/shared/layout/Layout";
import AdminPanel from "./screens/AdminPanel";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loaded, setLoaded] = useState(false)
  

  useEffect(()=>{
    const handleVerify = async () => {
      try {
        const resp = await API.get('/logged_in', {withCredentials: true})
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
    {loaded ? 
      currentUser ? (<AdminPanel user ={currentUser}/>) : (<SignIn setCurrentUser={setCurrentUser}/>)
     : <div></div> }
    </Layout>
    </div>
    
  );
}

export default App;
