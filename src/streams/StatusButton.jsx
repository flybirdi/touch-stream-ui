import React, { Component } from 'react';
import { css } from '@emotion/core';
import CaretSVG from 'icons/caret.svg';
import ArrowSVG from 'icons/arrow.svg';
import { colors, shadows, watch } from 'theme';
import { ContextMenuHOC } from '../components/ContextMenuHOC';

const statusDefs = {
  scheduledForCreation: {
    name: 'Creating',
    color: 'purple',
  },
  noBroadcast: {
    name: '-',
    color: 'white',
  },
  idle: {
    name: 'Idle',
    color: 'orange',
  },
  testing: {
    name: 'Testing',
    color: 'blue',
  },
  live: {
    name: 'Live',
    color: 'red',
  },
  complete: {
    name: 'Completed',
    color: 'grey',
  },
  abandoned: {
    name: 'Abandoned',
    color: 'grey',
  },
};

const submenu = css`
position: absolute;
z-index: 100;
top: 100%;
left: 0;
width: 100%;
display: flex;
flex-direction: column;
background: white;
box-shadow: ${shadows.base};
text-align: left;
border-radius: 2px;
button {
  display: flex;
  justify-content: space-between;
  text-align: left;
  width: 100%;
  padding: 1em;
  cursor: pointer;
  ${watch}
  &:hover {
    background: ${colors.lightGrey};
  }
}
`;

// TODO: Implement loading state

class StatusButtonInt extends Component {
  transition(transition) {
    this.props.hide();
    this.props.transition(this.props.eventId, transition);
  }
  render() {
    return (
      <div css={css`position: relative;`}>
        <button
          css={css`
          position: relative;
          display: flex;
          align-items: center;
          min-width: 8em;
          width: 100%;
          padding: 1em;
          border-radius: 2px;
          border: 1px solid #ccc;
          font-size: 1em;
          text-align: left;
          &:focus {
            outline: 0;
          }
          svg {
            position: absolute;
            z-index: 10;
            right: 0;
            top: 0;
            padding: 1.25em;
            stroke-width: 1.5px;
            transform: rotateZ(90deg);
          }`}
          ref={this.props.toggleRef}
          onClick={this.props.toggle}
        >
          <span css={css`
            display:inline-block;
            width:1em;
            height:1em;
            margin-right: 0.25em;
            border-radius: 3px;
            background: ${statusDefs[this.props.broadcastStatus].color};
            `}
          />
          <span>{statusDefs[this.props.broadcastStatus].name}</span>
          {(this.props.broadcastStatus !== 'complete' && this.props.broadcastStatus !== 'noBroadcast') && <CaretSVG />}
        </button>
        {
          this.props.open &&
          <div ref={this.props.wrapperRef} css={submenu}>
            {(this.props.broadcastStatus === 'idle' || this.props.broadcastStatus === 'testing') &&
              <button onClick={() => this.transition('live')}><span>Start</span><ArrowSVG /></button>}
            {(this.props.broadcastStatus === 'live') &&
              <button onClick={() => this.transition('complete')}><span>Stop</span><ArrowSVG /></button>}
          </div>
        }
      </div>
    );
  }
}

export const StatusButton = ContextMenuHOC(StatusButtonInt);
