import React from 'react';
import './Message.css';

const Message = ({user,message,classs }) => {
if(user){
    return (
        <>
        <div className={`MessageBox ${classs}`}>
            {`${user}:${message}`}
        </div>
        </>
    )
}
else{
    return (
        <>
        <div className={`MessageBox ${classs}`}>
            { `you: ${message}`}
        </div>
        </>
    )
}
}
export default Message;