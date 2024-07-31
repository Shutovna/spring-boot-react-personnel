import {Component} from "react";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";
import "./app.css"

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "Nikita S.", salary: 50000, increase: true, rise: false, id: 1},
                {name: "Petya P.", salary: 500, increase: false, rise: true, id: 2},
                {name: "Evgeniy S.", salary: 1000, increase: false, rise: false, id: 4},
                {name: "Alexey K.", salary: 3400, increase: true, rise: true, id: 10}
            ],
            term: "",
            filter: "all"
        };
        this.maxId = 11
    }

    deleteItem = (id) => {
        console.log(id);
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        });
    }

    addItem = (name, salary) => {
        const newItem = {
            id: this.maxId++,
            name: name,
            salary: salary,
            increase: false,
            rise: false

        }

        this.setState(({data}) => ({
            data: [...data, newItem]
        }));
    }

    onToggleProp = (id, prop) => {
        console.log("Increase this " + id);

        this.setState(({data}) => ({
            data: data.map(item => {
                    if (item.id === id) {
                        return {...item, [prop]: !item[prop]};
                    }
                    return item;
                }
            )
        }))
    }

    getNumberOfEmployees = () => {
        return this.state.data.length;
    }

    getNumberOfIncreased = () => {
        return this.state.data.filter(item => item.increase).length;
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }


    onUpdateSearch = (term) => {
        console.log("onUpdateSearch " + term);
        this.setState({term});
    }

    filter = (items, filter) => {
        switch (filter) {
            case "rise": {
                return items.filter(item => item.rise)
            }
            case "salary": {
                return items.filter(item => item.salary > 1000);
            }
        }

        return items;
    }

    onFilterSelect = (filter) => {
        this.setState({
            filter
        })
    }

    render() {
        const {data, term, filter} = this.state;
        const visibleData = this.searchEmp(this.filter(data, filter), term);

        return (
            <div className="app">
                <AppInfo
                    numberOfEmployees={this.getNumberOfEmployees()}
                    numberOfIncreased={this.getNumberOfIncreased()}
                />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter  filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />

                <EmployeesAddForm
                    onAdd={this.addItem}
                />
            </div>
        );
    }
}

export default App;