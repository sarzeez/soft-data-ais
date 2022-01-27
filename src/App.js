import { useEffect } from "react";
import axios from "axios";
import { ip } from "./ip";


import Saidbar from "./components/saidbar/Saidbar";
import './App.css';

function App({ setUser, user }) {

  useEffect(() => {
    if(localStorage.getItem('soft-ais-token')) {
        axios.get(`${ip}/api/me`, {headers: { 'x-access-token': localStorage.getItem('soft-ais-token')}})
            .then(res => {
                setUser(res.data.data)
            })
            .catch(err => {
                // console.log(err)
            })
    }
  }, [setUser])

  return (
    <Saidbar setUser={setUser} user={user} />
  );
}

export default App;


