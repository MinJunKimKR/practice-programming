import React from 'react';
import DetailPesenter from './DetailPesenter';

export default class extends React.Component {
  state = {
    result: null,
    error: null,
    loading: true,
  };

  render() {
    const { result, error, loading } = this.state;
    return <DetailPesenter result={result} error={error} loading={loading} />;
  }
}
