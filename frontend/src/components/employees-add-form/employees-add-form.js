import {Component} from "react";
//import "./employees-add-form.css"
import "./employee-add-form.scss"

class EmployeesAddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            salary: ""
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {name, salary} = this.state;
        if (name && name.length > 3 && salary && salary >= 0) {
            this.props.onAdd(name, salary);
            this.setState({
                name: "",
                salary: ""
                }
            )
        }
    }

    render() {
        const {name, salary} = this.state;


        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form onSubmit={this.onSubmit}
                      className="add-form d-flex">
                    <input type="text"
                           name={"name"}
                           value={name}
                           className="form-control new-post-label"
                           placeholder="Как его зовут?"
                           onChange={this.onValueChange}/>
                    <input type="number"
                           name={"salary"}
                           value={salary}
                           className="form-control new-post-label"
                           placeholder="З/П в $?"
                           onChange={this.onValueChange}/>

                    <button type="submit"
                            className="btn btn-outline-light">Добавить
                    </button>
                </form>
            </div>

        );
    }
}

export default EmployeesAddForm;