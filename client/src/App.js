import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Join from './Component/Join/Join';
import Chat from './Component/chat/Chat'

const App = () => {
    return (
        <>
            <Router>
                <Route exact path='/' component={Join} />
                <Route exact path='/chat' component={Chat} />
            </Router>
        </>
    );
}

export default App;
