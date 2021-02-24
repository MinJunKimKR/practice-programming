import React from "react";
import ProTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;
const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
`;
const Grid = styled.div`
  margin-top: 25px;
`;

const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Grid>{children}</Grid>
  </Container>
);

Section.proTypes = {
  title: ProTypes.string.isRequired,
  children: ProTypes.oneOfType([
    ProTypes.arrayOf(ProTypes.node),
    ProTypes.node,
  ]),
};

export default Section;
