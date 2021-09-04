import React from 'react';
import Select, { components } from 'react-select';
import flags from 'icons/flags';
import { selectContainerStyle } from 'theme';

const teamOpts = teams =>
  teams.map(team => ({ value: team.code, label: team.name }));

const SingleValue = props => (
  <components.SingleValue {...props}>
    {flags[props.data.value] && <span className="flag">{flags[props.data.value]()}</span>}
    <span>{props.data.label}</span>
  </components.SingleValue>
);

const Option = props => (
  <components.Option {...props}>
    {flags[props.data.value] && <span className="flag">{flags[props.data.value]()}</span>}
    <span>{props.data.label}</span>
  </components.Option>
);

export const TeamFilter = props => (
  <Select
    styles={selectContainerStyle}
    value={props.teamFilter}
    placeholder="Select team..."
    onChange={option => props.updateFilter(option)}
    components={{ Option, SingleValue }}
    options={teamOpts(props.opts)}
    isClearable
  />
);
