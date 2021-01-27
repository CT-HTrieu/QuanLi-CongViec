import React ,{Component} from "react"
import './Sort.css';
import { connect } from 'react-redux';
import * as actions from './../Actions/index';
class Sort extends Component {
    onClick = (sortBy,sortValue)=>{
           var sort ={
                by:sortBy,
                value:sortValue
            }
     this.props.onSort(sort);
    }
    render(){
        var {sort} = this.props;
        console.log(sort);
        return(
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div className="dropdown">
                            <button 
                            className="btn btn-primary dropdown-toggle" 
                            type="button" 
                            id="dropdownMenu1" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="true">
                            Sắp Xếp     
                            <span className="fas fa-caret-square-down"></span>    
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li onClick={()=>this.onClick('name',1)} >
                                    <a href="./#" role="button" 
                                    ><span className="fas fa-sort-alpha-up pr-2"></span>
                                        Tên A-Z  
                                     <i className={(sort.by==='name' && sort.value===1)? "fas fa-check":""}></i>                  
                                    </a>
                                </li>
                                <li onClick={()=>this.onClick('name',-1)}>
                                    <a href="./#"
                                    role="button"
                                    ><span className="fas fa-sort-alpha-up-alt pr-2"></span>
                                        Tên Z-A
                                        <i className={(sort.by==='name' && sort.value===-1)? "fas fa-check":""}></i>
                                    </a>
                                </li>
                                <li role="separator" className="divider"></li>
                                <li onClick={()=>this.onClick('status',1)}>
                                    <a href="./#" 
                                    role="button"
                                >Trạng Thái Kích Hoạt
                                <i className={(sort.by==='status' && sort.value===1)? "fas fa-check":""}></i>
                                </a></li>
                                <li onClick={()=>this.onClick('status',-1)}><a 
                                href="./#"
                                role="button"
                                >Trạng Thái Ẩn
                                <i className={(sort.by==='status' && sort.value=== -1)? "fas fa-check":""}></i>
                                </a></li>
                            </ul>
                        </div>
             </div>      
            );
    }
}



const mapStateToProps =(state)=>{
    return {
        sort:state.sort
    }
}

const mapDispatchToProps = (dispatch, props)=>{

    return {
        onSort:(sort)=>{
            dispatch(actions.sortTask(sort));
        }
    };

}
export default connect(mapStateToProps,mapDispatchToProps) (Sort);