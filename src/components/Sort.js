import React ,{Component} from "react"
import './Sort.css';
class Sort extends Component {
    constructor(params) {
        super(params)
        this.state={
            sort:{
                by: 'name',
                value:1
            }
        }
    }
    
    onClick = (sortBy,sortValue)=>{
        this.setState({
            sort:{
                by:sortBy,
                value:sortValue
            }
        });
        this.props.onSort(this.state.sort.by,this.state.sort.value);
    }
    render(){
        var {sort} = this.state;
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
                            <span className="fa fa-caret-square-o-down"></span>    
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li onClick={()=>this.onClick('name',1)} >
                                    <a href="./#" role="button" 
                                    className={(sort.by==='name' && sort.value===1)
                                    ? "sort_selected":""
                                     }>
                                                <span className="fas fa-sort-alpha-up pr-2">
                                                     
                                                </span>
                                            Tên A-Z                 
                                            </a>
                                </li>
                                <li onClick={()=>this.onClick('name',-1)}>
                                    <a href="./#"
                                    role="button"
                                    className={(sort.by==='name' && sort.value===-1)
                                    ? "sort_selected":""
                                     }
                                    >
                                                <span className="fas fa-sort-alpha-up-alt pr-2">
                                                   </span>
                                                Tên Z-A
    
                                            </a>
                                </li>
                                <li role="separator" className="divider"></li>
                                <li onClick={()=>this.onClick('status',1)}>
                                    <a href="./#" 
                                    role="button"
                                        className={(sort.by==='status' && sort.value===1)
                                    ? "sort_selected":""
                                     }
                                >Trạng Thái Kích Hoạt</a></li>
                                <li onClick={()=>this.onClick('status',-1)}><a 
                                href="./#"
                                role="button"
                                className={(sort.by==='status' && sort.value===-1)
                                    ? "sort_selected":""
                                     }
                                >Trạng Thái Ẩn</a></li>
                            </ul>
                        </div>
             </div>      );
    }
}
export default Sort;