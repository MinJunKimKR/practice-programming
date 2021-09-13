import React from "react";
import CollectionPresenter from "./CollectionPresenter";

import { collectionApi } from "api";
// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id },
      },
    } = props;
    this.state = {
      result: null,
      error: null,
      collectionId: id,
      loading: true,
    };
  }
  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
      return push("/");
    }
    let result = null;
    try {
      ({ data: result } = await collectionApi.collectionDetail(parseId));
      console.log("result : ", result);
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    console.log(this.state);
    const { result, error, loading } = this.state;
    return (
      <CollectionPresenter result={result} error={error} loading={loading} />
    );
  }
}
