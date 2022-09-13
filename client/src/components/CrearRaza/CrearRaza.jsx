import React from 'react';
import { useState, useEffect } from 'react';
import './CrearRaza.css';
import axios from 'axios';
import NavBar from '../NavBar/NavBar.jsx';
import { useDispatch, useSelector } from "react-redux";
import { getAllTemperaments } from '../../redux/actions';




function CreateRecipe() {

    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperament)
    const [input, setInput] = useState({
        nombre: '',
        peso1: '',
        peso2: '',
        altura1: '',
        altura2: '',
        edad1: '',
        edad2: '',
        imagen: '',
        temperamento: [],

    })
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const noNumbers = /^([^0-9]*)$/
    const Numbers = /^[0-9]*$/

    useEffect(() => {
        dispatch(getAllTemperaments());
    }, []);






    function nombreValidator(e) {
        setInput({ ...input, nombre: e.target.value });
        if (noNumbers.test(e.target.value)) {
            setErrors({ ...errors, nombre: '' })
        }
        else {
            setErrors({ ...errors, nombre: 'El nombre no puede contener numeros' })
        }
    };

    function pesoValidator1(e) {
        setInput({ ...input, peso1: e.target.value });
        // let pes1 = Number(input.peso1);
        // let pes2 = Number(input.peso2);
        // if (pes1 > pes2){
        //     setErrors({ ...errors, pesot: 'El peso minimo no puede ser mayor que el peso maximo' })
        // } else {
        //     setErrors({ ...errors, pesot: '' })
        // }
    }
    function pesoValidator2(e) {
        setInput({ ...input, peso2: e.target.value });
        // let pes1 = Number(input.peso1);
        // let pes2 = Number(input.peso2);
        // if (pes1 > pes2){
        //     setErrors({ ...errors, pesot: 'El peso minimo no puede ser mayor que el peso maximo' })
        // } else {
        //     setErrors({ ...errors, pesot: '' })
        // }
    }

    function alturaValidator1(e) {
        setInput({ ...input, altura1: e.target.value });
        // if (Numbers.test(e.target.value)) {
        //     setErrors({ ...errors, altura: '' })
        // } else {
        //     setErrors({ ...errors, altura: 'La altura debe ser un numero' })
        // }
    }

    function alturaValidator2(e) {
        setInput({ ...input, altura2: e.target.value });
        // if (Numbers.test(e.target.value)) {
        //     setErrors({ ...errors, altura: '' })
        // } else {
        //     setErrors({ ...errors, altura: 'La altura debe ser un numero' })
        // }
    }


    function edadValidator1(e) {
        setInput({ ...input, edad1: e.target.value });
        // if (Numbers.test(e.target.value)) {
        //     setErrors({ ...errors, edad: '' })
        // } else {
        //     setErrors({ ...errors, edad: 'La edad debe ser un numero' })
        // }
    }

    function edadValidator2(e) {
        setInput({ ...input, edad2: e.target.value });
        // if (Numbers.test(e.target.value)) {
        //     setErrors({ ...errors, edad: '' })
        // } else {
        //     setErrors({ ...errors, edad: 'La edad debe ser un numero' })
        // }
    }
    function temperamentosValidator(e) {
        if (e.target.value === "all") {
        }
        if (!input.temperamento.includes(e.target.value)) {
            setInput({ ...input, temperamento: [...input.temperamento, e.target.value] })
        }
    }

    function borrarTemperamento(el) {
        setInput({ ...input, temperamento: input.temperamento.filter((param) => param !== el) })
    }

    function imagenValidator(e){
        setInput({...input, imagen:e.target.value})
    }



    let verdadAbsoluta = (errors) => {
        if (errors.nombre || errors.peso1 || errors.altura || errors.edad) {
            return true
        } else { return false }
    }
    let post = async (e) => {
        e.preventDefault();
        try {
            if (input.nombre === "" && input.edad1 === "" && input.edad2 === "" && input.peso1 === "" && input.peso2 === "" && input.altura1 === "" && input.altura2 === "") {
                return setMessage('Todos los campos estan vacios')
            }

            if (input.temperamento[0] !== undefined) {
                let res2 = await axios.post("http://localhost:3001/dogs2", {
                    nombre: input.nombre,
                    edad1: input.edad1,
                    edad2: input.edad2,
                    altura1: input.altura1,
                    altura2: input.altura2,
                    peso1: input.peso1,
                    peso2: input.peso2,
                    imagen:input.imagen,
                    temperamento: input.temperamento
                })
                if (res2.data === 'Se ha creado la Raza correctamente') {
                    setInput({
                        nombre: '',
                        peso1: '',
                        peso2: '',
                        altura1: '',
                        altura2: '',
                        edad1: '',
                        edad2: '',
                        imagen:'',
                        temperamento: []
                    })
                    return setMessage("Raza creada2 correctamente");

                } else {
                    return setMessage("Algo muy malo ocurrio")
                }



            }
            let res = await axios.post("http://localhost:3001/dogs", {
                nombre: input.nombre,
                edad1: input.edad1,
                edad2: input.edad2,
                altura1: input.altura1,
                altura2: input.altura2,
                peso1: input.peso1,
                peso2: input.peso2,
                imagen: input.imagen
            });
            if (res.data === "llave duplicada viola restricción de unicidad «razas_nombre_key2»") {
                return setMessage('Esta raza ya existe');
            }
            if (res.data === 'Se ha creado la Raza correctamente') {
                setInput({
                    nombre: '',
                    peso1: '',
                    peso2: '',
                    altura1: '',
                    altura2: '',
                    edad1: '',
                    edad2: '',
                    imagen:'',
                    temperamento: []
                })
                setMessage("Raza creada correctamente");

            } else {
                setMessage("Algo malo ocurrio")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>
            <div className='formulario'>
                <div className="formulario-contacto">

                    <div className="formulario-imagen-trasera">
                        <img src="https://www.elblogdelasalud.info/animales/wp-content/uploads/2018/09/Raza-Golden-Retriever.jpg" alt="NOIMG" />
                    </div>

                    <div className="formulario-imagen-frontal">

                        <p className="creatup">CREA TU RAZA</p>
                    </div>

                </div>
                <div className='formulario-sugerencias'>
                    <form onSubmit={post}>
                        <label>Nombre</label>

                        <input type="text"
                            value={input.nombre}
                            placeholder='Ingrese el nombre de la Raza...'
                            onChange={(e) => { nombreValidator(e) }}
                        />
                        <div className="message-error">{errors ? <p>{errors.nombre}</p> : null} </div>
                        <label> Peso (kg)</label>

                        <input type="number"
                            value={input.peso1}
                            placeholder='Ingrese el peso minimo de su Raza...'
                            onChange={(e) => { pesoValidator1(e) }}
                        />
                        <input type="number"
                            value={input.peso2}
                            placeholder='Ingrese el peso maximo de su Raza...'
                            onChange={(e) => { pesoValidator2(e) }}
                        />

                        <div className="message-error">{errors.pesot ? <p>{errors.pesot}</p> : null} </div>
                        <label>Altura (m)</label>

                        <input type="number"
                            value={input.altura1}
                            placeholder='Ingrese la altura minima de su Raza'
                            onChange={(e) => { alturaValidator1(e) }}
                        />

                        <input type="number"
                            value={input.altura2}
                            placeholder='Ingrese la altura maxima de su Raza'
                            onChange={(e) => { alturaValidator2(e) }}
                        />

                        <div className="message-error">{errors ? <p>{errors.altura}</p> : null} </div>
                        <label>Edad</label>

                        <input type="number"
                            value={input.edad1}
                            placeholder='Introduzca la edad minima aproximada de su Raza...'
                            onChange={(e) => { edadValidator1(e) }}
                        />
                        <input type="number"
                            value={input.edad2}
                            placeholder='Introduzca la edad minima aproximada de su Raza...'
                            onChange={(e) => { edadValidator2(e) }}
                        />
                        <input type="text"
                        value={input.imagen}
                        placeholder='Introduzca la URL de la imagen'
                        onChange={(e)=>{imagenValidator(e)}}                        
                        />

                        <label>Temperamentos: </label>
                        <select onChange={(e) => { temperamentosValidator(e) }}>
                            <option value="all">All</option>
                            {temperaments ? temperaments.map((x) => {
                                return (
                                    <option key={x.id} value={x.nombre}>
                                        {x.nombre}
                                    </option>)
                            }) : null}
                        </select>

                        <div>
                            {input.temperamento ? input.temperamento.map((e) => {
                                return <>
                                    <div>
                                        {e}
                                    </div>
                                    <button onClick={() => { borrarTemperamento(e) }}>X</button>
                                </>
                            }) : null}
                        </div>

                        <div className="message-error">{errors ? <p>{errors.edad}</p> : null} </div>

                        <div className="message">{message ? <p>{message}</p> : null} </div>



                        <button type="submit" disabled={verdadAbsoluta(errors) && 'true'}>Crear Raza</button>

                    </form>
                </div>

            </div>
        </div>


    );
}

export default CreateRecipe;