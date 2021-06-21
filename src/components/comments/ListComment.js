import React, { useEffect, useState, useRef } from "react";
import * as rb from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as action from "redux/actions.js";
import * as func from "javascript/funcGlobal.js";
import Moment from "react-moment";
import "moment-timezone";
import $ from "jquery";
import { useParams } from "react-router-dom";
import { apiLocal } from "javascript/dataGlobal.js";

const ListComment = () => {
  const params = useParams();
  const refCmt = useRef();

  const user = useSelector((state) => state.user);
  const cmt = useSelector((state) => state.cmt);
  const dispatch = useDispatch();

  const [addCmt, setAddCmt] = useState(0);

  useEffect(() => {
    const axiosData = () => {
      Promise.all([axios.get(`${apiLocal}/api/reviews/${params.id}/comments`)])
        .then(([cmt]) => {
          console.log(cmt.data);
          dispatch(action.setCmt(cmt.data));
        })
        .catch((err) => console.log(err));
    };
    axiosData();
    refCmt.current.value = "";
  }, [addCmt]);

  const submitCmt = async (e) => {
    console.log(params);
    e.preventDefault();
    if (user) {
      await axios.post(`${apiLocal}/api/comments`, {
        idReview: params.id,
        content: refCmt.current.value,
        idUser: user.id,
      });
    } else {
      await axios.post(`${apiLocal}/api/comments`, {
        idReview: params.id,
        content: refCmt.current.value,
      });
    }
    setAddCmt(addCmt + 1);
  };
  return (
    <div>
      <div
        style={{
          marginTop: "20px",
          borderBottom: "1px solid rgb(223, 222, 222)",
        }}
      >
        <button
          style={{ marginBottom: "6px" }}
          onClick={() => $("#writeCmt").toggle()}
          className="btn-add-cmt"
        >
          Add a comment
        </button>
        <rb.Form
          id="writeCmt"
          onSubmit={submitCmt}
          style={{ marginTop: "8px", display: "none", marginBottom: "8px" }}
        >
          <rb.Form.Control
            ref={refCmt}
            onClick={() => dispatch(action.setIdReview(params.id))}
            type="text"
            style={{ width: "100%", fontSize: "18px" }}
          />
        </rb.Form>
      </div>
      <div className="ske-cmt">
        {cmt.map((item, index) => (
          <div key={index} className="d-flex flex-row ske-cmt-c">
            <div>
              <Moment
                className="date-content"
                format="YYYY/MM/DD"
                style={{ marginRight: "20px" }}
              >
                {item.createdAt}
              </Moment>
              <span className="cmt-name">{item.name || "anonymous"}</span>
              <span className="cmt-content">{item.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComment;
