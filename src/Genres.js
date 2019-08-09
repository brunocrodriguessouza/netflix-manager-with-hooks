import React, {useState, useEffect }from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

const Genres = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setData(res.data.data)
            })
    },[])

    const removeGenre = id => {
        axios
            .delete('/api/genres/' + id)
            .then(res => {
                const filtrado = data.filter(item => item.id !== id)
                setData(filtrado)
            })
    }

    const renderRow = record => {
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => removeGenre(record.id)}>Remover</button>
                    <Link to={'/genres/' + record.id} className='btn btn-warning'>Editar</Link>
                </td>
            </tr>
        )
    }

    if (data.length === 0 ) {
        return (
            <div className='container'>
                <h1>Genres</h1>
                <div className='alert alert-warning' role='alert'>
                    You have no genres created..
                </div>
            </div>
        )
    }

    return (
       <div className='container'>
           <h1>Genres</h1>
           <div><Link to='/genres/new' className='btn btn-primary'>New Genre</Link></div>
           <table className='table table-dark'>
              <thead>
                  <tr>
                      <th scope='col'>ID</th>
                      <th scope='col'>Name</th>
                      <th scope='col'>Action</th>
                  </tr>
              </thead>
              <tbody>
                {data.map(renderRow)}
              </tbody>
           </table>
           {/* <pre>{JSON.stringify(data)}</pre> */}
       </div>
    )
}

export default Genres