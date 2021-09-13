import React from "react";
import styled from "styled-components";

const Continer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20px;
`;

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default () => (
  <Continer>
    <span role="img" aria-label="Loading">
      ⏰
    </span>
  </Continer>
);
