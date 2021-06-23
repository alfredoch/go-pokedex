import React, { Component } from 'react';

//
import Search from './Search';

export default class Pokedex extends Component {

    state = {
        pokedex: [], //This array contains the whole pokedex data
        searchName: '',
        searchType: [],
        searchWeak: []
    }

    async componentDidMount() {
       const res =  await fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
       const data = await res.json();
       this.setState({pokedex: data.pokemon});
    }

    getPokemonByName = (name) => {
        this.setState({searchName: name.toLowerCase()});
    }

    getPokemonByType = (type) => {
        this.setState({searchType: type});
    }

    getPokemonByWeak = (type) => {
        this.setState({searchWeak: type});
    }

    showRow(pokemon) {

        var showN = false;
        var showT = false;
        var showW = false;

        const pokename = pokemon.name.toLowerCase();
        if(this.state.searchName !== '')
            if(pokename.search(this.state.searchName.toLowerCase()) !== -1)
                showN = true;
                else showN = false;
            else showN = true;

        if(this.state.searchType.length >= 1)
            if(this.state.searchType.every(p => pokemon.type.includes(p)))
                showT = true;
            else showT = false;
        else showT = true;

        if(this.state.searchWeak.length >= 1)
            if(this.state.searchWeak.every(p => pokemon.weaknesses.includes(p)))
                showW = true;
            else showW = false;
        else showW = true;

        if(showN && showT && showW)
        return <PokemonRow key={pokemon.id} pokedata={pokemon}></PokemonRow>
        
        
    }

    render() {

        return (
            <div>
                <Search callbackName={this.getPokemonByName} callbackType={this.getPokemonByType} callbackWeak={this.getPokemonByWeak}></Search>
                
                <div id="div1" className="row table-row">
                    <div className="col s12 m12 l12">
                        <div className="card table-header">
                            <div className="card-content">
                                <div className="col s2 text-left">Dex Entry</div>
                                <div className="col s3 text-left">Name</div>
                                <div className="col s3 text-center">Type</div>
                                <div className="col s4 text-center">Weaknesses</div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                        this.state.pokedex.map(pokemon => {
                            return this.showRow(pokemon);
                    })
                }
                    
            </div>
        )
            
    }
}

//This class contains the component that displays each row of the pokedex table with the pokemon information
class PokemonRow extends Component {

    render() {
        return (

            <div className="row table-row">
                    <div className="col s12 m12 l12">
                        <div className="card pokedexItem hoverable">
                            <div className="card-content">
                                <div className="col s1 m1 l1pokenumber">{this.props.pokedata.num}</div>
                                <div className="col hide-on-small-only m1 l1 text-center"><img className={"pokemonIcon"} src={this.props.pokedata.img} alt={this.props.pokedata.name}/></div>
                                <div className="col s3 m3 l3 pokename">{this.props.pokedata.name}</div>
                                <div className="col s4 m3 l3 typeList">
                                {
                                    this.props.pokedata.type.map(type => {
                                    return <Type key={this.props.pokedata.num + type} typeName={type}></Type>
                                    //For a simpler way to display the types you can use this.props.pokedata.type.join(', ')
                                })
                                }</div>
                                <div className="col s4 typeList weaknesses">
                                {
                                    this.props.pokedata.weaknesses.map(type => {
                                        return <Type key={this.props.pokedata.num + type} typeName={type}></Type>
                                    })
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

//This class contains the component to display pokemon types in the table
class Type extends Component {

    render() {
        return(
            <span className={"type " + this.props.typeName}>
                {this.props.typeName}
            </span>
        )
    }

}