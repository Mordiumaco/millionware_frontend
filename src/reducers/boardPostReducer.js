import {GET_BOARD_POSTS, DELETE_BOARD_POST, GET_BOARD_POST} from "../actions/types";

const initialState = { 
    board_posts : [],
    board_post: {}
};

export default function(state=initialState, action){
    switch(action.type){
        
        case GET_BOARD_POSTS:
            return {
                ...state,
                board_posts : action.payload
            };

        case GET_BOARD_POST:
            return {
                ...state,
                board_post: action.payload
            }
        
        case DELETE_BOARD_POST:
            return {
                ...state,
                board_posts: state.board_posts.filter(
                    board_post => board_post.boardCode !== action.payload
                )
            };
        default:
            return state;
    }
}