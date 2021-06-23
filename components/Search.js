import React, { Component } from 'react';
import Select from 'react-select';

export default class Search extends Component {

    state = {
        types: [],
    }

    async componentDidMount() {
       const res =  await fetch('https://raw.githubusercontent.com/filipekiss/pokemon-type-chart/master/types.json');
       const data = await res.json();
    
       //Loop to add types to the state
       data.forEach(type => {
        const tp = {value: type.name, label: type.name};
        this.setState({
            types: [...this.state.types, tp]
            });
       })
    }

    nameSearch = event => {
        this.props.callbackName(event.target.value);
    }

    typeSearch = event => {
        const res = [];
        event.forEach(d => {
            res.push(d.value)
        })
        this.props.callbackType(res);
    }

    weakSearch = event => {
        const res = [];
        event.forEach(d => {
            res.push(d.value)
        })
        this.props.callbackWeak(res);
    }

    render() {

        return(
            <div className="row">
                <form id="filterForm" className="col s12 m12 l12">
                    <div className="card">
                        <div className="card-content">
                            <div className="col s12 m4 l4">
                                <label>Search by Name</label>
                                <input placeholder="Search..." onChange={this.nameSearch} type="text"/>
                                
                            </div>
                            <div className="col s6 m4 l4">
                                <label>Filter by Type</label>
                                <Select options={this.state.types} isMulti={true} onChange={this.typeSearch} />
                            </div>
                            <div className="col s6 m4 l4">
                                <label>Filter by Weaknesses</label>
                                <Select options={this.state.types} isMulti={true} onChange={this.weakSearch}/>
                            </div>
                        </div>
                        
                    </div>
                
                </form>
            </div>
        )
    }

}