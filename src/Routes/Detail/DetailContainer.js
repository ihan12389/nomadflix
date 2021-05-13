/**Detail 기능부**/
import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

//기능부
// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  //관리 데이터(결과, 에러, 로딩, 무비)
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      // url에 movie를 포함하고 있는지 확인
      isMovie: pathname.includes("/movie/")
    };
  }

  //맨처음 실행 사항
  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    console.log(isMovie);
    const parsedId = parseInt(id);
    // id도 없이 page에 접근한거라면 뒤로 보냄
    if (isNaN(parsedId)) {
      return push("/");
    }
    //id를 이용해 Api로부터 id에 해당하는 movie의 result를 얻어옴
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
      //얻어온 데이터들을 저장
      this.setState({ result });
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      //모든 과정이 끝나면 로딩이 끝났다는 것을 알려줌
      this.setState({ loading: false });
    }
  }

  render() {
    //Mount하면서 reset한 관리 데이터들을 출력부로 보냄
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
