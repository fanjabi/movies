import React from 'react';
import { Col, Row } from 'react-bootstrap';

const MovieTitle = props => {
    const { active, movie, movieClickedHandler } = props;
    return <Row className={'movieTitle' + (active ? ' active' : '')} onClick={() => movieClickedHandler(movie.id)}>
        <Col md={3}>Episode {movie.fields.episode_id}</Col>
        <Col md={6}>{movie.fields.title}</Col>
        <Col md={3}>{movie.fields.release_date}</Col>
    </Row>
};

export default MovieTitle;