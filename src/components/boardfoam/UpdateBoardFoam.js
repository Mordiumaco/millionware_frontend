import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {getBoardPost, createBoardFoam} from "../../actions/boardFoamActions";

class UpdateBoardFoam extends Component {

    constructor(){
        super();
        this.state = {
            title:""
            ,content:""
            ,writer:""
            ,status:""
            ,errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }

        const { boardCode, status , title, writer, content} = nextProps.board_post;

        this.setState({
            boardCode, status , title, writer, content 
        });
    }
    
    componentDidMount(){
        const {board_code} = this.props.match.params;
        this.props.getBoardPost(board_code);
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        const boardFoam = {
            boardCode: this.state.boardCode,
            title : this.state.title,
            writer : this.state.writer,
            content : this.state.content,
            status : this.state.status
        };

        //console.log(boardFoam);
        this.props.createBoardFoam(boardFoam, this.props.history);
    }

    render() {
        const { errors } = this.state;
    return (

        
        <div className="addProjectTask">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to="/" className="btn btn-light">
                        뒤로 가기
                    </Link>
                    <h4 className="display-4 text-center">조회 및 수정</h4>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="text" className={classnames("form-control form-control-lg",{ "is-invalid" : errors.title })} name="title" placeholder="제목을 입력하세요" value={this.state.title} onChange={this.onChange}/>
                            {
                                errors.title && (
                                    <div className="invalid-feedback">{errors.title}</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <input type="text" className={classnames("form-control form-control-lg",{ "is-invalid" : errors.writer})} name="writer" placeholder="작성자를 입력하세요" value={this.state.writer} onChange={this.onChange}/>
                            {
                                errors.writer && (
                                    <div className="invalid-feedback">{errors.writer}</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <textarea className={classnames("form-control form-control-lg", { "is-invalid" : errors.content})} placeholder="내용을 입력하세요" name="content" value={this.state.content} onChange={this.onChange}></textarea>
                            {
                                errors.content && (
                                    <div className="invalid-feedback">{errors.content}</div>
                                )
                            }
                        </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" name="status" value={this.state.status} onChange={this.onChange}>
                                <option value="TODO">예정 업무</option>
                                <option value="PROGRESS">진행 중</option>
                                <option value="DONE">완료</option>
                            </select>
                        </div>
                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

UpdateBoardFoam.propTypes = {
    board_post : PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getBoardPost: PropTypes.func.isRequired,
    createBoardFoam : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    board_post : state.board_post.board_post,
    errors: state.errors
});

export default connect(mapStateToProps, {getBoardPost, createBoardFoam})(UpdateBoardFoam);