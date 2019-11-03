import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import GET_TEN_POSTS from "./Posts.graphql";

// const GET_POSTS = gql`
//     query getAllPosts {
//       posts {
//         id
//         title
//         body
//       }
//     }
//   `;

// const GET_TEN_POSTS = gql`
//   query getTenPosts($skip: Int!, $first: Int!) {
//     posts(orderBy: createdAt_DESC, skip: $skip, first: $first) {
//       id
//       title
//       body
//     }
//   }
// `;

// let skipValue = 0;
const FIRST_VALUE = 10;

class Posts extends Component {
  state = {
    skipValue: 0
  };

  render() {
    return (
        <Query
          query={GET_TEN_POSTS}
          variables={{
            skip: this.state.skipValue,
            first: FIRST_VALUE
          }}
        >
          {({ loading, data, fetchMore }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            const { posts } = data;

            return (
              <React.Fragment>
              { posts.map(post => (
              <Link to={`/post/${post.id}`} key={post.id}>
                <h1>{post.title}</h1>
              </Link>
            )) }
              <button onClick={ () => {
                fetchMore({
                  variables: {
                    skip: posts.length
                  },
                  updateQuery: ( prev, {fetchMoreResult} ) => {
                    if (!fetchMoreResult) return prev;
                    // return {
                    //   posts: [...prev.posts, ...fetchMoreResult.posts]
                    // }
                    return Object.assign({}, prev, {
                      posts: [...prev.posts, ...fetchMoreResult.posts]
                    });
                  }
                })
              }}>Show more</button>
              </React.Fragment>
            );

          }}
        </Query>
    );
  }
}

export default Posts;
