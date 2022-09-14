import React, { useEffect } from 'react';
import { getDogId } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './DogDetail.css';
import NavBar from '../NavBar/NavBar';




const DogDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const dog = useSelector((state) => state.dogsDetail)
    useEffect(() => {
        dispatch(getDogId(id))
    }, [])

    return (
        <div>
            <NavBar></NavBar>
            {dog ? <div>

                <div className="descripcion">

                    <div className="imagen-descripcion">
                        <h1>{dog.nombre}</h1>
                        <img src={dog.imagen} alt="NoIMG" />
                        <div className='listas'>

                            <h3>
                                Temperamentos:
                            </h3>
                            <ol>
                                {dog.temperamentos ? dog.temperamentos.map((x) => { return <li>{x.nombre}</li> }) : <p>No hay Temperamentos</p>}
                            </ol>
                            <br />
                            <h3>CARACTERISTICAS:</h3>
                            <p className='cursiv'>id: {dog.id}</p>
                            <p className='cursiv'>Peso: {dog.peso}</p>
                            <p className='cursiv'>Altura: {dog.altura} </p>
                            <p className='cursiv'>Edad: {dog.edad}</p>
                        </div>
                    </div>
                </div>
            </div> : <h1>No existe</h1>}

        </div>

    )

}

export default DogDetail;