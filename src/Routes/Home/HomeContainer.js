/* Home의 기능부 */
import React, { Component } from "react";
import { moviesApi } from "../../api";
import HomePresenter from "./HomePresenter";

//기능부
class HomeContainer extends Component {
  // 관리 데이터
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    //Api로부터 현재 인기있는 영화들의 정보를 얻어옴
    try {
      const {
        data: { results: nowPlaying }
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming }
      } = await moviesApi.upcoming();
      const {
        data: { results: popular }
      } = await moviesApi.popular();
      //얻어온 데이터들을 저장
      this.setState({
        nowPlaying,
        upcoming,
        popular
      });
    } catch {
      this.setState({
        error: "Can't find movie information"
      });
    } finally {
      //모든 과정이 끝나면 로딩이 끝났다는 것을 알려줌
      this.setState({
        loading: false
      });
    }
  }
  render() {
    // Mount하면서 reset한 데이터들을 출력부로 보냄
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    console.log(nowPlaying);
    return (
      <HomePresenter nowPlaying={nowPlaying} upcoming={upcoming} popular={popular} error={error} loading={loading} />
    );
  }
}

export default HomeContainer;
