import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {createBoardFoam} from "../../actions/boardFoamActions"
import classnames from "classnames"

class CreateBoardFoam extends Component {

    constructor(){
        super();
        this.state = {
            title:""
            ,content:""
            ,writer:""
            ,status:""
            ,errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        const boardFoam = {
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
                        <h4 className="display-4 text-center">새 게시물 작성</h4>
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

CreateBoardFoam.propTypes = {
    createBoardFoam: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {createBoardFoam}) (CreateBoardFoam);