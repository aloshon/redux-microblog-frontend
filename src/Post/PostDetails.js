import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useFields from '../useFields';
import "./PostDetails.css";
import {useSelector, useDispatch} from 'react-redux';
import Comment from './Comment';
import {fetchPost, addComment, deletePost, addVote} from '../actionCreators';
import PostForm from "./PostForm";
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const PostDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isEditing, setIsEditing] = useState(false);
 
    const [formData, handleChange, resetFormData] = useFields({
        text: ''
    });

    const post = useSelector(state => state.posts[id]);

    useEffect(() => {
        async function getPostOnRender(){
            dispatch(fetchPost(id))
        }
        // Make sure the state is filled with the correct data
        if(!post || post.title === undefined){
            getPostOnRender()
        }
    }, [dispatch, id, post]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.text){
            alert('ERROR: Comments cannot be empty!');
            return
        }
        
        dispatch(addComment({...formData, postId: id}));
        resetFormData();
    }

    // Delete post and send user to homepage when delete button is clicked
    const removePost = () => {
        dispatch(deletePost(id));
        history.push('/');
    }

    // Display loading screen while waiting for post
    if(!post || post.title === undefined){
        return <h1>Loading...</h1>
    }

    // Return the post form with the inputs prefilled with post details
    if(isEditing){
        return <PostForm post={post}/>
    }

    const {title, description, body, comments, votes} = post;

    return (
        <>
        <Container className="post-container">
            <Card className="post-details">
                <Card.Body>
                    <Button variant="danger" onClick={() => removePost()}>Delete</Button>
                    <Button variant="primary" onClick={() => setIsEditing(true)}>Edit</Button>
                    <div className="votes-stats">
                        <small>{votes}</small>
                        <Button variant="danger" onClick={() => dispatch(addVote('down', id))}><FaThumbsDown /></Button>
                        <Button variant="success" onClick={() => dispatch(addVote('up', id))}><FaThumbsUp /></Button>
                    </div>
                    <Card.Title as="h3">{title}</Card.Title>
                    
                    <Card.Text><i>{description}</i></Card.Text>
                    <Card.Text>{body}</Card.Text>
                </Card.Body>
            </Card>
            <h1>Comments</h1>
            {comments.length !== 0 && comments.map(c => (
                <Comment 
                key={c.id}
                id={c.id}
                text={c.text}
                // This id is taken from params, so it is the post id
                postId={id}
                />
            )) || <h3>No Comments yet...</h3>}

        </Container>
        <Container className="comment-form">
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control 
                name="text"
                type="text" 
                value={formData.text}
                onChange={handleChange} 
                placeholder="Add Comment" />
            </Form.Group>
            <Button variant="primary" type="submit" >
                Add
            </Button>
        </Form>
    </Container>
    </>
    )
}
export default PostDetails;