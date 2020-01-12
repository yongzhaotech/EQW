import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as utils from "../utils";
import * as actions from "../action";

const Error = React.memo(() => {
  const dispatch = useDispatch(),
    error = useSelector(utils.selectError);

  return error ? (
    <div className="alert alert-warning fixed-top eq-errors" role="alert">
      <div>
        {error}
      </div>
      <button
        type="button"
        className="btn btn-link"
        onClick={() => dispatch(actions.clearError())}
      >
        close
      </button>
    </div>
  ) : null;
});

export default Error;
