import React from 'react';
import './DogCard.css'
const url = (ids)=>{return 'http://localhost:3000/dogs/' + ids}



const DogCard = (props)=>{
return (
   
    <div className='container'>
        <h3 className='cursiv'>Nombre: {props.nombre}</h3>
        {/* <a href={url(props.id)}><img className='image' src={props.image} alt='details'/></a> */}
        <p className='cursiv'>id: {props.id}</p>
       <p className='cursiv'>Peso: {props.peso}{props.weight}</p>
       <p className='cursiv'>Altura: {props.altura} </p>
       <p className='cursiv'>Edad: {props.edad}</p>
       <ul>
        {props.temperamentos? props.temperamentos.map((x) => { return <li>{x}</li> }):<p>No hay Temperamentos</p>}
       </ul>
       
    </div>
)
}

export default DogCard;