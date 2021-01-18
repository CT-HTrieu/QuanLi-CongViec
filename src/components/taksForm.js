// eslint-disable-next-line no-unused-vars
import React, {Component} from "react";
import "./TaskForm.css";
class taksForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:"",
            name: '',
            status : true
        }
    }
    
    onCloseForm = ()=>{
        this.props.onCloseForm();
    }
    onChange = (e)=>{
        var target = e.target;
        var name = target.name;
        var value = target.value;
        if(name ==="status"){
            value = target.value ==="true" ? true: false;
        }
        this.setState({
            [name]: value
        })
    }
    componentDidMount(){
        if(this.props.task){
            this.setState({
                id:this.props.task.id,
                name:this.props.task.name,
                status:this.props.task.status
            });
        }
    }
    onSubmit = (e) =>{
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }
    onClear = ()=>{
        this.setState({
            name:'',
            status: false
        })
    }
    render(){
        var {id} = this.state;
           return(
            <div className="panel panel-warning ">
                    <div className="panel-heading">
                        <h3 className="panel-title">{id !== ""? "Sửa thông tin":"Thêm Công Việc"}</h3>
                        <i className="far fa-times-circle exit_icon"
                            onClick = {this.onCloseForm}
                        />
                        {/* <span className="fa fa-times-circle text-right"></span> */}
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                 name= "name"   
                                 value= {this.state.name}
                                 onChange  ={ this.onChange}
                                />
                            </div>
                            <label>Trạng Thái :</label>
                            <select 
                            className="form-control" 
                            required="required"
                            name="status"
                            value= {this.state.status}
                            onChange  ={ this.onChange}
                            >
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-2"></span>
                                Thêm</button>&nbsp;
                                <button type="submit" className="btn btn-danger"
                                onClick={this.onClear}
                                >
                                <span className="fas fa-times mr-2"></span>
                                Hủy Bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>  
        );
    
    } 
}
export default taksForm;