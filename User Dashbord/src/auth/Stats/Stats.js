import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import img from '../../img/giphy.gif'
import Image from './Algos/Image'
import Images from './Algos/Images'
import DragDrop from './Algos/DragDrop'
const Stats = (props) => {
    const [mount, setMount] = useState(false)
    const [jeux, setJeux] = useState([])
    const getFault = async () => {
        if (props.match.params.type == 'algo1') {
            const res = await Axios.get(`/api/jeux1/${props.match.params.id}`)
            setJeux({ ...res.data })
        } else if (props.match.params.type == 'algo2') {
            const res = await Axios.get(`/api/jeux2/${props.match.params.id}`)
            setJeux({ ...res.data })
        } else {
            const res = await Axios.get(`/api/jeux3/${props.match.params.id}`)
            setJeux({ ...res.data })
        }
        setMount(true)
    }
    useEffect(() => {
        getFault()
    }, [])
    console.log(jeux)
    const type = props.match.params.type
    return (
        <div>
            {mount ?
                <>
                    {jeux && type == 'algo1' ? <Image {...jeux} /> : jeux && type == 'algo2' ? <Images {...jeux} /> : jeux && type == 'algo3' ? <DragDrop {...jeux} /> : null}
                </>
                : <img src={img} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '22px' }} />}

        </div>
    )
}

export default Stats
