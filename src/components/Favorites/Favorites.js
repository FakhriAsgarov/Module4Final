import React, { Component } from 'react';
import './Favorites.css';
import {connect} from 'react-redux'
import { DEL_FAVORITE } from '../../redux/actions/actionTypes';

class Favorites extends Component {
    state = {
        title: 'Новый список',
        link: false,
        id: " ",
    }

    titleChangeHandler=(e)=>{
        this.setState({title:e.target.value});

    };
    post = (e) => {
        fetch(`https://acb-api.algoritmika.org/api/movies/list`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            "title": this.state.title,
            "movies": this.props.favouriteMovie
          }),
        })
          .then((res) => res.json())
          .then((data) => this.setState({id: data.id, link: true}));
      };
  
    render() { 
        const title=this.state.title
        return (
            <div className="favorites">
                <input value={title} type='text' className="favorites__name" onChange={this.titleChangeHandler}/>
                <ul className="favorites__list">
                    {this.props.favouriteMovie.map((item) => {
                        return <li key={item.imdbID}>{item.Title} ({item.Year})<button className='del_favorite' onClick={()=>this.props.deleteFavorites(item)}>X</button></li>;
                    })}
                </ul>
                <a href={`/list/${this.state.id}`} className={this.state.link ? "" : "hidden"}>
          {" "}
          {this.state.title}
        </a>
        <br></br>
        <br></br>
        <button
          type="button"
          className={this.state.link?'hidden':"favorites__save"}
          disabled={!this.state.title}
          onClick={this.post}
        >
          Сохранить список
        </button>
            </div>
        );
    }
}
 
const mapStateToProps=(state)=>{
    return {favouriteMovie:state.favouriteMovie}
}

const mapDispatchToProps=(dispatch)=>{
    return {
        deleteFavorites: (movie)=>dispatch({type:DEL_FAVORITE,payload:movie})
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Favorites);