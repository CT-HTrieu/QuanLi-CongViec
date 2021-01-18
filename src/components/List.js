import React, {Component} from 'react'
import TasksItem from "./TaksItem"
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
        this.props.onFiter(name==="fiterName" ? value : this.state.fiterName,
                            name==="fiterStatus" ? value: this.state.fiterStatus);
          this.setState({
              [name]: value
          })
    } 
     render(){
         var {tasks} = this.props;
         var {fiterName,fiterStatus} = this.state;
         var elTask = tasks.map((task,index) => {
            return <TasksItem 
            key={task.id} 
            index={index} 
            task = {task}
            onUpdateStatus={this.props.onUpdateStatus}   
            onDelete={this.props.onDelete} 
            onUpdate = {this.props.onUpdate}
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
 export default List;