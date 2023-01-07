import React from "react";
import './style.css'

import data from '../mockData';


class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: data,
            selected: 'name',
            name: '',
            status: '',
            age: '',
            active: null
        }
    }
    render() {
        // DELETE
        const onDelete = (id) => {
            let deleted = this.state.todos.filter((value) => value.id !== id)
            this.setState({ todos: deleted })
        }
        // SEARCH
        const onSeach = (event) => {
            let searched = data.filter((value) => value[this.state.selected].toLowerCase().includes(event.target.value.toLowerCase()))
            this.setState({ todos: searched })
        }
        // SELECT
        const onSelect = (e) => {
            this.setState({ selected: e.target.value })
        }

        const onChang = (e) => {
            // console.log(e.target.name);
            const { value, name } = e.target;
            this.setState({ [name]: value })
        }
        // ADD
        const onAdd = (e) => {
            let newItem = { id: this.state.todos.length + 1, name: [this.state.name ? this.state.name : 'unknown'], status: [this.state.status ? this.state.status : 'unknown'], age: [this.state.age ? this.state.age : 'unknown'] }
            // console.log(newItem);
            this.setState({ todos: [...this.state.todos, newItem], name: '', status: '', age: '' })

        }
        // EDIT
        const onEdit = ({ id, name, status, age }, isSave) => {
            if (isSave) {
                let res = this.state.todos.map((value) => value.id === this.state.active.id ? { ...value, name: this.state.name,status:this.state.status,age:this.state.age } : value)
                this.setState({ active: null ,todos:res})

            } else {
                this.setState({
                    name: name, status: status, age: age,
                    active: { id, name, status, age }
                })

            }
        }
        return (
            <div>
                <input onChange={onSeach} type="text" id="myInput" placeholder="Search for names.." />
                <select onChange={onSelect} defaultValue={this.state.selected} name="" id="mySelect">
                    <option value="id">Id</option>
                    <option value="name">Name</option>
                    <option value="status">Status</option>
                    <option value="age">Age</option>
                </select>
                <table id="myTable">
                    <thead>
                        <tr>
                            <th >ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Age</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.todos.map(({ id, name, status, age }) => {
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    {/* <td>{name}</td> */}
                                    <td>{this.state.active?.id === id ? <input onChange={onChang} name="name" value={this.state.name} type={'text'} /> : name}</td>
                                    <td>{this.state.active?.id === id ? <input onChange={onChang} name="status" value={this.state.status} type={'text'} /> : status}</td>
                                    <td>{this.state.active?.id === id ? <input onChange={onChang} name="age" value={this.state.age} type={'text'} /> : age}</td>
                                    <td><button id="btn" onClick={() => onDelete(id)}>Delete</button></td>
                                    <td><button id="btn" onClick={() => onEdit({ id, name, status, age }, this.state.active?.id === id)}>{this.state.active?.id === id ? 'Save' : 'Edit'}</button></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                <div>
                    <input value={this.state.name} onChange={onChang} type="text" name="name" id="Input" placeholder="Enter name..." />
                    <input value={this.state.status} onChange={onChang} type="text" name="status" id="Input" placeholder="Enter color..." />
                    <input value={this.state.age} onChange={onChang} type="text" name="age" id="Input" placeholder="Enter color..." />
                    <button onClick={onAdd} id="Add">Add</button>
                </div>
            </div>
        );
    }
}

export default ToDo