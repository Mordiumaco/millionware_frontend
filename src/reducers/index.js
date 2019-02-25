import {combineReducers} from "redux";
import errorsReducer from "./errorsReducer";
import boardPostReducer from "./boardPostReducer";

export default combineReducers({
    
    errors: errorsReducer,
    board_post: boardPostReducer
});