import React, { useEffect, useState, useContext } from 'react'
import Algo1 from './Algo1'
import Algo2 from './Algo2'
import { Redirect, withRouter } from 'react-router-dom';
import Axios from 'axios'
import { GameContext } from './Context/GameProvider';
import img from '../../img/giphy.gif'
import Algo3 from './Algo3';
import Score from './Score/Score';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Stats } from '../../action/auth';

const Games = (props) => {
const dispatch = useDispatch()
    const [data, setData] = useState({ location: [] })
    const [stat, setStat] = useState({ location: [] })
    const [mount, setMount] = useState(false)
    const [mount1, setMount1] = useState(false)
    const [test, setTest] = useState(null)
    const [calcule, setCalule] = useState(0)
    const fetch = async () => {
        const res1 = await Axios.get(`/api/jeux1/${props.match.params.id}/competance`)
        const res2 = await Axios.get(`/api/jeux2/${props.match.params.id}/competance`)
        const res3 = await Axios.get(`/api/jeux3/${props.match.params.id}/competance`)
        setData({ location: [...data.location, ...res2.data, ...res1.data, ...res3.data] })
        setMount(true)
    }
    const fetch2 = async () => {
        const res1 = await Axios.get('/api/jeux1')
        const res2 = await Axios.get('/api/jeux2')
        const res3 = await Axios.get('/api/jeux3')
        setStat({ location: [...stat.location, ...res2.data, ...res1.data, ...res3.data] })
        setMount1(true)
    }
    const game = useContext(GameContext)
    let auth = useSelector((state) => state.Auth.isAuthenticated)
    var array = data.location[game && game.index]
    useEffect(() => {
        fetch()
        fetch2()
        setTest(game.index)
    }, [])
    useEffect(() => {

        array = data.location[game && game.index]
    }, [game.index])

    useEffect(() => {
        setData({ location: [...data.location.sort(() => Math.random() - 0.5)] })
    }, [mount])
    //console.log(data.location[0])

    useEffect(() => {
        let x = 0
        for (let i = 0; i < stat.location.length; i++) {

            x = x + 12
        }
        setCalule(x)
    }, [mount1])

    useEffect(()=>{
        if(game.index==3 && !auth ){
            game.blocked()
        }
        if(auth){
            dispatch(Stats())
        }
    
    },[game.index])
    if (mount) {
        if (game.index == data.location.length) {
            return <Redirect to={`/Categorie/${props.match.params.categorie}`} />
        }
    }
    if(game.block){
        return <Redirect to='/' />
    }
    return (
        <div style={{marginTop:'20px'}}>

            {mount ?
                <div style={{ display: "flex" }}>
                    {array && array.type == 'algo1' ? <Algo1 {...array} /> : array.type == 'algo2' ? <Algo2 {...array} /> : array.type == 'algo3' ? <Algo3 {...array} /> : null}
                    <Score Score={calcule ? calcule : null} />
                </div> : <img src={img} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '22px' }} />
            }

        </div>
    )
}

export default withRouter(Games)
