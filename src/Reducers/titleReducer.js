import { FETCH_TITLES, ADD_VOTE } from "../actionTypes";

const INITIAL_STATE = [];

function sortByVote(titles) {
    return titles.sort((a, b) => b.votes - a.votes);
}

export default function titleReducer(state=INITIAL_STATE, action){
    switch (action.type) {
        case FETCH_TITLES:
          return sortByVote([...action.payload]);
      
        case ADD_VOTE:
          return sortByVote(state.map(
            t => t.id === action.payload.id ? 
            { ...t, votes: action.payload.vote } : t));

        default:
            return state;
    }
}