import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollTop from "./hooks/useScrollTop";
import ChatView from "./pages/Chat/ChatView";
import Main from "./pages/Main/Main";
import Layout from "./components/layout/Layout";
import NewPost from "./pages/newpost/NewPost";
import NotFound from "./pages/not-found/NotFound";
import Feed from "./pages/feed/Feed";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import MyPage from "./pages/users/MyPage";
import EditPost from "./pages/editpost/EditPost";
import { LogOutAction } from "./components/login/Logout";
import WeatherInfo from "./pages/Main/WeatherInfo";
import SevenWeatherForecast from "./pages/Main/SevenWeatherForecast";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <ScrollTop />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Main />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/archive"
            element={
              <Layout>
                <NewPost />
              </Layout>
            }
          />
          <Route
            path="/editpost/:postId"
            element={
              <Layout>
                <EditPost />
              </Layout>
            }
          />

          {/* 피드 페이지: 전체 피드 조회 */}
          <Route
            path="/feed"
            element={
              <Layout>
                <Feed />
              </Layout>
            }
          />
          {/* 특정 유저 피드 조회 */}
          <Route
            path="/feed/:nickName"
            element={
              <Layout>
                <Feed />
              </Layout>
            }
          />
          {/* 특정 태그 피드 조회 */}
          <Route
            path="/feed/hashtags/:tag"
            element={
              <Layout>
                <Feed />
              </Layout>
            }
          />
          <Route
            path="/chat"
            element={
              <Layout>
                <ChatView />
              </Layout>
            }
          />
          <Route
            path="/user"
            element={
              <Layout>
                <MyPage />
              </Layout>
            }
          />
          <Route path="/editpost/:postId" element={<EditPost />} />
          <Route path="/logout" element={<LogOutAction />} />
          <Route path="*" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/weatherinfo" element={<WeatherInfo />} />
          <Route path="/sevendayweather" element={<SevenWeatherForecast />} />
          {/* 날씨api 테스트용 페이지 */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
