import axios from "axios";
import { GET_ERRORS, GET_BOARD_POSTS, DELETE_BOARD_POST, GET_BOARD_POST } from "./types";

export const createBoardFoam = (board_foam, history) => async dispatch => {
    try {
        await axios.post("http://localhost:8081/board", board_foam);
        history.push("/");
        
    } catch (error) {
        dispatch({
            type : GET_ERRORS,
            payload : error.response.data
        });
    }

};

export const getBacklog = () => async dispatch => {
    const res = await axios.get("http://localhost:8081/board/all")
    dispatch({
        type:GET_BOARD_POSTS,
        payload: res.data
    })
}

export const deleteBoardPost = board_code => async dispatch =>{
    if(window.confirm("정말로 해당 게시물을 삭제하시겠습니까? 복구가 불가능합니다.")){
        await axios.delete('http://localhost:8081/board/'+board_code);
        dispatch({
            type: DELETE_BOARD_POST,
            payload: board_code
        });
    }
    
}

export const getBoardPost = (board_code, history) => async dispatch => {
    try {
        const res = await axios.get('http://localhost:8081/board/'+board_code);
        dispatch({
            type: GET_BOARD_POST,
            payload: res.data
        })
    } catch (error) {
        history.push("/");
    }
}