import React, { useEffect, useState } from 'react'
import { getPaginatedDogs, alphabeticOrder, searchBar, } from '../../redux/actions';
import DogCard from '../DogCard/DogCard.jsx';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import './Principal.css';

const Principal = () => {
    const noNumbers = /^([^0-9]*)$/

    function nameValidator(e) {
        setNombre(e.target.value);
        if (noNumbers.test(e.target.value)) {
            setErrors({ ...errors, name: '' })
        }
        else {
            setErrors({ ...errors, name: 'El nombre no puede contener numeros' })
        }
    };

    const [errors,setErrors] = useState({})
    const [nombre, setNombre] = useState("");
    let apoyopaginado = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let url = (ids) => { return 'http://localhost:3000/home/' + ids }
    const { id } = useParams()
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs)
    const dogSort = useSelector((state)=>state.dogsSort)
    useEffect(() => {
        dispatch(getPaginatedDogs(id))
    }, [])

    return (

        <div>
            <NavBar>
                
            </NavBar>
             <div className='Modifiers'>
                
                    <input className='search' value={nombre} placeholder='Ingrese un nombre de una raza' onChange={(e)=>{nameValidator(e)}} type="text" name='SearchBar' />
                    <button className='boton' disabled={errors.name && 'true'} onClick={()=>{(dispatch(searchBar(nombre,dogs)))}} name='SearchBar_Button'>Buscar</button>
                    <div className="message-error">{errors ? <p>{errors.name}</p> : null} </div>
                   
                <h3>Filtros:</h3>
                <button onClick={() => { dispatch(alphabeticOrder(dogs)) }} name='Alfabetico_Filter'>Alfabetico</button>
                <button onClick={() => { dispatch(getPaginatedDogs(id)) }} name='Delete_Filter'> Quitar Filtros</button>
                {/* FALTA FILTRADO POR PESO, BASE/API Y TEMPERAMENTOS
                 <button onClick={() => { dispatch(healthOrder(recipes)) }} name='Health_Filter'>Health Score</button> */}
 
            </div>
            <div className='menu-grande2'>
                <ul>
                      {apoyopaginado.map((x) => { return <a className='paginado-link'  href={url(x)}>{x+1}</a> })}
                </ul>
              
            </div>

           
            {dogs ? dogs.map((x)=>{ return  <DogCard id={x.id} nombre={x.nombre} altura={x.altura} peso={x.peso} edad={x.edad} temperamentos={x.temperamentos} imagen={x.imagen}/>  }) : null}
           
          
            
            <div className='menu-grande2'>
                <ul>
                {apoyopaginado.map((x) => { return <a className='paginado-link' href={url(x)} >{x+1}</a> })}
                </ul>
                
            </div>
        </div>

    )

}

export default Principal;