/* eslint-disable react/jsx-no-duplicate-props */
  
import React, { Component } from 'react'
import Control from "./Control";
import List from "./List";
import TaksForm from "./taksForm";
import "./App.css";
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            tasks : [],
            isDisplayForm : false,
            taskEditing:null,
            filter:{
                name:"",
                status:-1
            },
            keyWord:"",
            sortBy:'name',
            sortValue:1
        }
    }
    componentDidMount()
    {
     if(localStorage && localStorage.getItem('tasks'))
     {
         var tasks = JSON.parse(localStorage.getItem('tasks'));
         this.setState({
            tasks: tasks
         });
     }   
    }
  /////////////  xóa hết id 
    DeteleID= ()=>{
        var {tasks} = this.state;
        for(var i=0;i<tasks.length;i++){
            tasks[i].id = this.generateID();
        }
        this.setState({
            tasks:tasks
        })
         localStorage.setItem("tasks",JSON.stringify(tasks));
    }
    s4(){
         return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID(){
         var s = this.s4()+this.s4()+'-'+this.s4()+this.s4()+'-'+this.s4()+this.s4()+'-'+this.s4()+this.s4();
        return s;
    }
    onTogoForm = ()=>{
        this.setState({
            isDisplayForm: !this.state.isDisplayForm,
            taskEditing:null
        });
    }
    onCloseForm = () =>{
         this.setState({
            isDisplayForm: false
        });
    }
    onSubmit = (data)=>{
        var {tasks} = this.state;
        if(data.id ==="")
        {
            data.id = this.generateID();
            tasks.push(data);
        }
        else{
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks:tasks,
            taskEditing:null
    
        });
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }
    onUpdateStatus = (id)=>{
        var {tasks} = this.state;
        var index = this.findIndex(id);
        // eslint-disable-next-line eqeqeq
        if(index !==-1 ){
            tasks[index].status = !tasks[index].status 
        }
        this.setState({
            tasks:tasks
        });
          localStorage.setItem("tasks",JSON.stringify(tasks));
    }
     onDelete = (id)=>{
        var {tasks} = this.state;
        var index = this.findIndex(id);
        // eslint-disable-next-line eqeqeq
        if(index !== -1 ){
            tasks.splice(index,1);
            console.log(index);
            this.setState({
            tasks:tasks
        });
          localStorage.setItem("tasks",JSON.stringify(tasks));
        }
        this.onCloseForm();
    }
   
    findIndex = (id)=>{
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((task,index)=>{
            if(task.id===id){
                result = index;
            }
        });
       return result; 
    }
    onUpdate = (id)=>{
          var {tasks} = this.state;
          var index = this.findIndex(id);
          var taskE = tasks[index];
          this.setState({
                taskEditing:taskE
                 });
        this.onShowForm();
        
    }
    onShowForm=()=>{
         this.setState({
            isDisplayForm: true
        });
    }
    onFiter = (fiterName,fiterStatus)=>{
        fiterStatus = parseInt(fiterStatus,10);
        this.setState({
            filter:{
                name:fiterName.toLowerCase(),
                status:fiterStatus
            }
        })
    }
    onSearch = (keyWord)=>{
        this.setState({
            keyWord : keyWord
        })
    }

    onSort = (name, value)=>{
    this.setState({
        sortBy:name,
        sortValue:value
    })
    }
render(){
    var {tasks,isDisplayForm,taskEditing, filter,keyWord,sortValue,sortBy} = this.state;
    if(filter){
        if(filter.name){
            tasks = tasks.filter((task)=>{
                return task.name.toLowerCase().indexOf(filter.name) !==-1;
            });
        }
            tasks= tasks.filter((task)=>{
                if(filter.status === -1 )
                    return task;
                else{
                    return task.status === (filter.status=== 1 ? true : false)
                }    
            });
    }
    if(keyWord){
        tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyWord) !==-1;
            });
    }
    if(sortBy==='name'){
        tasks.sort((a,b)=>{
            if(a.name > b.name) return sortValue;
            else if(a.name < b.name) return -sortValue;
            else return 0;
    })
    }else{
        tasks.sort((a,b)=>{
            if(a.status > b.status) return -sortValue;
            else if(a.status < b.status) return sortValue;
            else return 0;
    })
    }
    return(
        <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4":""}>
            {/*taksFrom */}
            {/* kt tasks form theo tru false  */}
            {isDisplayForm ? 
            <TaksForm 
            onCloseForm={this.onCloseForm}
            onSubmit = {this.onSubmit} 
            task = {taskEditing}  
            />: ""}
            
        </div>        
            <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" :"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                <button type="button" 
                        onClick = {this.onTogoForm}
                        className="btn btn-primary insert_job">
                        <span className="fa fa-plus mr-2"></span>
                        Thêm Công Việc 
                </button>
                {/*search - sort  */}
                    <Control
                    onSearch = {this.onSearch}
                    onSort= {this.onSort}
                    sortBy = {sortBy}
                    sortValue={sortValue}
                    />
                    {/*Sort */}
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <List 
                      tasks ={tasks} 
                      onUpdateStatus={this.onUpdateStatus} 
                      onDelete={this.onDelete}
                      onUpdate= {this.onUpdate}   
                      onFiter = {this.onFiter} 
                      />                    
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
}

export default App;

