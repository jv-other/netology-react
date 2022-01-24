import React from "react";
import { BrowserRouter as Router, NavLink, Route, Routes } from "react-router-dom";

import ProfileProvider from "./components/ProfileProvider";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";
import EditPost from "./pages/EditPost";

const tempData = [{
  id: 1,
  content: `
  sd;sdf;l'dsf';lsdf&#13;&#10;\n\n\n
  sdsd;fsd;lsfd&#13;&#10;
  sdfsdflkl;sdf&#13;&#10;
  sdl;ksdflk;sdflk;&#13;&#10;
  sdflksdfkl;sdflk;sdf&#13;&#10;
  sdl;ksdflk;sdflk;dsflk;dsf&#13;&#10;
  sd;lsdfkl;sdflk;sdf&#13;&#10;
  'sdl;ksdflk;sdflk;sdf&#13;&#10;
  s;lkksdfkl;sdfkl;dsfkl;sdf&#13;&#10;
  sdf;lkasdf'l;kjasdf'kljasdflkjasdf&#13;&#10;
  asdf;lakse'r;joawe'smcv/.,asmdf;asjerpojzxsdlmfalskdjflkajsdf&#13;&#10;
  asd'f;ljas'dkl;fja'ssdklfja&#13;&#10;
  sd';asjdflakjsd;flkajsdf&#13;&#10;
  ';asdf;kajsdlfkjsomethingsdlkfsl;ksdf&#13;&#10;`,
  author: {
    id: "1",
    name: "Name1",
    avatar: "https://i.pravatar.cc/150?_1",
    place: {
      city: "City1",
      country: "Country1"
    }
  }
}, {
  id: 2,
  content: "something2",
  author: {
    id: "2",
    name: "Name2",
    avatar: "https://i.pravatar.cc/150?_2",
    place: {
      city: "City2",
      country: "Country2"
    }
  }
}, {
  id: 3,
  content: "something3",
  author: {
    id: "1",
    name: "Name1",
    avatar: "https://i.pravatar.cc/150?_3",
    place: {
      city: "City1",
      country: "Country1"
    }
  }
}];

function App() {
  return (
    <Router>
      <ProfileProvider>
        <header className="header position-fixed w-100">
          <nav className="navbar bg-white rounded border">
            <div className="container-fluid">
              <div className="navbar-brand"></div>
              <NavLink to="/posts/new" className="btn btn-primary">
                Создать пост
              </NavLink>
            </div>
          </nav>
        </header>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/posts/new" element={<EditPost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/posts/:id" element={<ViewPost />} />
        </Routes>
      </ProfileProvider>
    </Router>

  );
}

export default App;