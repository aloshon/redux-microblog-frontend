import axios from 'axios';
import {FETCH_TITLES, FETCH_POST, ADD_COMMENT, ADD_POST, DELETE_COMMENT, DELETE_POST, EDIT_POST, ADD_VOTE} from './actionTypes';

const API_URL = 'http://localhost:5000/api/posts';

export function fetchTitles(){
    return async function(dispatch){
        try{
            const {data} = await axios.get(API_URL);
            dispatch(gotTitles(data));
        } catch(e){
            console.log(e)
            alert('Error getting titles! Please try again later')
        }
    }
}

function gotTitles(titles){
    return {
        type: FETCH_TITLES,
        payload: titles
    }
}

export function fetchPost(id){
    return async function(dispatch){
        try{
            const {data} = await axios.get(`${API_URL}/${id}`);
            dispatch(gotPost(data))
        } catch(e){
            console.log(e)
            alert('Error getting post! Please try again later')
        }
    }
}

function gotPost(post){
    return {
        type: FETCH_POST,
        payload: post
    }
}

export function addPost(post){
    return async function(dispatch){
        try{
            const {title, description, body} = post;
            const {data} = await axios.post(`${API_URL}/`, {
                title,
                description,
                body
            });
            dispatch(sentPost(data))
        } catch(e){
            console.log(e)
            alert('Error adding post! Please try again later')
        }
    }
}

function sentPost(post){
    return {
        type: ADD_POST,
        payload: post
    }
}

export function editPost(post){
    return async function(dispatch){
        try{
            const {id, title, description, body} = post;
            const {data} = await axios.put(`${API_URL}/${id}`, {
                title,
                description,
                body
            });
            dispatch(changedPost(data))
        } catch(e){
            console.log(e)
            alert('Error editing post! Please try again later')
        }
    }
}

function changedPost(post){
    return {
        type: EDIT_POST,
        payload: post
    }
}

export function deletePost(id){
    return async function(dispatch){
        try{
            await axios.delete(`${API_URL}/${id}`);
            dispatch(deletedPost(id))
        } catch(e){
            console.log(e)
            alert('Error deleting post! Please try again later')
        }
    }
}

function deletedPost(id){
    return {
        type: DELETE_POST,
        payload: id
    }
}

export function addComment({text, postId}){
    return async function(dispatch){
        try{
            const {data} = await axios.post(`${API_URL}/${postId}/comments/`, {text});
            dispatch(sentComment(postId, data))
        } catch(e){
            console.log(e)
            alert('Error posting comment! Please try again later')
        }
    }
}

function sentComment(postId, comment){
    return {
        type: ADD_COMMENT,
        payload: {postId, comment}
    }
}

export function deleteComment(postId, id){
    return async function(dispatch){
        try{
            await axios.delete(`${API_URL}/${postId}/comments/${id}`);

            dispatch(deletedComment(postId, id))
        } catch(e){
            console.log(e)
            alert('Error deleting comment! Please try again later')
        }
    }
}

function deletedComment(postId, commentId){
    return {
        type: DELETE_COMMENT,
        payload: {postId, commentId}
    }
}


export function addVote(vote, id){
    return async function(dispatch){
        try{
            const {data} = await axios.post(`${API_URL}/${id}/vote/${vote}`);
            dispatch(sentVote(data.votes, id));
        } catch(e){
            console.log(e)
            alert('Error casting vote! Please try again later')
        }
    }
}

function sentVote(vote, id){
    return {
        type: ADD_VOTE,
        payload: {vote, id}
    }
}