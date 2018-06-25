import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import MovieTitle from './MovieTitle';
import MovieInfo from './MovieInfo';
import SearchAndSort from './SearchAndSort';
import './App.css';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            movies: [],
            allMovies: [],
            movieInfoId: -1,
            sortBy: '',
            sortByReverse: 1
        }
        
        this.movieClickedHandler = this.movieClickedHandler.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
        this.sortHandler = this.sortHandler.bind(this);
        this.sortReverseHandler = this.sortReverseHandler.bind(this);
    }

    componentDidMount(){
    	this.fetchData();
    }

    fetchData(){
        this.setState({
            isLoading: true
        })

        fetch('https://star-wars-api.herokuapp.com/films')
        .then(response => response.json())
        .then(movies => this.setState({
            movies,
            isLoading: false,
            allMovies: movies
        }))
        .catch(error => console.log('loading error', error))
    }

    filterHandler(event) {
        let newMoviesArray = this.state.allMovies.filter( movie => movie.fields.title.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1 );
        this.setState({
            movies: newMoviesArray
        });
        this.sortList(null, null, newMoviesArray);
        newMoviesArray.some( movie => movie.id === this.state.movieInfoId ) || this.setState({
            movieInfoId: -1
        });
    }

    movieClickedHandler(movieId) {
        let clickedMoviesArr = this.state.movies.filter(movie => movie.id === movieId);
        if(clickedMoviesArr.length !== 1) {
            return;
        }
        let clickedMovie = clickedMoviesArr.pop();
        this.setState({
            movieInfoId: clickedMovie.id
        });
    }

    sortHandler(sortBy) {
        this.setState({
            sortBy
        });

        this.sortList(sortBy);
    }

    sortList(sortBy, reverse, movies) {
        sortBy = sortBy || this.state.sortBy;
        reverse = reverse || this.state.sortByReverse;
        movies = movies || this.state.movies;

        this.setState({
            movies: movies.sort( (a, b) => {
                switch(sortBy) {
                    case 'episode':
                        return reverse * ( a.fields.episode_id > b.fields.episode_id ? 1 : -1 );
                    case 'year':
                        return reverse * ( a.fields.release_date > b.fields.release_date ? 1 : -1 );
                    default:
                        return -1 * reverse;
                }
            })
        });
    }

    sortReverseHandler(event) {
        this.setState({
            sortByReverse: event.target.checked ? -1 : 1
        });
        this.sortList(null, this.state.sortBy ? ( event.target.checked ? -1 : 1 ) : -1);
    }

    getCurrentInfoMovie() {
        let tempArr = this.state.movies.filter( movie => movie.id === this.state.movieInfoId);

        return tempArr.length === 1 ? tempArr[0] : {};
    }

    render() {
        const {isLoading, movies} = this.state;
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <SearchAndSort filterHandler={this.filterHandler} sortHandler={this.sortHandler} sortReverseHandler={this.sortReverseHandler} sortBy={this.state.sortBy} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                        {
                            isLoading
                                ? 'Loading movies...'
                                : movies.length > 0
                                    ? movies.map( movie => (
                                        <MovieTitle  key={movie.id} active={this.state.movieInfoId===movie.id} movie={movie} movieClickedHandler={this.movieClickedHandler} />
                                    ))
                                    : 'No Movies to show :('
                        }
                        </Col>
                        <Col xs={6}>
                            { this.state.movieInfoId !== -1 ? <MovieInfo movie={this.getCurrentInfoMovie()} /> : 'Please select a movie' }
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default App;