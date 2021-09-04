import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as metaActions from 'state/meta';
import { css } from '@emotion/core';
import { button } from 'theme';

const containerStyles = css`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
form {
  width: 24em;
  display: flex;
  flex-direction: row;
}
`;

class FrontInternal extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.authenticateFromLocalStorage();
  }
  componentDidUpdate() {
    if (this.props.meta.jwt) this.props.history.push('/matches');
  }
  login = (event) => {
    event.preventDefault();
    this.props.login(event.target[0].value);
  }
  render() {
    return (
      <div css={containerStyles}>
        <form onSubmit={event => this.login(event)}>
          <input type="password" placeholder="Enter password" css={css`margin-right: 0.5em;`} />
          <input type="submit" value="Sign in" css={css(button)} />
        </form>
      </div>
    );
  }
}

export default connect(state => ({
  meta: state.meta,
}), dispatch => ({
  authenticateFromLocalStorage: () => dispatch(metaActions.authenticateFromLocalStorage()),
  login: password => dispatch(metaActions.login(password)),
}))(withRouter(FrontInternal));
