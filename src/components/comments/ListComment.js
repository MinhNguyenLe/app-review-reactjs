import React, { useEffect, useState, useRef } from "react";
import * as rb from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as action from "redux/actions.js";
import * as func from "javascript/funcGlobal.js";
import Moment from "react-moment";
import "moment-timezone";
import $ from "jquery";
import { useParams, useHistory } from "react-router-dom";
import { apiLocal } from "javascript/dataGlobal.js";
import Avatar from "components/avatar/Avatar";

const ListComment = () => {
  const params = useParams();
  const history = useHistory();
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
        .catch();
      // .catch((err) => history.push("/error"));
    };
    axiosData();
    refCmt.current.value = "";
  }, [addCmt]);

  const submitCmt = async (e) => {
    console.log(params);
    e.preventDefault();
    if (user.id) {
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

  const deleteCmt = (id) => {
    Promise.all([axios.delete(`${apiLocal}/api/comments/${id}`)])
      .then(() => {
        setAddCmt(addCmt + 1);
      })
      .catch(() => {});
  };

  const editCmt = (id) => {
    Promise.all([
      axios.put(`${apiLocal}/api/comments/${id}`, {
        content: "abcxyz",
      }),
    ])
      .then(() => {
        setAddCmt(addCmt + 1);
      })
      .catch(() => {});
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
          Click to add a comment
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
            <div
              className={
                user && item.idUser && user.id === item.idUser._id
                  ? ""
                  : "hidden"
              }
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i
                onClick={() => editCmt(item._id)}
                style={{ marginLeft: "4px", cursor: "pointer" }}
                className="now-ui-icons files_single-copy-04"
              ></i>
              <i
                onClick={() => deleteCmt(item._id)}
                style={{ marginLeft: "4px", cursor: "pointer" }}
                className="now-ui-icons design_scissors"
              ></i>
            </div>
            <Avatar linkImg={item.idUser && item.idUser.avatar}></Avatar>
            <div className="img-tab-review">
              <Moment
                className="date-content"
                format="YYYY/MM/DD"
                style={{ marginRight: "20px" }}
              >
                {item.createdAt}
              </Moment>
              <span className="cmt-name">
                {(item.idUser && item.idUser.name) || "anonymous"}
              </span>
            </div>
            <div className="cmt-content">{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComment;
