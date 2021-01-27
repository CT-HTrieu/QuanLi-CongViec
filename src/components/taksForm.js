// eslint-disable-next-line no-unused-vars
import React, {Component} from "react";
import "./TaskForm.css";
import { connect } from "react-redux";
import * as actions from './../Actions/index';
class taksForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:'',
            name:'',
            status:false
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
        if(this.props.itemEditting && this.props.itemEditting.id !==null){
            this.setState({
                id:this.props.itemEditting.id,
                name:this.props.itemEditting.name,
                status:this.props.itemEditting.status
            });
        }
        else this.onClear();
    }
     componentWillReceiveProps(nextProps){
            if(nextProps && nextProps.itemEditting){
              this.setState({
                  id:nextProps.itemEditting.id,
                  name:nextProps.itemEditting.name,
                  status:nextProps.itemEditting.status
              })
          }
        else  this.onClear();
      }
  
    onSubmit = (e) =>{
        e.preventDefault();//bỏ giá trị mặc định khi gọi lại
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onCloseForm();
    }
    onClear = ()=>{
        this.setState({
            name:'',
            status: false
        })
    }
    onCloseForm = ()=>{
        this.props.onCloseForm();
    }
    render(){
        if (!this.props.isDisplayForm) return '';
           return(
            <div className="panel panel-warning ">
                    <div className="panel-heading">
                        <h3 className="panel-title">{this.state.id ? "Sửa thông tin":"Thêm Công Việc"}</h3>
                        <i className="far fa-times-circle exit_icon"
                            onClick = {this.onCloseForm}
                        />
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
                                <button type="button" className="btn btn-danger"
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

const mapStateToProps = (state)=>{
    return {
            isDisplayForm: state.isDisplayForm,
            itemEditting : state.itemEditting
    }
};

const mapDispatchToProps = (dispatch,props)=>{

        return{
            onSaveTask: (task)=>{
                dispatch(actions.saveTask(task));
            }
            ,onCloseForm :()=>{ 
            dispatch(actions.closeForm());    }
        }
}
export default connect(mapStateToProps,mapDispatchToProps) (taksForm);