import React, { Component } from "react";
import PropTypes from "prop-types";

class PostForm extends Component {

    static propTypes = {
        post: PropTypes.object.isRequired,
        submitHandler: PropTypes.func.isRequired
    };
    
    static defaultProps = {
        post: {}
    }

    state = {
        title: this.props.post.title || "",
        body: this.props.post.body || ""
    };

  changed = event => {
    const inputField = {};
    inputField[event.target.name] = event.target.value;
    this.setState({
      ...inputField
    });
  };

  render() {

    const { post, submitHandler, onSuccess } = this.props;
    const { title, body } = this.state;

    return (
          <form
            onSubmit={ event => {
              event.preventDefault();
              submitHandler({
                  variables: {
                      // id: post.post.id,
                      id: post.id,
                      title,
                      body
                  }
              })
                .then(() => {
                  console.log("promise returned (then)");
                  onSuccess();
                  this.setState({
                    title: "",
                    body: ""
                  });
                })
                .catch(err => {
                  console.log("err: ", err);
                });
            }}
          >
            <label>
              Title of post for Create/Update
              <input
                type="text"
                placeholder="title"
                name="title"
                value={title}
                onChange={this.changed}
              />
            </label>
            <label>
              Body of post for Create/Update
              <input
                type="textarea"
                placeholder="body"
                name="body"
                value={body}
                onChange={this.changed}
              />
            </label>
            <button>Submit</button>
          </form>
    );
  }
}





export default PostForm;
