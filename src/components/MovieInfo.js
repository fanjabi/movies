import React from 'react';

const MovieInfo = props => {
    const { movie } = props;
    return <div>
        <h2>{movie.fields.title}</h2>
        <p>{movie.fields.opening_crawl}</p>
        <h5>Directed by: {movie.fields.director}</h5>
    </div>
};

export default MovieInfo;