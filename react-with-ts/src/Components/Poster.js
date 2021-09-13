import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center;
  transition: opacity 0.1s linear;
`;

const Rating = styled.div`
  bottom: 5px;
  position: absolute;
  right: 5px;
  opacity: 0;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.div`
  display: block;
  font-size: 12px;
  margin-bottom: 3px;
`;

const Year = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const Poster = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  isMovie = false,
  isLink = true,
}) =>
  isLink ? (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <Container>
        <ImageContainer>
          <Image
            bgUrl={
              imageUrl
                ? `https://image.tmdb.org/t/p/w300${imageUrl}`
                : require("../assets/noPosterSmall.png").default
            }
          ></Image>
          {rating && (
            <Rating>
              <span role="img" aria-label="rating">
                ⭐️
              </span>{" "}
              {rating}/10
            </Rating>
          )}
        </ImageContainer>
        <Title>
          {title.length > 18 ? `${title.substring(0, 18)}...` : title}
        </Title>
        <Year>{year}</Year>
      </Container>
    </Link>
  ) : (
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require("../assets/noPosterSmall.png").default
          }
        ></Image>
        {rating && (
          <Rating>
            <span role="img" aria-label="rating">
              ⭐️
            </span>{" "}
            {rating}/10
          </Rating>
        )}
      </ImageContainer>
      <Title>
        {title.length > 18 ? `${title.substring(0, 18)}...` : title}
      </Title>
      <Year>{year}</Year>
    </Container>
  );

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
  isLink: PropTypes.bool,
};

export default Poster;
