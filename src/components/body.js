import React, { Component } from 'react';
import Search from './search.js';
import Table from './table.js';
import axios from 'axios';
let employeeArray;

export default class Body extends Component {

    state = {
        search: '',
        results: [],
        ascending: false
    };

    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=100&exc=gender,location,login,cell,id,nat,registered')
            .then(response => {
                // handle success
                employeeArray = response.data.results.map(emp => {
                    // Make the dob readable
                    var rawDate = emp.dob.date;
                    var date = new Date(rawDate);
                    var birthday = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
                    // Return only the fields needed
                    return {
                        image: emp.picture.medium,
                        name: `${emp.name.first} ${emp.name.last}`,
                        phone: emp.phone,
                        email: emp.email,
                        dob: birthday,
                        age: emp.dob.age
                    }
                });

                this.setState({ results: employeeArray })
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    sortBy = key => {
        if (this.state.ascending === true) {
            const sortedB = this.state.results.sort((a, b) => a[key] < b[key] ? 1 : -1);

            this.setState({
                results: sortedB,
                ascending: false
            });
        } else {
            const sortedA = this.state.results.sort((a, b) => a[key] > b[key] ? 1 : -1);

            this.setState({
                results: sortedA,
                ascending: true
            });
        }

    }

    handleChange = event => {
        const keyword = event.target.value;
        const filtered = employeeArray.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword)));

        this.setState({
            search: event.target.value,
            results: filtered
        });
    }

    render() {
        return (
            <div>
                <Search search={this.state.search} handleChange={this.handleChange} />
                <Table results={this.state.results} sortBy={this.sortBy} />
            </div>
        )
    }
}
