import React from 'react';
import SearchPesenter from './SearchPesenter';

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResult: null,
    serchTerm: '',
    error: null,
    loading: false,
  };

  render() {
    const { movieResults, tvResult, serchTerm, error, loading } = this.state;
    return (
      <SearchPesenter
        movieResults={movieResults}
        tvResult={tvResult}
        serchTerm={serchTerm}
        error={error}
        loading={loading}
      />
    );
  }
}
