import React, { useEffect, useState, useContext } from 'react'
import Algo1 from './Algo1'
import Algo2 from './Algo2'
import { Redirect, withRouter } from 'react-router-dom';
import Axios from 'axios'
import { GameContext } from './Context/GameProvider';
import img from '../../img/giphy.gif'


const Games = (props) => {

    const [data, setData] = useState({ location: [] })
    const [mount, setMount] = useState(false)

    const fetch = async () => {
        const res1 = await Axios.get(`/api/jeux1/${props.match.params.id}/competance`)
        const res2 = await Axios.get(`/api/jeux2/${props.match.params.id}/competance`)
        setData({ location: [...data.location, ...res2.data, ...res1.data] })
        setMount(true)
    }
    const game = useContext(GameContext)

    let aa = data.location.sort(() => Math.random() - 0.5)
    let array = aa[game && game.index]



    useEffect(() => {
        fetch()
    }, [])
    useEffect(() => {
        let fn = async () => { array = aa[game && game.index] }
        fn()

    }, [game && game.index])

    if (mount) {
        if (game.index == aa.length) {
            return <Redirect to={`/Categorie/${props.match.params.categorie}`} />
        }
        console.log(game.index)
        console.log(aa.length)
    }

    return (
        <div>

            {!mount ? <img src={img} style={{display:'block',marginLeft:'auto',marginRight:'auto',marginBottom:'22px'}}/> :
                <div>
                    {array && array.type == 'algo2' ? <Algo2 {...array} /> : <Algo1 {...array} />}
                </div>}
        </div>
    )
}

export default withRouter(Games)
