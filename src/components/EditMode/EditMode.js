import React from "react";
import { ApolloConsumer } from "react-apollo";

const EditMode = props => {
  const { isEditMode } = props;
  return (
    <ApolloConsumer>
      { client => {
        return <button onClick={() => {
            return client.writeData({ data: {isEditMode: !isEditMode} });
          }}
        >
          Toggle Edit Mode
        </button>
      }}
    </ApolloConsumer>
  );
};

export default EditMode;
