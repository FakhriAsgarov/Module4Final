import * as actionTypes from '../actions/actionTypes'
import initialState from '../initialStates/initialState'
 const reducer=(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.SEARCH_MOVIE:
            return {...state,
                movies:action.payload}
        case actionTypes.ADD_FAVORITES:
                let a= state.favouriteMovie.find(item=>{
                   return item.imdbID===action.payload.imdbID
                })
                if(a){
                    return state;
                }
                else{
                    return {...state, 
                        favouriteMovie:[...state.favouriteMovie,action.payload]}
                }
           
            
         case actionTypes.DEL_FAVORITE:
            let filteredList=state.favouriteMovie.filter((item)=>action.payload.imdbID!==item.imdbID)
             return {...state, 
                 favouriteMovie:filteredList}
               
        default:
            return state;
    }
}

export default reducer;