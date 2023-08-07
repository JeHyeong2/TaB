import { FC } from "react";
import { WebHeaderProps } from ".";
import { Link, Route, NavLink, useNavigate } from "react-router-dom";
import "./WebHeader.css";

export const WebHeader: FC<WebHeaderProps> = (props) => {
  const navigation = useNavigate;
  return (
    <div {...props}>
      <div className="web-header">
        <div className="web-header-logo">로고</div>
        <div className="header-links">
          <NavLink to="/web">홈</NavLink>
          <NavLink to="/web/board"> 게시판</NavLink>
          <NavLink to="/web/recommend/"> 관광/맛집</NavLink>
          <NavLink to="/web/survey"> 수요조사 </NavLink>
        </div>
        <div className="header-btns">
          <NavLink to="/web/signup"> 회원가입</NavLink>
          <NavLink to="/web/login/"> 로그인</NavLink>
        </div>
      </div>
    </div>
  );
};
