import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Section from "Components/Section";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Data = styled.div`
  width: 100%;
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 25px;
  margin-bottom: 10px;
  color: white;
`;

const Overview = styled.p`
  font-size: 18px;
  opacity: 0.8;
  line-height: 1.5;
  margin-bottom: 10px;
  width: 70%;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;
`;

const CollectionPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomfilx</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <>
      <Container>
        <Helmet>
          <title>{result.name} | Nomflix</title>
        </Helmet>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.parts[0].poster_path}`}
        />
        <Content>
          <Data>
            <Title>{result.name}</Title>
            <Overview>{result.overview}</Overview>
          </Data>
        </Content>
        <Grid>
          {result.parts.map((part) => (
            <Poster
              id={part.id}
              imageUrl={part.poster_path}
              title={part.original_title}
              rating={part.vote_average}
              year={part.release_date.substring(0.4)}
              isMovie={true}
            ></Poster>
          ))}
        </Grid>
      </Container>
    </>
  );

CollectionPresenter.propTypes = {
  result: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
};
export default CollectionPresenter;
