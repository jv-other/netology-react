import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { request } from "./store/requestSlice";

import Post from "./components/Post";
import Loader from "./components/Loader";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);

  useEffect(() => dispatch(request("news")), []);

  return (
    <div className="container">
      <div className="row mt-3 justify-content-center">
        <div className="col-6">
          {posts.map(post => (<Post key={post.id} post={post} />))}
          <Loader />
        </div>
      </div>
    </div>
  );
}

export default App;
