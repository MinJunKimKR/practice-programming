import { moviesApi, tvApi } from "api";
import React from "react";
import SearchPesenter from "./SearchPesenter";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  updateTerm = (event)=>{
    const {target : {value}} = event;
    this.setState({searchTerm : value})
  }


  searchByTerm = async () => {
    const { searchTerm } = this.state;
    try {
      this.setState({ loading: true });
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      console.log(movieResults)
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      console.log(tvResults)
      this.setState({
        movieResults,
        tvResults,
      });
    } catch {
      this.setState({ error: "Can't find results" });
    } finally {
      this.setState({ loading: false });
    }
  };
  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    return (
      <SearchPesenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
        updateTerm = {this.updateTerm}
      />
    );
  }
}
