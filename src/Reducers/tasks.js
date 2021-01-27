import * as types from "./../Constans/ActionsType";

// eslint-disable-next-line no-undef
 var s4 = ()=>{
         return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }
// eslint-disable-next-line no-undef
 var generateID= () => {
         var s = s4()+s4()+'-'+s4()+s4()+'-'+s4()+s4()+'-'+s4()+s4();
        return s;
}
var findIndex = (tasks,id)=>{
        var result = -1;
        tasks.forEach((task,index)=>{
            if(task.id===id){
                result = index;
            }
        });
       return result; 
    }

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState  = data ? data : [];
var id="";
var index = -1;
var myReducer = (state = initialState, action)=>{
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var newTask = {
                id: action.task.id,
                name: action.task.name,
                status:action.task.status
            }
            if(!newTask.id)
                {   newTask.id = generateID();
                    state.push(newTask);
                } 
            else {
                    index = findIndex(state,newTask.id);
                    state[index] = newTask;
            }    
            localStorage.setItem("tasks",JSON.stringify(state));
            return [...state];      
        case types.UPDATE_STATUS_TASK:
                  id = action.id;
                  index = findIndex(state,id);
                 
                 if(index !==-1 ){
                    var cloneTask = {...state[index]};//copy lại 1 cái state[index]
                    cloneTask.status = ! cloneTask.status;
                    state[index] = cloneTask;
                  }
            localStorage.setItem("tasks",JSON.stringify(state));
            return [...state];   
        case types.DELETE_TASK:
                 id = action.id;
                 index = findIndex(state,id);
                 state.splice(index,1);
                 localStorage.setItem("tasks",JSON.stringify(state));
                 return [...state]; 
        default:
            return state;
    }
}

export default myReducer;