import { FETCH_POST, ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT, ADD_VOTE } from "../actionTypes";

const INITIAL_STATE = {};

export default function postReducer(state=INITIAL_STATE, action){
    switch(action.type){
        // Wrap some action.types with {} so we can reuse the same variable names
        case FETCH_POST:{
            return { ...state, [action.payload.id]: action.payload };
        }
        case ADD_POST:{
            // set the comments on the new post to an empty array
            action.payload.comments = [];

            return {...state, [action.payload.id]: action.payload}
        }
        case ADD_COMMENT:{
            const post = state[action.payload.postId];
            
            return {...state, [action.payload.postId]:
            {...post, comments: [...post.comments, action.payload.comment]}}
        };
        case EDIT_POST:
            state[action.payload.id] = {
                title: action.payload.title, 
                description: action.payload.description, 
                body: action.payload.body,
                comments: state[action.payload.id].comments}
            return {...state}
        case DELETE_POST:{
            if(!state[action.payload]) return state;
            delete state[action.payload];
            return {...state}
        }
        case DELETE_COMMENT:
            const post = state[action.payload.postId];
            const newCopy = post.comments.filter(c => c.id !== action.payload.commentId);
           
            return {...state, [action.payload.postId]:
            {...post, comments: newCopy}}
        case ADD_VOTE:
           
            return {...state, [action.payload.id]:
                {...state[action.payload.id], votes: action.payload.vote}};
        default:
            return state;
    }
}