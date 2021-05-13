import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Videos from "../../Components/Videos";
import Productions from "../../Components/Productions";
import Seasons from "../../Components/Seasons";
import Router from "../../Components/Router";

//컨테이너
const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;
//배경 화면
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;
//컨텐트
const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;
//코버 이미지
const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;
//데이터
const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;
//타이틀
const Title = styled.h3`
  font-size: 32px;
`;
//상표
const IMDb = styled.span`
  margin: 6px 15px;
`;
//아이템 컨테이너
const ItemContainer = styled.div`
  margin: 20px 0;
`;
//아이템
const Item = styled.span``;
//디비더
const Divider = styled.span`
  margin: 0 10px;
`;
//오버뷰(설명)
const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;
//인사이드메뉴
const InsideMenu = styled.div`
  margin: 20px 0px;
`;
//리스트
const List = styled.ul`
  display: flex;
`;
//아이템 리스트
const Itemli = styled.li`
  cursor: pointer;
  margin-right: 20px;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #34495e;
  padding: 10px;
  border-radius: 3px;
  background-color: ${props => (props.active ? "#34495e" : "transparent")};
  color: white;
  min-width: 120px;
  text-align: center;
`;

//출력부
const DetailPresenter = withRouter(({ location: { pathname }, result, loading }) =>
  //로딩중
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    //컨테이너
    <Container>
      {console.log(result)}
      <Helmet>
        <title>{result.original_title ? result.original_title : result.original_name} | Nomflix</title>
      </Helmet>
      {/* 배경이미지 */}
      <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
      {/* 컨텐트 */}
      <Content>
        {/* 코버이미지 */}
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.jpg")
          }
        />
        {/* 데이터 */}
        <Data>
          {/* 타이틀 */}
          <Title>
            {result.original_title ? result.original_title : result.original_name}
            {/* 상표 (클릭하면 넘어감)*/}
            <IMDb>
              {result.imdb_id && (
                <a href={`https://www.imdb.com/title/${result.imdb_id}`}>
                  <img
                    src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png"
                    alt="IMDb url"
                    height="26"
                    width="52"
                  />
                </a>
              )}
            </IMDb>
          </Title>
          {/* 아이템 컨테이너 */}
          <ItemContainer>
            {/* 아이템 릴리즈 데이터 */}
            <Item>
              {result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            {/* 아이템 런타임 */}
            <Item>{result.runtime ? result.runtime : result.episode_run_time[0]} min</Item>
            <Divider>•</Divider>
            {/* 아이템 장르 */}
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1 ? genre.name : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          {/* 오버뷰 */}
          <Overview>{result.overview}</Overview>
          {/* 인사이트 메뉴 */}
          <InsideMenu>
            {/* 리스트 */}
            <List>
              {/* 리스트 아이템 비디오로 넘어가는 링크 */}
              <Link to={result.original_title ? `/movie/${result.id}/videos` : `/show/${result.id}/videos`}>
                <Itemli
                  active={
                    result.original_title
                      ? pathname === `/movie/${result.id}/videos`
                      : pathname === `/show/${result.id}/videos`
                  }
                >
                  Videos
                </Itemli>
              </Link>
              {/* 리스트 아이템 프로덕션으로 넘어가는 링크 */}
              <Link to={result.original_title ? `/movie/${result.id}/productions` : `/show/${result.id}/productions`}>
                <Itemli
                  active={
                    result.original_title
                      ? pathname === `/movie/${result.id}/productions`
                      : pathname === `/show/${result.id}/productions`
                  }
                >
                  Productions
                </Itemli>
              </Link>
              {/* 아이템 리스트 시즌이 있는 영화일 경우 시즌으로 넘어가는 링크 */}
              {parseInt(result.number_of_seasons) > 0 && (
                <Link to={result.original_title ? false : `/show/${result.id}/seasons`}>
                  <Itemli active={result.original_title ? false : pathname === `/show/${result.id}/seasons`}>
                    Seasons
                  </Itemli>
                </Link>
              )}
            </List>
          </InsideMenu>
          {/* 링크를 라우팅하는 라우터 */}
          <Route path={result.original_title ? `/movie/:id/videos` : `/show/:id/videos`} exact component={Videos} />
          <Route
            path={result.original_title ? `/movie/:id/productions` : `/show/:id/productions`}
            exact
            component={Productions}
          />
          <Route path={`/show/:id/seasons`} exact component={Seasons} />
        </Data>
      </Content>
    </Container>
  )
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
