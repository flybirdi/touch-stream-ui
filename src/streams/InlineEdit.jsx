import React, { useState } from 'react';
import { css } from '@emotion/core';

const staticStyle = css`
  border-radius: 2px;
  transition: background 0.2s;
  cursor: pointer;
  width: 16em;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  padding: 1em;
  &:hover {
    background: #eed;
  }
  &:disabled {
    background: #eed;
    color: #ccc;
  }
`;

const editStyle = css`
  input[type="text"]& {
    width: 16em;
    padding: 1em;
    border-radius: 2px;
  }
`;

export default ({ updateHandler, isUpdating, value }) => {
  const [editable, updateEditable] = useState(false);
  const [label, updateLabel] = useState(value);
  if (editable) {
    return (
      <input
        css={editStyle}
        type="text"
        value={label}
        onChange={event => updateLabel(event.target.value)}
        onBlur={() => {
          updateHandler(label);
          updateEditable(false);
        }}
      />
    );
  }
  return (
    <button
      css={staticStyle}
      onClick={() => updateEditable(true)}
      disabled={isUpdating}
    >
      {value}
    </button>
    );
};
