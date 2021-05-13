/* API 통신부 */
import axios from "axios";

//통신 객체를 생성
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "91aff63531b81a0863c63cea0d654dae",
    language: "en-US"
  }
});

//영화 통신 객체를 반환
export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  // id에 해당하는 movie 정보 요청
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  // term을 받아 정보를 탐색
  search: term =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term)
      }
    })
};

//TV 통신 객체를 반환
export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  // id에 해당하는 tv 정보 요청
  showDetail: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  // term을 받아 정보를 탐색
  search: term =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term)
      }
    })
};
