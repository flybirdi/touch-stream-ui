/* global confirm */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { CopyableTextbox } from 'components/CopyableTextbox';
import {
  colors, contentLimit, button, separator,
} from 'theme';
import LoaderIcon from 'icons/loader';
import {
  getStreams, deleteStream, addStream, renameStream,
} from './state';
import VideoSVG from './video.svg';
import InlineEdit from './InlineEdit';

const resolutions = [
  '480p',
  '720p',
  '1080p',
  '1440p',
  '2160p',
];

const frameRates = [
  '30fps',
  '60fps',
];

const defaults = {
  streamLabel: '',
  resolution: '720p',
  frameRate: '30fps',
};

class ManageInternal extends Component {
  constructor(props) {
    super(props);
    this.state = defaults;
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    if (!this.props.streams.items.length) this.props._getStreams();
  }
  deleteStream = (id) => {
    if (!confirm('Are you sure you want to delete this key?')) return;
    this.props._deleteStream(id);
  }
  addStream = () => {
    this.props._addStream({
      title: this.state.streamLabel,
      resolution: this.state.resolution,
      frameRate: this.state.frameRate,
    });
    this.setState(() => defaults);
  }
  changeHandler = obj => this.setState(() => (obj));
  render() {
    // TODO: Optimize filtering
    const { streams } = this.props;
    return (
      <div
        id="streams"
        css={css`display:flex;flex-direction:column;min-height:100vh;`}
      >
        <Header />
        <section id="keys" css={css`flex-grow: 1;`}>
          <div css={css`${contentLimit}margin: 1em auto;padding-left:1rem;`}>
            <h2>
              <span>Stream Keys (RTMP Endpoints)&nbsp;</span>
              <VideoSVG css={css`
                position: relative;
                top: 3px;`}
              />
            </h2>
            <span css={css`color:${colors.midGrey}`}>
              Limit approx. 7-8 stream key insertions per day.
            </span>
          </div>
          <div css={css`${separator}`}>
            <input
              type="text"
              placeholder="Stream label"
              value={this.state.streamLabel}
              onChange={(event) => {
                const { value } = event.target;
                this.setState(() => ({ streamLabel: value }));
              }}
            />
            <select
              value={this.state.resolution}
              onChange={event => this.changeHandler({ resolution: event.target.value })}
            >
              {resolutions.map(res => <option key={res} value={res}>{res}</option>)}
            </select>
            <select
              value={this.state.frameRate}
              onChange={event => this.changeHandler({ frameRate: event.target.value })}
            >
              {frameRates.map(frameRate => <option key={frameRate} value={frameRate}>{frameRate}</option>)}
            </select>
            <button
              type="button"
              css={css`${button}`}
              onClick={this.addStream}
            >
              Add Key
            </button>
          </div>
          <div css={css`${contentLimit}margin: 1em auto;padding-left:1rem;`}>
            { streams.loading && (
              <div>
                <span css={css`margin-right: 0.25em;`}><LoaderIcon /></span>
                <span>Loading RTMP Keys</span>
              </div>
            )}
            {
              !streams.loading && streams.items.map(stream => (
                <div
                  key={stream.id}
                  css={css`
                    display: flex;
                  `}
                >
                  <InlineEdit
                    value={stream.snippet.title}
                    updateHandler={label => this.props._renameStream(stream.id, label)}
                  />
                  <span css={css`width: 8em;`}>{stream.cdn.resolution}</span>
                  <span css={css`width: 8em;`}>{stream.cdn.frameRate}</span>
                  <CopyableTextbox text={`${stream.cdn.ingestionInfo.ingestionAddress}/${stream.cdn.ingestionInfo.streamName}`} />
                  <button
                    type="button"
                    onClick={() => this.deleteStream(stream.id)}
                    css={css`${button}`}
                  >
                    Delete
                  </button>
                </div>
              ))
            }
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default connect(state => ({
  meta: state.meta,
  streams: state.streams,
}), dispatch => ({
  _getStreams: () => dispatch(getStreams()),
  _deleteStream: streamId => dispatch(deleteStream(streamId)),
  _addStream: label => dispatch(addStream(label)),
  _renameStream: (id, label) => dispatch(renameStream(id, label)),
}))(ManageInternal);
