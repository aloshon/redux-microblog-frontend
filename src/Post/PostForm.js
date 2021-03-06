import React from "react";
import {useDispatch} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./PostForm.css";
import {useHistory, useParams} from "react-router-dom";
import useFields from '../useFields';
import { addPost, editPost } from "../actionCreators";

const PostForm = ({post}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {id} = useParams();

    let INITIAL_STATE = {
        title: '',
        description: '',
        body: ''
    }

    // Check if post is defined, if true,
    // set initial state to be post details
    if(post){
        INITIAL_STATE = {
            title: post.title,
            description: post.description,
            body: post.body
        }
    }

    const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

    // Check if title or body is empty, if not add post to reducers
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.title || !formData.description){
            alert('ERROR: Title and Description are not allowed to be empty!');
            return
        }
        // dispatch editPost if post is defined and set id in formData
        // then redirect back to post details
        if(post){
            dispatch(editPost({...formData, id: id}));
            history.push(`/`);
            return
        }
        dispatch(addPost(formData));
        resetFormData();
        history.push(`/`);
    }

    // Change title accordingly, if post is defined, then we can assume
    // it is a PUT request, and title is "Edit Post"
    return (
        <Container className="postform">
            <h1>{post && "Edit Post" || "New Post"}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control name="title" type="text" value={formData.title} onChange={handleChange} placeholder="Title" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control name="description" type="text" value={formData.description} onChange={handleChange} placeholder="Description" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Body:</Form.Label>
                    <Form.Control name="body" as="textarea" value={formData.body} onChange={handleChange} rows={5} />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
                <Button variant="secondary" type="submit" onClick={() => history.push('/')}>
                    Cancel
                </Button>
            </Form>
        </Container>
    )
}

export default PostForm;