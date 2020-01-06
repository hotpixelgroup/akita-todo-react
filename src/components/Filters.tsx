import * as React from 'react';

export class Filters extends React.PureComponent<any> {
  render() {
    return (
      <div>
        <span>Show: </span>
        <select onChange={this.props.onChange} value={this.props.active}>
          <option value="SHOW_ALL">All</option>
          <option value="SHOW_ACTIVE">Active</option>
          <option value="SHOW_COMPLETED">Completed</option>
        </select>
      </div>
    );
  }
}
