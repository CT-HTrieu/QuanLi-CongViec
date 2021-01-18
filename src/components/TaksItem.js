import React, {Component} from "react"

 class TaksItem extends Component{
     onUpdateStatus = () =>{
         this.props.onUpdateStatus(this.props.task.id);
     }
     onDelete =()=>{
         this.props.onDelete(this.props.task.id);
     }
     onUpdate =()=>{
         this.props.onUpdate(this.props.task.id);
     }
     render(){
         var {task,index} = this.props;
         return(
               <tr>
                                    <td>{index + 1}</td>
                                    <td>{task.name}</td>
                                    <td className="text-center">
                                        <span 
                                        className={task.status === true ? "label label-danger" : "label label-success"}
                                        onClick={this.onUpdateStatus}
                                        >
                                                {task.status === true ? "Action" : "No action"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button type="button" 
                                        className="btn btn-warning"
                                        onClick={this.onUpdate}>
                                            <span className="fas fa-pencil-alt mr-2"></span>
                                            Sửa
                                        </button>
                                        &nbsp;
                                        <button 
                                        type="button" 
                                        className="btn btn-danger"
                                        onClick={this.onDelete}
                                        >
                                            <span className="fas fa-trash-alt mr-2"></span>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
         );
     }
 }
 export default TaksItem;