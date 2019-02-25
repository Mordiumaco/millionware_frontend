import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteBoardPost} from "../../actions/boardFoamActions";

class BoardPost extends Component {

    onDeleteClick(board_code){
        this.props.deleteBoardPost(board_code);
    }

     render() {

        const { board_post } = this.props;

        return (
            <div className="card mb-1 bg-light">

                <div className="card-header text-primary">
                    작성자 : {board_post.writer}
                    <br/>
                    작성일 : {board_post.boardDate.substr(0,10)}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{board_post.title}</h5>
                    <p className="card-text text-truncate ">
                        {board_post.content}
                    </p>
                    <Link to={`/updateBoardFoam/${board_post.boardCode}`} className="btn btn-primary">
                        조회/수정
                    </Link>

                    <button className="btn btn-danger ml-4" onClick={this.onDeleteClick.bind(this, board_post.boardCode)}>
                        삭제
                    </button>
                </div>
            </div>
        );
    }
}

BoardPost.propTypes = {
    deleteBoardPost: PropTypes.func.isRequired
};

export default connect(null, {deleteBoardPost}) (BoardPost);