// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components"
import routes from '../constants/routes';

const Wrapper = styled('div')`
  
`

const HomePage = () => (
  <Wrapper>
    <h2>Home</h2>
    <Link to={routes.COUNTER}>to Counter</Link>
    <br />
    <Link to={routes.TEST}>to Test</Link>
  </Wrapper>
);

export default HomePage;
