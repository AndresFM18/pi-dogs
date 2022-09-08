import {GET_TEMPERAMENTS} from '../actions';

const initialState = {
    dogs:[],
    dogsDetail:{},
    temperament:[]
};

const rootReducer = (state = initialState, action)=>{
switch (action.type){

    case GET_TEMPERAMENTS:
        return{...state, temperament:[...action.payload]}

        default:
            return{
                dogs:[],
                dogsDetail:{},
                temperament:[]
            
            }
}
};

export default rootReducer;