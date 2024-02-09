import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { NavBar } from "./components/NavBar/NavBar";
import { HomePage } from "./components/HomePage/HomePage";
import { ArticleContainer } from "./components/ArticleContainer/ArticleContainer";
import { UserContext } from "./context/UserContext";

function App() {

  const [loggedInUser, setLoggedInUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
  }
  )

  return (
    <>
    <UserContext.Provider value={loggedInUser}>
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
          <Route path=":topic"
          element={<HomePage/>}/>
        </Routes>
        </div>
        </UserContext.Provider>
    </>
  );
}

export default App;
