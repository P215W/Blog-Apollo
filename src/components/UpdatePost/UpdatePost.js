import React, { Component } from "react";
import PostForm from "../NewPost/PostForm";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(
      where: { id: $id }
      data: { status: PUBLISHED, title: $title, body: $body }
    ) {
      id
      title
      body
    }
  }
`;

class UpdatePost extends Component {
  render() {
    return (
      <Mutation mutation={UPDATE_POST}>
        { (updatePost, result) => {
          const onSuccess = () => {
            result.client.writeData( {data: {isEditMode: false}} );
          }
          return <PostForm {...this.props} submitHandler={updatePost} onSuccess={onSuccess} />;
        }
        }
        {/* alternativ: return <PostForm {...this.props} submitHandler={updatePost} /> */}
      </Mutation>
    );
  }
}

export default UpdatePost;
