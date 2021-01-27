import * as types from "./../Constans/ActionsType";

var initialState  ="";

var myReducer = (state = initialState, action)=>{
    switch (action.type) {
        case types.SEARCH:
            return action.keyWord;           
        default:
            return state;
    }
}

export default myReducer;