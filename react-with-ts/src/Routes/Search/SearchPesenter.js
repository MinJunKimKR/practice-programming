import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SearchPresenter = ({
  movieRsults,
  tvResult,
  error,
  loading,
  serchTerm,
  handleSubmit,
}) => null;

SearchPresenter.propTypes = {
  movieRsults: PropTypes.array,
  tvResult: PropTypes.array,
  serchTerm: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SearchPresenter;
