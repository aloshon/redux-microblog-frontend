import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {NavLink} from "react-router-dom";
import './Nav.css';

const Nav = () => {
    return (
        <Container fluid>
            <Card style={{backgroundColor: '#ddd'}}>
                <Card.Body>
                    <Card.Title as="h1" className="nav-title">Microblog</Card.Title>
                    <Card.Text as="h5">
                    Get in the Rithm of blogging!
                    </Card.Text>
                    <NavLink exact to="/">
                        <Button variant="link" className="blog-button">Blog</Button>
                    </NavLink>
                    <NavLink exact to="/new">
                        <Button variant="link" className="new-post-button">Add a new post</Button>
                    </NavLink>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Nav;