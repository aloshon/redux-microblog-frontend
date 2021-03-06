import { combineReducers } from "redux";
import postReducer from './postReducer';
import titleReducer from './titleReducer';

const rootReducer = combineReducers({posts: postReducer, titles: titleReducer});

export default rootReducer;