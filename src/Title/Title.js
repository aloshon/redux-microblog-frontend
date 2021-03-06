import React from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {NavLink} from "react-router-dom";
import './Title.css';
import {addVote} from "../actionCreators";
import {useDispatch} from "react-redux";

const Title = ({id, title, description, votes}) => {
    const dispatch = useDispatch();
    
    return(
        <li className="title">
            <Container fluid>
                <Card className="title-card">
                <div className="votes-stats">
                    <small>{votes}</small>
                    <Button variant="success" onClick={() => dispatch(addVote('up', id))}><FaThumbsUp /></Button>
                    <Button variant="danger" onClick={() => dispatch(addVote('down', id))}><FaThumbsDown /></Button>
                </div>
                    <Card.Body>
                        <NavLink exact to={`/post/${id}`}>
                            <Card.Title as="h6" className="titl">{title}</Card.Title><br/>
                        </NavLink>
                        <Card.Text as="h6"><i>{description}</i></Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </li>
    )
}
export default Title;