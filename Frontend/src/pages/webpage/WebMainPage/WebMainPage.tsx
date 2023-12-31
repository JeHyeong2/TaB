import { FC } from "react";
import { WebMainPageProps } from "./WebMainPage.props";
import { NavLinkForm, WebHeader } from "@/components/web/WebHeader";
import { WebLoginPage } from "../WebLoginPage";
import { WebSignupPage } from "../WebSignupPage";
import { WebBoardPage } from "../WebBoardPage";
import { WebBoardPostPage } from "../WebBoardPostPage";
import { WebBoardDetailPage } from "../WebBoardDetailPage";
import { WebRecommendPage } from "../WebRecommendPage";
import { WebSurveyPage } from "../WebSurveyPage";
import { Web404Page } from "../Web404Page";
import { Routes, Route, useNavigate, NavLink, Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { Button, Stack } from "@mui/joy";
import Kakaopage from "../Kakaopage";
import WebSurveyPerterPage from "../WebSurveyPeterPage/WebSurveyPeterPage";
import "./WebMainPage.css";
import { WebNoticeDetailPage } from "../WebNoticeDetailPage";
import { WebBoardUpdatePage } from "../WebBoardUpdatePage";
import WebSurveyMaster from "../WebSurveyMasterPage/WebSurveyMaster";
import {
  NoticeData,
  WebState,
  changeSelectedNoticeId,
} from "@/store/slice/web-slice";
import { useDispatch, useSelector } from "react-redux";

export const WebMainPage: FC<WebMainPageProps> = (props) => {
  const data: WebState = useSelector((state: { web: WebState }) => {
    return state.web;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prettyTime = (dateString) => {
    if (dateString) {
      const dateTime = new Date(dateString);

      const timeoptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };

      // @ts-ignore
      const formattedDate = dateTime.toLocaleDateString("ko-KR", timeoptions);
      return formattedDate;
    } else {
      return " ";
    }
  };
  return (
    <div {...props} id="web-root">
      <WebHeader />
      <div className="web-body">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {/* <h1>Take A Bus</h1> */}
                <hr style={{marginBottom:"40px", minWidth:"1000px"}}/>
                <Grid
                  container
                  direction="row"
                  className="main-content-container"
                >
                  <Grid item xs={6} className="main-content-text">
                    <div>
                  
                      <Stack direction={"row"} sx={{justifyContent:'space-between', marginBottom:0}}>
                        <div style={{fontSize:30, fontWeight:"Bold"}}>공지사항</div>
                        <Link to={'board'} style={{margin:0, paddingTop:15}} onClick={()=>{dispatch(changeSelectedNoticeId(null));}}>더보기</Link>
                      </Stack>
                      <hr />
                      {data.noticeData?.slice(0, 5).map((el: NoticeData) => {
                        return (
                          <Stack
                            direction="row"
                            sx={{
                              padding: 1,
                              justifyContent: "space-between",
                              cursor:"pointer"
                            }}
                            onClick={(e) => {
                              window.scrollTo(0, 0);
                              dispatch(changeSelectedNoticeId(el.id));
                              navigate(`board/`);
                            }}
                          >
                            <div className="main-notice-title">
                              [공지사항] {el.title}
                            </div>
                            <div className="main-notice-time">
                              {prettyTime(el.createTime)}
                            </div>
                          </Stack>
                        );
                      })}
                    </div>
                      <hr style={{marginBottom:'50px'}} />
                      <div style={{backgroundColor:"white",padding:"50px", display:"flex",flexDirection:"column",alignItems:'center',borderRadius:"12px"}}>
                      <h2>서비스 개요</h2>
                    <h3 style={{ fontFamily:'Noto Sans KR'}}><span style={{color:"red",fontSize:"30px"}}>TAB</span>은 자체 개발 IOT 통신 서비스로 모든 버스 승객과 버스 운전사님의 편익 을 증진시키고 궁극적으로는 사회 전체의 교통 편익을 최대화 하는것을 목표로 합니다.</h3>
                    <Button
                      color="primary"
                      onClick={()=>{
                        alert('관광/맛집, 수요조사 순으로 발표가 진행됩니다. 같이 해봐요!')
                      }}
                      size="lg"
                      variant="soft"
                    >
                      TAB
                    </Button>
                    <br />
                    하세요

                      </div>
                   
                  </Grid>
                  <Grid item xs={6}>
                    <img src="/main_bus.png?url" style={{ width: "100%" }} />
                  </Grid>
                </Grid>
              </div>
            }
          ></Route>
          <Route path="kakao/" element={<Kakaopage />}></Route>
          <Route path="signup" element={<WebSignupPage />}></Route>
          <Route path="login" element={<WebLoginPage />}></Route>
          <Route path="board/">
            <Route path="" element={<WebBoardPage />}></Route>
            <Route path="post" element={<WebBoardPostPage />}></Route>
            <Route
              path="update/:category/:postId"
              element={<WebBoardUpdatePage />}
            ></Route>
          </Route>
          <Route path="recommend" element={<WebRecommendPage />}></Route>
          <Route path="survey" element={<WebSurveyPerterPage />}></Route>
          <Route path="surveyMaster" element={<WebSurveyMaster />}></Route>
          <Route path="*" element={<Web404Page />}></Route>
        </Routes>
      </div>
    </div>
  );
};
