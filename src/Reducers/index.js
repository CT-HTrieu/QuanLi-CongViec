import {combineReducers}  from 'redux';
import tasks from "./tasks";
import isDisplayForm from './isDisplayForm';
import itemEditting from './itemEditting';
import filterTable from './filterTable';
import search from './searchTask';
import sort from './sortTask';
 const myReducer = combineReducers({
     tasks,
     isDisplayForm,
     itemEditting,
     filterTable,
     search,
     sort
    });// lưu ý đặc biệt 


 export default myReducer;