import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
export const GameContext = React.createContext();

const GameProvider = (props) => {
    let user = useSelector((state) => state.Auth.user)
    let auth = useSelector((state) => state.Auth.isAuthenticated)
    useEffect(() => {
        if (auth) {
            setScore(user.score)
            setNbf(user.nbf)
            setNbt(user.nbt)
        } else {
            setScore(0)
            setNbf(0)
            setNbt(0)
        }

    }, [user])
    const [show, setShow] = useState(true)
    const [resub, setResub] = useState(false)
    const [score, setScore] = useState()
    const [nbt, setNbt] = useState()
    const [nbf, setNbf] = useState()
    const [block, setBlock] = useState(false)
    const [index, setIndex] = useState(0)
    function toggleButton() {

        setIndex(index + 1)
    }
    function blocked() {

        setBlock(true)
    }
    function showed() {

        setShow(true)
    }
    function unshowed() {

        setShow(false)
    }
    function nbfaut() {

        setNbf(nbf + 1)
    }
    function nbtrt() {

        setNbt(nbt + 1)
    }
    function unblocked() {

        setBlock(false)
    }
    function reset() {

        setIndex(0)
    }

    function adjust() {

        setScore(score + 12)
    }
    function sub() {

        setResub(true)
    }
    useEffect(() => {
        const blocked = JSON.parse(localStorage.getItem("block"))
        if (block == false)
            setBlock(blocked)
    }, [])
    useEffect(() => {
        if (auth) {
            unblocked()
        }
    }, [auth == true])
    useEffect(() => {
        localStorage.setItem("block", JSON.stringify(block))
    }, [block])

 

    return (
        <GameContext.Provider value={{ index, setIndex, toggleButton, reset, score, adjust, blocked, block, unblocked, nbfaut, nbtrt, nbt, nbf,resub,sub,show,showed,unshowed }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider
