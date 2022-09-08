import axios from 'axios';

export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'

export const getAllTemperaments = ()=>{
    return async(dispatch) =>{
        await axios.get("http://localhost:3001/temperaments")
        .then((res)=>{var respuesta = res.data
        dispatch({type:GET_TEMPERAMENTS, payload:respuesta})})
    }
}