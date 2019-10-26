import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import UpdatePost from "../UpdatePost/UpdatePost";
import EditMode from "../EditMode/EditMode";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";

// how do we get the _ID_ into the Post component?
// - via URLSearchParams or via Routing props (history)?

const Post = props => {
  const { match } = props;

  const GET_POST = gql`
    query getSinglePost($id: ID!) {
      post(where: { id: $id }) {
        id
        title
        body
        check
      }
      isEditMode @client
    }
  `;

const MAKE_CHECK = gql`
  mutation makeCheck($check: Boolean, $id: ID!) {
    updatePost( where: {
      id: $id
    }, data: {
      check: $check
    }
    ) {
      check
      id
      title
      body
    }
  }
`;

  return (
    <div>
    <Query query={GET_POST} variables={{ id: match.params.id }}>
      {({ loading, data }) => {
        if (loading) {
          return <p>Loading post...</p>;
        }
        const { post, isEditMode } = data;
        return (
          <div>
            <EditMode isEditMode={isEditMode} />
            {isEditMode ? (
              <section>
                <h1>Edit Post</h1>
                <UpdatePost post={post} />
              </section>
            ) : (
              <section>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
                <Mutation
                  mutation={MAKE_CHECK}
                  variables={{
                    check: !post.check,
                    id: post.id
                  }}
                  optimisticResponse={{
                    __typename: "Mutation",
                    updatePost: {
                      __typename: "Post",
                      id: post.id,
                      check: !post.check,
                      title: post.title,
                      body: post.body
                    }
                  }}
                  update={ (cache, { data: {updatePost} }) => {
                    const data = cache.readQuery({
                      query: GET_POST,
                      variables: {
                        id: post.id
                      }
                    });
                    data.post.check = updatePost.check;
                    cache.writeQuery({
                      query: GET_POST,
                      data: {
                        ...data,
                        post: data.post
                      }
                    });
                  }}
                  >
                  { updatePost => { 
                    return (
                      <input 
                        type="checkbox"
                        checked={post.check} 
                        onChange={updatePost}
                      />
                    );
                   }
                  }
                </Mutation> 
              </section>
            )}
          </div>
        );
      }}
    </Query>
    <Link to={"/"}><p>Back to posts overview</p></Link>
    </div>
  );
};

export default Post;
