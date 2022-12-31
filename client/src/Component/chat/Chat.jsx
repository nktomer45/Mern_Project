import React, { useEffect, useState } from 'react';
import './Chat.css';
import send from '../../images/send.png'
import closeIcon from '../../images/closeIcon.png'
import { user } from '../Join/Join';
import socketIo from 'socket.io-client'
import Message from  "../message/Message"
import ReactScrollToBottom from "react-scroll-to-bottom"
let socket;
const ENDPOINT='http://localhost:4500/';

const Chat = () => {
    const [id ,setId ]= useState();
    const [userMessage,setUserMessage] =useState([])
    const Send = () =>{
        const message =document.getElementById('chatInput').value;
        // console.log("message" , message);
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value="";
    }

    useEffect(()=>{
        socket = socketIo(ENDPOINT,{ transports : ['websocket'] })
        socket.on('connect',() =>{
            // alert("connect");
            setId(socket.id);
        });
        socket.emit('joined', { user:user })
        socket.on('welcome',(data) =>{
            console.log(data.user,data.message)
            if(data){
                setUserMessage([...userMessage, data]);
            }
        })
        socket.on('userJoined',(data) => {
            console.log(data.user,data.message);
            // setUserMessage([...userMessage, data]);
            setUserMessage([...userMessage, data]);
        })
        socket.on('leave', (data) => {
            // setMessages([...messages, data]);
            setUserMessage([...userMessage, data]);
            console.log(data.user, data.message)
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    },[]);

    useEffect(()=>{
        console.log(userMessage)
        socket.on('Sendmessage',(data)=>{
            setUserMessage([...userMessage, data]);
            console.log(data.user,data.message,data.id);
        })
        return () =>{
            socket.off();
        }
    },[userMessage]);

    return(
        <>
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='Header'>
                    <h2>C'CHAT </h2>
                  <a href='/'>  <img src={closeIcon} alt='close'/></a>  
                </div>
                <ReactScrollToBottom className='ChatBox'>
                 { userMessage.map(item => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'}/>)}
                </ReactScrollToBottom>
                <div className='InputBox'>
                    <input onKeyPress={(event) => event.key === 'Enter' ? Send() : null} type="text" id="chatInput" />
                    <button className="SendBtn" onClick={Send} ><img src={send} alt='send_logo' /></button>
                </div>
            </div>
        </div>
        </>
    )
} 

export default Chat;