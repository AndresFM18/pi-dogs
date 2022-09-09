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
        peso: '',
        altura: '',
        edad: '',
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

    function pesoValidator(e) {
        setInput({ ...input, peso: e.target.value });
        if (Numbers.test(e.target.value)) {
            setErrors({ ...errors, peso: '' })
        } else {
            setErrors({ ...errors, peso: 'El peso debe ser un numero' })
        }
    }

    function alturaValidator(e) {
        setInput({ ...input, altura: e.target.value });
        if (Numbers.test(e.target.value)) {
            setErrors({ ...errors, altura: '' })
        } else {
            setErrors({ ...errors, altura: 'La altura debe ser un numero' })
        }
    }

    function edadValidator(e) {
        setInput({ ...input, edad: e.target.value });
        if (Numbers.test(e.target.value)) {
            setErrors({ ...errors, edad: '' })
        } else {
            setErrors({ ...errors, edad: 'La edad debe ser un numero' })
        }
    }
    function temperamentosValidator(e) {
        if (e.target.value === "all") {
            return console.log("xd")
        }
        if (!input.temperamento.includes(e.target.value)) {
            setInput({ ...input, temperamento: [...input.temperamento, e.target.value] })
        }
    }

    function borrarTemperamento(el) {
        setInput({ ...input, temperamento: input.temperamento.filter((param) => param !== el) })
    }



    let verdadAbsoluta = (errors) => {
        if (errors.nombre || errors.peso || errors.altura || errors.edad) {
            return true
        } else { return false }
    }
    let post = async (e) => {
        e.preventDefault();
        try {
            if (input.nombre === "" && input.edad === "" && input.peso === "" && input.altura === "") {
                return setMessage('Todos los campos estan vacios')
            }

            if (input.temperamento[0] !== undefined) {
                let res2 = await axios.post("http://localhost:3001/dogs2", {
                    nombre: input.nombre,
                    edad: input.edad,
                    altura: input.altura,
                    peso: input.peso,
                    temperamento: input.temperamento
                })
                if (res2.data === 'Se ha creado la Raza correctamente') {
                    setInput({
                        nombre: '',
                        peso: '',
                        altura: '',
                        edad: '',
                        temperamento: []
                    })
                    return setMessage("Raza creada2 correctamente");

                } else {
                    return setMessage("Algo muy malo ocurrio")
                }



            }
            let res = await axios.post("http://localhost:3001/dogs", {
                nombre: input.nombre,
                edad: input.edad,
                altura: input.altura,
                peso: input.peso
            });
            if (res.data === "llave duplicada viola restricción de unicidad «razas_nombre_key2»") {
                return setMessage('Esta raza ya existe');
            }
            if (res.data === 'Se ha creado la Raza correctamente') {
                setInput({
                    nombre: '',
                    peso: '',
                    altura: '',
                    edad: '',
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
                        <input type="text"
                            value={input.peso}
                            placeholder='Ingrese el peso de su Raza...'
                            onChange={(e) => { pesoValidator(e) }}
                        />
                        <div className="message-error">{errors ? <p>{errors.peso}</p> : null} </div>
                        <label>Altura (m)</label>
                        <input type="text"
                            value={input.altura}
                            placeholder='Ingrese la altura de su Raza'
                            onChange={(e) => { alturaValidator(e) }}
                        />
                        <div className="message-error">{errors ? <p>{errors.altura}</p> : null} </div>
                        <label>Edad</label>
                        <input type="text"
                            value={input.edad}
                            placeholder='Introduzca la edad aproximada de su Raza...'
                            onChange={(e) => { edadValidator(e) }}
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