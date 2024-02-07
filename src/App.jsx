import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { NavBar } from "./components/NavBar/NavBar";
import { HomePage } from "./components/HomePage/HomePage";
import { ArticleContainer } from "./components/ArticleContainer/ArticleContainer";

function App() {


  return (
    <>
        <Header />
        <NavBar />
        <div>

        <Routes>
          <Route
            path="/"
            element={
              <HomePage/>
            }
          />
          <Route
            path="/articles/:article"
            element={
              <ArticleContainer
              />
            }
          />
        </Routes>
        </div>
    </>
  );
}

export default App;
