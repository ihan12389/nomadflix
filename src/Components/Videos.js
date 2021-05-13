/* Detail의 Videos부 */
import React, { useEffect, useState } from "react";
import { moviesApi, tvApi } from "../api";

const Videos = ({ location, match }) => {
  //관리할 데이터들을 useState로 생성
  const [isMovie] = useState(location.pathname.includes("/movie/"));
  const [videos, setVideos] = useState(null);
  const parsedId = parseInt(match.params.id);

  //Mount 실행
  useEffect(() => {
    const callApi = async () => {
      //id 이용해서 API에서 데이터 얻어온 후 저장
      try {
        if (isMovie) {
          const {
            data: {
              videos: { results }
            }
          } = await moviesApi.movieDetail(parsedId);
          setVideos(results);
        } else {
          const {
            data: {
              videos: { results }
            }
          } = await tvApi.showDetail(parsedId);
          setVideos(results);
        }
        // 오류시 출력
      } catch (e) {
        console.log(e);
      }
    };
    callApi();
  }, []);

  //출력
  return (
    <div>
      {videos &&
        //반환받은 item 하나하나 마다 유튜브 영상으로 출력
        videos.map(item => (
          <iframe
            key={item.id}
            title={item.key}
            type="text/html"
            width="400"
            height="250"
            src={`//www.youtube.com/embed/${item.key}`}
            frameBorder="0"
            allow="autoplay; encrypted-media; gyroscope; accelerometer"
            allowFullScreen="true"
          ></iframe>
        ))}
    </div>
  );
};

export default Videos;
