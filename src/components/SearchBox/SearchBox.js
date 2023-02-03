import React, { Component } from 'react';
import './SearchBox.css';
import {connect} from 'react-redux'
import { SEARCH_MOVIE } from '../../redux/actions/actionTypes';

class SearchBox extends Component {
    state = {
        searchLine: ''
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        fetch(`http://www.omdbapi.com/?s=${this.state.searchLine}&apikey=564c735a`)
        .then(response=>response.json())
        .then(data=> this.props.searchMovie(data.Search))
    }
    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
const mapStateToProps= (state)=>{
return {movies:state.movies}
}
const mapDispatchToProps= (dispatch)=>{
    return {searchMovie:(movies)=>{
        dispatch({type:SEARCH_MOVIE,payload:movies})
    }
    }
    }
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);