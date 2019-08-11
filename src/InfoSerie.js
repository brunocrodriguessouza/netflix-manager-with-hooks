import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
    
    const [data, setData] = useState({
        name:''
    })
    const [form, setForm] = useState({})
    const [mode, setMode] = useState('INFO')
    const [genreId, setGenreId] = useState('')
    const [genres, setGenres] = useState([])
    const [success, setSuccess] = useState(false)
    
    useEffect(() => {
        if (match.params.id) {
            axios
            .get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })
        }
    },[match.params.id])

    useEffect(() => {
        axios
            .get('/api/genres/')
            .then(res => {
                setGenres(res.data.data)
                const genres = res.data.data
                const found = genres.find(value => data.genre === value.name)
                console.log('encontrado', found)
                if(found) {
                    setGenreId(found.id)
                }
            })
    },[data])

    // custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChangeGenre = e => {
        setGenreId(e.target.value)
    }

    const onChange = field => e => {
        setForm({
            ...form, 
            [field]: e.target.value
        })
    }

    const select = value => () => {
        setForm({
            ...form,
            status: value
        })
    }
    const save = () => {
        axios.put('/api/series/' + match.params.id, {
            ...form,
            genre_id: genreId
        })
        .then(res => {
            setSuccess(true)
        })
    }
    if (success) {
        return <Redirect to='/series' />
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0,0,0, 0.7)'}}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>]
                                <div className='lead text-white'> 
                                    { data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge> }
                                    { data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge> }
                                    Genre: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container'>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Edit</button>
            </div>
            { 
                mode === 'EDIT' &&
                <div className='container'>
                    <h1>Edit Serie</h1>
                    <pre>{JSON.stringify(form)}</pre>
                    <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancel Edit</button>
                    <form>
                        <div className='form-group'>
                            <label htmlfor='name'>Name</label>
                            <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Serie Name'/>
                        </div>
                        <div className='form-group'>
                            <label htmlfor='name'>Comments</label>
                            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' placeholder='Serie Name'/>
                        </div>
                        <div className='form-group'>
                            <label htmlfor='name'>Genre</label>
                            <select className='form-control' onChange={onChangeGenre} value={genreId}>
                                { 
                                    genres.map(genre => 
                                        <option key={genre.id} value={genre.id}>
                                            {genre.name}
                                        </option> 
                                    )
                                }
                            </select>
                        </div>
                        <div className='form-group'>
                            <input className='form-check-input' type='radio' checked={form.status === 'ASSISTIDO'} name='status' id='assistido' value='ASSISTIDO' onClick={select('ASSISTIDO')} />
                            <label className='form-check-label' htmlFor='assistido'>
                                Watched
                            </label>
                        </div>
                        <div className='form-group'>
                            <input className='form-check-input' type='radio' checked={form.status === 'PARA_ASSISTIR'} name='status' id='parar_assitir' value='PARA_ASSISTIR' onClick={select('PARA_ASSISTIR')} />
                            <label className='form-check-label' htmlFor='para_assistir'>
                                To Watch
                            </label>
                        </div>                    
                        <button type="button" onClick={save} className='btn btn-primary'>Save</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default InfoSerie