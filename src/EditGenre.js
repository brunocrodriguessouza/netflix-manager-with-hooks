import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditGenre = ({ match }) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        axios
            .get('/api/genres/' + match.params.id)
            .then(res => {
                setName(res.data.name)
            })
    },[match.params.id])

    const onChange = e => {
        setName(e.target.value)
    }
    const save = () => {
        axios.put('/api/genres/' + match.params.id, {
            name
        })
        .then(res => {
            setSuccess(true)
        })
    }
    if (success) {
        return <Redirect to='/genres' />
    }

    return (
        <div className='container'>
            <h1>New Genre</h1>
            <form>
                <div className='form-group'>
                    <label htmlfor='name'>Name</label>
                    <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Genre Name'/>
                </div>
                <button type="button" onClick={save} className='btn btn-primary'>Save</button>
            </form>
        </div>
    )
}

export default EditGenre