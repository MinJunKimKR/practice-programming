import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import defaultAxios from "axios";
/*
 */

const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });
  const [trigger, setTrigger] = useState(0);
  const refetch = () => {
    setState({ ...state, loading: true });
    setTrigger(Date.now());
  };
  useEffect(() => {
    axiosInstance(opts)
      .then((data) => {
        setState({ ...state, loading: false, data });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error: error });
      });
    return () => {};
  }, [trigger]);
  if (!opts.url) {
    return;
  }
  return { ...state, refetch };
};

const App = () => {
  const { loading, data, error, refetch } = useAxios({
    url: "https://yts.mx/api/v2/list_movies.json",
  });
  console.log(
    `loading : ${loading}, data : ${JSON.stringify(data)}, error :${error}`
  );
  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={refetch}>refetch</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
