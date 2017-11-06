import React from 'react';
import './result-data.css';

class ResultData extends React.Component {

  render() {
    const { result } = this.props;
    return (
      <div className="result-data">{ result }</div>
    );
  }
}

export default ResultData;