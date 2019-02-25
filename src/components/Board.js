import React, { Component } from 'react';
import {Link} from "react-router-dom";
import BoardPost from './boardfoam/BoardPost';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getBacklog} from "../actions/boardFoamActions";

class Board extends Component {

    componentDidMount(){
        this.props.getBacklog();
    }
    
    render() { 
        const {board_posts} = this.props.board_posts;
        let BoardContent; 
        let todoItems = [];
        let progressItems = [];
        let doneItems = [];
        
        const BoardAlgorithm = board_posts => {
            if(board_posts.length < 1){
                return (
                   <div className="alert alert-info text-center">
                        게시물이 존재하지 않습니다.
                   </div>
                );
            }else{
                const posts = board_posts.map(board_post => (
                    <BoardPost key={board_post.boardCode} board_post={board_post}/>
                ));

                for(let i = 0; i < posts.length; i++){

                    if(posts[i].props.board_post.status==="TODO"){
                        todoItems.push(posts[i]);
                    }

                    if(posts[i].props.board_post.status==="PROGRESS"){
                        progressItems.push(posts[i]);
                    }

                    if(posts[i].props.board_post.status==="DONE"){
                        doneItems.push(posts[i]);
                    }

                }

                return (
                    <React.Fragment>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-secondary text-white">
                                            <h3>예정 업무</h3>
                                        </div>
                                    </div>

                                    {todoItems}
                                    
                                </div>


                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-primary text-white">
                                            <h3>진행중</h3>
                                        </div>
                                    </div>
                                    {progressItems}
                                </div>
                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-success text-white">
                                            <h3>완료</h3>
                                        </div>
                                    </div>
                                    {doneItems}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            }
        };

        BoardContent = BoardAlgorithm(board_posts);

        return (
            <div className="container">
                <Link to="/createBoardFoam" className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> 게시판 생성 </i>
                </Link>
                <br />
                <hr />
                {BoardContent}
            </div>
        );
  }
}

Board.propTypes = {
    getBacklog : PropTypes.func.isRequired,
    board_posts : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    board_posts : state.board_post
});

export default connect(mapStateToProps, {getBacklog})(Board);