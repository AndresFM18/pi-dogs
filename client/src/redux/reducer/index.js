import {GET_TEMPERAMENTS, GET_DOGS_ID,ALPHABETIC_ORDER, GET_PAGINATED_DOGS,SEARCH_BAR, GET_FROM} from '../actions';

const initialState = {
    dogs:[],
    dogsDetail:{},
    temperament:[],
    dogsSort:[]
};

const rootReducer = (state = initialState, action)=>{
switch (action.type){

    case GET_TEMPERAMENTS:
        return{...state, temperament:[...action.payload]}

            case GET_DOGS_ID:
                return {...state, dogsDetail:{...action.payload}}

                case GET_PAGINATED_DOGS:
                    return {...state, dogs:[...action.payload], dogsSort:[]}

                    case ALPHABETIC_ORDER:
                        return {...state, dogs:[...action.payload]}

                        case SEARCH_BAR:
                                return{...state, dogs:[...action.payload]}

                                case GET_FROM:
                                    return{...state, dogs:[...action.payload]}

        default:
            return{
                dogs:[],
                dogsDetail:{},
                temperament:[],
                dogsSort:[]
            
            }
}
};

export default rootReducer;