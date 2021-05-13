import React, { useEffect, useState } from "react";
import { moviesApi, tvApi } from "../api";
import styled from "styled-components";

const CompaniesTitle = styled.h1`
  font-size: 20px;
  margin-bottom: 10px;
`;
const Companies = styled.div`
  margin-bottom: 20px;
`;
const CountriesTitle = styled.h1`
  font-size: 20px;
  margin-bottom: 10px;
`;
const Countries = styled.div``;

const Productions = ({ location, match }) => {
  const [isMovie] = useState(location.pathname.includes("/movie/"));
  const [productions, setProductions] = useState(null);
  const [countries, setCountries] = useState(null);
  const parsedId = parseInt(match.params.id);

  useEffect(() => {
    const callApi = async () => {
      try {
        if (isMovie) {
          const { data } = await moviesApi.movieDetail(parsedId);
          setProductions(data.production_companies);
          setCountries(data.production_countries);
        } else {
          const { data } = await tvApi.showDetail(parsedId);
          setProductions(data.production_companies);
          setCountries(data.origin_country);
        }
      } catch (e) {
        console.log(e);
      }
    };
    callApi();
  }, []);

  return (
    <div>
      <CompaniesTitle>Product Companies</CompaniesTitle>
      <Companies>{productions && productions.map(item => <div key={item.id}>{item.name}</div>)}</Companies>
      <CountriesTitle>Product Countries</CountriesTitle>
      <Countries>
        {isMovie
          ? countries && countries.map(item => <div key={item.id}>{item.name}</div>)
          : countries && countries.map((item, index) => <div key={index}>{item}</div>)}
      </Countries>
    </div>
  );
};

export default Productions;
