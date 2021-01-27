/* eslint-disable react/jsx-no-duplicate-props */
  
import React, { Component } from 'react'
import Control from "./Control";
import List from "./List";
import TaksForm from "./taksForm";
import "./App.css";
import { connect } from 'react-redux';
import * as actions from './../Actions/index';
class App extends Component {
    onToggleForm = ()=>{
        var {itemEditting} = this.props;
        if(itemEditting && itemEditting.id !=="")
        {
            this.props.onClearTask({
                id:'',
                name:'',
                status:false
                 });
        }
        else{
            this.props.onToggleForm();
            this.props.onClearTask({
                id:'',
                name:'',
                status:false
                 });
        }   
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
render(){
    var {isDisplayForm} = this.props;
   
    
    return(
        <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4":""}>
            {/*taksFrom */}
            <TaksForm />
            
        </div>        
            <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" :"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                <button type="button" 
                        onClick = {this.onToggleForm}
                        className="btn btn-primary insert_job">
                        <span className="fa fa-plus mr-2"></span>
                        Thêm Công Việc 
                </button>
                {/*search - sort  */}
                    <Control/>
                    {/*Sort */}
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <List />                    
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
}

const mapStateToProps =(state)=>{
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditting: state.itemEditting
    }
}

const mapDispatchToProps = (dispatch, props)=>{

    return {
        onToggleForm : ()=>{
            dispatch(actions.toggleForm());
        },
         onClearTask : (task)=>{
          dispatch(actions.editTask(task));
        },onCloseForm :()=>{ 
            dispatch(actions.closeForm()); 
        },
        onOpenForm: () =>{
            dispatch(actions.openForm());
        }
    };

}
export default connect(mapStateToProps,mapDispatchToProps) (App);

