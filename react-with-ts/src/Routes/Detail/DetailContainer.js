import React from "react";
import DetailPesenter from "./DetailPesenter";
import { moviesApi, tvApi } from "api";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      tabNumber: 0,
    };
  }

  updateTabNumber = (tabNumber) => {
    this.setState({ tabNumber });
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const parsedId = parseInt(id);
    const { isMovie } = this.state;
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({ error: "Can't finnd anything." });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    console.log(this.state);
    const { result, error, loading, isMovie, tabNumber } = this.state;
    return (
      <DetailPesenter
        result={result}
        error={error}
        loading={loading}
        isMovie={isMovie}
        tabNumber={tabNumber}
        updateTabNumber={this.updateTabNumber}
      />
    );
  }
}
