/* 출력부 */
import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Poster from "../../Components/Poster";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";

const Container = styled.div`
  padding: 20px;
`;

// 출력부
function HomePresenter({ nowPlaying, popular, upcoming, loading, error }) {
  return (
    <>
      <Helmet>
        <title>홈 화면~</title>
      </Helmet>
      {/* 로딩중인지를 확인 */}
      {loading ? (
        <>
          <Helmet>
            <title>Loading...</title>
          </Helmet>
          <Loader />
        </>
      ) : (
        // 컨테이너
        <Container>
          <Helmet>
            <title>홈화면 호호홈화면</title>
          </Helmet>
          {/* 플레잉 목록이 있다면 출력 */}
          {nowPlaying && nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {nowPlaying.map(movie => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {/* 업커밍 목록이 있다면 출력 */}
          {upcoming && upcoming.length > 0 && (
            <Section title="Upcoming Movies">
              {upcoming.map(movie => (
                // Poster 컴포넌트로 출력
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {/* 인기 목록이 있다면 출력 */}
          {popular && popular.length > 0 && (
            <Section title="Popular Movies">
              {popular.map(movie => (
                // Poster 컴포넌트로 출력
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {/* 에러가 있다면 출력 */}
          {error && <Message color="#e74c3c" text={error} />}
        </Container>
      )}
    </>
  );
}

export default HomePresenter;
