/* globals document */
import React, { Component } from 'react';

export function ContextMenuHOC(WrappedComponent) {
  return class ContextMenu extends Component {
    constructor(props) {
      super(props);
      this.state = { open: false };
      this.wrapperRef = React.createRef();
      this.toggleRef = React.createRef();
    }
    componentDidUpdate() {
      if (this.state.open) {
        document.addEventListener('keydown', this.handleEscKey);
        document.addEventListener('mousedown', this.handleClickOutside);
      } else {
        document.removeEventListener('keydown', this.handleEscKey);
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
    }
    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleEscKey);
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
    hide = () => { this.setState({ open: false }); }
    show = () => { this.setState({ open: true }); }
    toggle = () => { this.setState((state) => ({ open: !state.open })); }
    handleClickOutside = (event) => {
      if (this.state.open === true && this.wrapperRef.current
        && !this.wrapperRef.current.contains(event.target)
        && !this.toggleRef.current.contains(event.target)) this.hide();
    }
    handleEscKey(event) {
      if (event.keyCode === 27 && this.state.open === true) this.hide();
    }
    render() {
      return (
        <WrappedComponent
          wrapperRef={this.wrapperRef}
          toggleRef={this.toggleRef}
          open={this.state.open}
          hide={this.hide}
          show={this.show}
          toggle={this.toggle}
          {...this.props}
        />
      );
    }
  };
}
