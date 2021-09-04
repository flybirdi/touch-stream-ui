import React, { Component } from 'react';
import { css } from '@emotion/core';
import Clipboard from 'clipboard';
import { button } from 'theme';
import ClipboardSVG from './clipboard.svg';

export class CopyableTextbox extends Component {
  constructor(props) {
    super(props);
    this.textbox = React.createRef();
    this.button = React.createRef();
    this.state = {
      status: null,
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.button.current, {
      text: () => this.props.text,
    });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  selectTextbox = () => {
    this.textbox.current.select();
    this.setState(() => ({
      status: 'Copied',
    }));
    setTimeout(() => this.setState(() => ({ status: null })), 3000);
  }
  render() {
    return (
      <div css={css`
        input {
          width: 28em;
          max-width: 100%;
        }
       display: flex;
      `}
      >
        <input
          type="text"
          ref={this.textbox}
          value={this.props.text}
          readOnly
        />
        <button
          tooltip={this.state.status}
          tooltip-position="bottom"
          onClick={this.selectTextbox}
          ref={this.button}
          css={css`${button}`}
        >
          <ClipboardSVG />
          <span>Copy stream key</span>
        </button>
      </div>
    );
  }
}
