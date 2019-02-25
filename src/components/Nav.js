import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
            <Link to="/" className="navbar-brand">
                밀리언 웨어 게시판
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon" />
            </button>
        </div>
        </nav>
    )
  }
}

