import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css'
import logo from '../../images/logo.png'
let user;
const Join =()=>{
    const [name,setName] = useState();
    const SendUser = () => {
        user = document.getElementById('joinInput').value;
        document.getElementById('joinInput').value="";
        console.log(user)
    }
    return(
    <div className="JoinPage">
        <div className="JoinContainer">
            <img src={logo} alt="logo" />
            <h1>C'CHAT</h1>
            <input type="text" id = 'joinInput' placeholder="Enter the user ID" onChange = {(e)=>setName(e.target.value)} ></input>
          <Link   onClick={(event) => !name ? event.preventDefault():null} to ='/chat' >
          <button  className='joinbtn' onClick={SendUser}>Login In </button>
          </Link>  
        </div>
    </div>
    )
}

export default Join;
export {user};