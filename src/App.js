import { useEffect } from "react";
import axios from "axios";
import { ip } from "./ip";


import Saidbar from "./components/saidbar/Saidbar";
import './App.css';

function App({ setUser }) {


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
  }, [])

  console.log('a')

  return (
    <Saidbar />
  );
}

export default App;


