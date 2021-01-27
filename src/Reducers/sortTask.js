import * as types from "./../Constans/ActionsType";

var initialState  = {
    by:"",
    value: 1 // tăng 1: giảm -1
};

var myReducer = (state = initialState, action)=>{
    switch (action.type) {
        case types.SORT:
            return action.sort;           
        default:
            return state;
    }
}

export default myReducer;