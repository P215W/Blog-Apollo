import React from "react";
import Posts from "./components/Posts/Posts";
import Post from "./components/Posts/Post";
import NewPost from "./components/NewPost/NewPost";
import UpdatePost from "./components/UpdatePost/UpdatePost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {

  // client.query({
  //   query: search maxvalue
  // }).then(res => {
  //   console.log("Response obj", res);
  // });

  return (
    <React.Fragment>
      <NewPost />
      <Router>
        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/post/new" component={NewPost} />
          <Route path="/post/update/:id" component={UpdatePost} />
          <Route path="/post/:id" component={Post} />
        </Switch>
      </Router>
      </React.Fragment>
  );
};

export default App;
