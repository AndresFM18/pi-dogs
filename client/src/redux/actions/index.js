import axios from 'axios';

export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const GET_DOGS = 'GET_DOGS'
export const GET_DOGS_ID = 'GET_DOGS_ID'
export const GET_PAGINATED_DOGS = 'GET_PAGINATED_DOGS'
export const ALPHABETIC_ORDER = 'ALPHABETIC_ORDER'
export const SEARCH_BAR = 'SEARCH_BAR'
export const GET_FROM = 'GET_FROM'
export const GET_TEMPERAMENT_FILTER = 'GET_TEMPERAMENT_FILTER'

export const getAllTemperaments = () => {
    return async (dispatch) => {
        await axios.get("http://localhost:3001/temperaments")
            .then((res) => {
                var respuesta = res.data
                dispatch({ type: GET_TEMPERAMENTS, payload: respuesta })
            })
    }
}

export const getAllDogs = () => {
    return async (dispatch) => {
        await axios.get("http://localhost:3001/dogs")
            .then((res) => {
                var respuesta = res.data
                dispatch({ type: GET_DOGS, payload: respuesta })
            })
    }
}

export const getDogId = (id) => {
    return async (dispatch) => {
        await axios.get(`http://localhost:3001/dogs/${id}`)
            .then((response) => {
                var respuesta = response.data
                dispatch({ type: GET_DOGS_ID, payload: respuesta })
            })
    }
};

export const getPaginatedDogs = (id) => {
    return async (dispatch) => {
        let arreglodb = [];
        let arregloapi = [];
        await axios.get('http://localhost:3001/database')
            .then((responsed) => {
                let respuesta = responsed.data
                respuesta.forEach((x) => {
                    arreglodb.push({
                        id: x.id,
                        nombre: x.nombre,
                        altura: x.altura,
                        peso: x.peso,
                        edad: x.edad,
                        temperamentos: x.temperamentos,
                        imagen: x.imagen

                    })
                })
            })

        await axios.get(`http://localhost:3001/apicall/${150 - arreglodb.length}`)
            .then((response) => {
                var respuesta = response.data
                respuesta.forEach((x) => {
                    arregloapi.push({
                        id: x.id,
                        nombre: x.nombre,
                        altura: x.altura,
                        peso: x.peso,
                        edad: x.edad,
                        temperamentos: x.temperamentos,
                        imagen: x.imagen
                    })

                })
            })

        let arraydefinitivo = arreglodb.concat(arregloapi)
        let arreglopaginado = [];
        for (let i = 0; i < arraydefinitivo.length; i += 10) {
            let division = arraydefinitivo.slice(i, i + 10);
            arreglopaginado.push(division);
        }

        dispatch({ type: GET_PAGINATED_DOGS, payload: arreglopaginado[id] })

    }
};

export const alphabeticOrder = (array) => {
    return async (dispatch) => {
        function SortArray(x, y) {
            if (x.nombre < y.nombre) { return -1; }
            if (x.nombre > y.nombre) { return 1; }
            return 0;
        }
        const ordened = array.sort(SortArray);
        dispatch({ type: ALPHABETIC_ORDER, payload: ordened })
    }
}

export const searchBar = (nombre, array) => {
    return async (dispatch) => {
        await axios.get(`http://localhost:3001/dogs?nombres=${nombre}`)
            .then((response) => {
                var respuesta = response.data
                if (typeof respuesta === "string") {
                    return dispatch({ type: SEARCH_BAR, payload: array })
                }
                dispatch({ type: SEARCH_BAR, payload: respuesta })
            })
    }
}
export const getFrom = (string, id) => {
    if (string === "Database") {

        return async (dispatch) => {
            await axios.get('http://localhost:3001/database')
                .then((response) => {
                    var respuesta = response.data

                    let arreglopaginado = [];
                    for (let i = 0; i < respuesta.length; i += 10) {
                        let division = respuesta.slice(i, i + 10);
                        arreglopaginado.push(division);
                    }

                    if (arreglopaginado[id] === undefined) {
                        dispatch({ type: GET_FROM, payload: arreglopaginado[0] })
                    } else {
                        dispatch({ type: GET_FROM, payload: arreglopaginado[id] })
                    }

                })
        }


    }
    if (string === "Api") {

        return async (dispatch) => {
            await axios.get('http://localhost:3001/apisort')
                .then((responsed) => {
                    var respuesta2 = responsed.data

                    let arreglopaginado = [];
                    for (let i = 0; i < respuesta2.length; i += 10) {
                        let division = respuesta2.slice(i, i + 10);
                        arreglopaginado.push(division);
                    }

                    dispatch({ type: GET_FROM, payload: arreglopaginado[id] })
                })
        }
    }
}
export const getTemperamentFilter = (string) => {
    return async (dispatch) => {
        await axios.get('http://localhost:3001/dogs')
            .then((respuesta) => {
                var todosperros = respuesta.data
                let filtrado = [];
                todosperros.forEach((dog) => {
                    for (let i = 0; i < dog.temperamentos.length; i++) {
                        if(dog.temperamentos[i].nombre === string)
                        filtrado.push(dog)
                    }
                }

                )
                dispatch({ type:GET_TEMPERAMENT_FILTER, payload:filtrado})
            })
    }
}