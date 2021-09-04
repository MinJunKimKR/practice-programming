import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";

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
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 14px;
`;

const ItemContainer = styled.span`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const YoutubeIframe = styled.iframe`
  width: 100%;
  height: 60vh;
  margin: 20px 0px;
`;

const Imdb = styled.button`
  all: unset;
  border-style: solid;
  border-color: gray;
  border-width: 1.5px;
  border-radius: 3px;
  cursor: pointer;
  color: yellow;
  padding: 3px;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>{result.original_title ?? result.original_name} | Nomflix</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png").default
          }
        />
        <Data>
          <Title> {result.original_title ?? result.original_name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <Imdb
              onClick={() =>
                window.open(
                  `https://www.imdb.com/title/${result.imdb_id}`,
                  "_blank"
                )
              }
            >
              IMDB
            </Imdb>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.videos.results.length > 0 && (
            <YoutubeIframe
              key={result.videos.results[0].key}
              src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
            ></YoutubeIframe>
          )}
          {/* {console.log(result.videos.results.length)} */}
          {/* {result.videos.results.length > 0
            ? result.videos.results.map((vedio) => (
                <YoutubeIframe
                  key={vedio.key}
                  src={`https://www.youtube.com/watch?v=${vedio.key}`}
                ></YoutubeIframe>
              ))
            : ""} */}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
