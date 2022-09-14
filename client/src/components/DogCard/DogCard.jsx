import React from 'react';
import './DogCard.css'
const url = (ids) => { return 'http://localhost:3000/dogs/' + ids }



const DogCard = (props) => {
    return (

        <div className='container'>
            <h3 className='cursiv'>{props.nombre}</h3>
            {props.imagen ? <a href={url(props.id)}><img className='image' src={props.imagen} alt='details' /></a> : null}
            {/* <a href={url(props.id)}><img className='image' src={props.image} alt='details'/></a> */}
            <p className='cursiv'>id: {props.id}</p>
            <p className='cursiv'>Peso(kg): {props.peso}{props.weight}</p>
            <p className='cursiv'>Altura(cm): {props.altura} </p>
            <p className='cursiv'>Edad(años): {props.edad}</p>

            <h4>Temperamentos:</h4>
            <ol>
                {props.temperamentos ? props.temperamentos.map((x) => { return <li>{x.nombre}</li> }) : null}
            </ol>
            
                {props.alttemperamentos? <p>{props.alttemperamentos}</p>:null}
            

        </div>
    )
}

export default DogCard;