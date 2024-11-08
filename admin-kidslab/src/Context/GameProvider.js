import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const GameContext = React.createContext();

const GameProvider = (props) => {
   
    const [show, setShow] = useState(true)

    function showed() {

        setShow(true)
    }
    function unshowed() {

        setShow(false)
    }

 

    return (
        <GameContext.Provider value={{ show,showed,unshowed }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider