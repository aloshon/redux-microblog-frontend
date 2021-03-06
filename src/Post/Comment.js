import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {deleteComment} from '../actionCreators';
import "./PostDetails.css";
import {useDispatch} from 'react-redux';

const Comment = ({id, text, postId}) => {
    const dispatch = useDispatch()
    return (
        <div>
            <Container className="comment-container">
                <Card className="comment-details">
                    <Card.Body>
                        <Button 
                        variant="danger"
                        onClick={() => dispatch(deleteComment(postId, id))}
                        >X</Button>
                        <Card.Text>{text}</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Comment;