import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tvApi } from "../api";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const Seasson = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: strach;
`;

const Container = styled.div`
  width: 300px;
  height: 450px;
  justify-content: center;
  background-image: url(${props => props.path});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  margin: 20px 10px;
  padding: 20px 10px;
  transition: width 0.8s, height 0.8s, transform 0.8s;
  transition-timing-function: ease-in-out;
  &:hover {
    width: 350px;
    height: 520px;
  }
  &:hover > h1 {
    color: red;
    font-weight: 800;
  }
  &:hover > p {
    color: white;
    font-weight: 600;
    align-items: center;
  }
`;

const Title = styled.div`
  text-align: center;
  width: 300px;
  align-self: flex-start;
  font-size: 24px;
  font-weight: 600;
  color: white;
  transition: width 0.8s, margin 1s, transform 1s;
  transition-timing-function: ease-in-out;
`;

const Overview = styled.p`
  align-self: flex-end;
  color: grey;
  width: 300px;
  margin-top: 100px;
  font-size: 14px;
  text-align: justify;
  vertical-align: text-bottom;
  transition: width 0.8, margin 1s, transform 1s;
  transition-timing-function: ease-in-out;
`;

const SeasonInfo = ({ name, path, overview, id }) => {
  return (<li>
    <Link to ={`/turn/${id}`}>
    <Container path={path ? `https://image.tmdb.org/t/p/w300${path}` : require("../assets/noPosterSmall.jpg")}>
      <Title>{name}</Title>
      <Overview>{overview}</Overview>
    </Container>
    </Link>
  </li>)
};

const Seasons = ({ match }) => {
  const [seasons, setSeasons] = useState(null);
  const parsedId = parseInt(match.params.id);

  useEffect(() => {
    const callApi = async () => {
      try {
        const { data } = await tvApi.showDetail(parsedId);
        setSeasons(data.seasons);
      } catch (e) {
        console.log(e);
      }
    };
    callApi();
  }, []);

  return (
    <div>
      <Seasson>
        {seasons &&
          seasons.map(item => (
            <SeasonInfo name={item.name} path={item.poster_path} overview={item.overview} id={item.id} />
          ))}
      </Seasson>
    </div>
  );
};

Seasons.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired
};

export default Seasons;
