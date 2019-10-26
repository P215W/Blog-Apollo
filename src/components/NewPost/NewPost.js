import React, { Component } from "react";
import PostForm from "./PostForm";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_POST = gql`
  mutation addPost($title: String!, $body: String!) {
    createPost(data: { status: PUBLISHED, title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

class NewPost extends Component {
  render() {
    return (
      <Mutation mutation={ADD_POST}>
        {createPost => <PostForm submitHandler={createPost} />}
      </Mutation>
    );
  }
}


export default NewPost;
