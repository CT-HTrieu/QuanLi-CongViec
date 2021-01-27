import React, {Component} from 'react'
import TasksItem from "./TaksItem"
import { connect } from "react-redux";
import * as actions from './../Actions/index';
 class List extends Component{
     constructor(props){
         super(props)
         this.state={
             fiterName:'',
             fiterStatus:-1
         }
     }
    onChange = (event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        var filter={
            name:name==="fiterName" ? value : this.state.fiterName,
            status:name==="fiterStatus" ? value: this.state.fiterStatus
        }
         this.props.onFilterTable(filter);
          this.setState({
              [name]: value
          })
    } 
     render(){
         var {tasks,filterTable,keyWord,sort} = this.props;
         var {fiterName,fiterStatus} = this.state;
            if(filterTable.name){
              tasks = tasks.filter((task)=>{
                   return task.name.toLowerCase().indexOf(filterTable.name) !==-1;
                 });
             }
                tasks= tasks.filter((task)=>{   
                if(filterTable.status === -1 )
                    return task;
                else{
                    return task.status === (filterTable.status === "1" ? true : false)
                }    
            });

         //search
        if(keyWord){
        tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyWord) !==-1;
            });
        }   

        //sort
            if(sort.by==='name'){
                tasks.sort((a,b)=>{
                  if(a.name > b.name) return sort.value;
                     else if(a.name < b.name) return -sort.value;
                     else return 0;
                })
            }else{
                 tasks.sort((a,b)=>{
                   if(a.status > b.status) return -sort.value;
                    else if(a.status < b.status) return sort.value;
                        else return 0;
                    })
                 }

        //
         var elTask = tasks.map((task,index) => {
            return <TasksItem 
            key={task.id} 
            index={index } 
            task = {task} 
            />
         });
         return(
               <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">STT</th>
                                    <th className="text-center">Tên</th>
                                    <th className="text-center">Trạng Thái</th>
                                    <th className="text-center">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input type="text" className="form-control" 
                                            name="fiterName"
                                            value={fiterName}
                                            onChange={this.onChange}
                                        />
                                    </td>
                                    <td>
                                        <select className="form-control"
                                        name="fiterStatus"
                                        value={fiterStatus}
                                        onChange={this.onChange}>
                                            <option value={-1}>Tất Cả</option>
                                            <option value={0}>Ẩn</option>
                                            <option value={1}>Kích Hoạt</option>
                                        </select>
                                    </td>
                                    <td></td>
                                </tr>
                               {/* taksItem */}
                                {elTask}
                            </tbody>
                        </table>

         );
     }
 }
const mapStateToProps = (state)=>{
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyWord:state.search,
        sort: state.sort
    };

};

const mapDispatchToProps =(dispatch,props)=>{
    return{
            onFilterTable:(filter)=>{
                dispatch(actions.filterTask(filter));
            }
    }
}

 export default connect(mapStateToProps,mapDispatchToProps) (List);