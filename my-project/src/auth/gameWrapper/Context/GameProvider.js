import React, { useState } from 'react'

export const GameContext = React.createContext();

const GameProvider = (props) => {

    const [index, setIndex] = useState(0)
    function toggleButton() {

        setIndex(index + 1)
    }
    function reset() {

        setIndex(0)
    }

    return (
        <GameContext.Provider value={{ index, setIndex, toggleButton, reset }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider
