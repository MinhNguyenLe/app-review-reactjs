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

import socketIOClient from "socket.io-client";

const ListComment = ({ review, success, setSuccess }) => {
  const params = useParams();
  const refCmt = useRef();

  const user = useSelector((state) => state.user);
  const cmt = useSelector((state) => state.cmt);
  const dispatch = useDispatch();

  const [addCmt, setAddCmt] = useState(0);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(apiLocal);

    socketRef.current.on("sendDataServer", (dataGot) => {
      dispatch(action.setCmt(dataGot.data.data));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const axiosData = () => {
      Promise.all([axios.get(`${apiLocal}/api/reviews/${params.id}/comments`)])
        .then(([cmt]) => {
          dispatch(action.setCmt(cmt.data));
          socketRef.current.emit("sendDataClient", cmt);
        })
        .catch();
      // .catch((err) => history.push("/error"));
    };
    axiosData();
    refCmt.current.value = "";
  }, [addCmt]);

  const submitCmt = async (e) => {
    e.preventDefault();
    $(`#icon_loading_3`).removeClass("hidden");
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
    setSuccess(success + 1);
    setAddCmt(addCmt + 1);
    $(`#icon_loading_3`).addClass("hidden");
  };

  const deleteCmt = (id) => {
    $(`#icon_loading_${id}`).removeClass("hidden");
    Promise.all([axios.delete(`${apiLocal}/api/comments/${id}`)])
      .then(() => {
        setAddCmt(addCmt + 1);
        $(`#icon_loading_${id}`).addClass("hidden");
      })
      .catch(() => {});
  };

  const editCmt = (id, contentBeforeEdit) => {
    $(".cmt-content").removeClass("hidden");
    $(".edit-cmt").addClass("hidden");

    $(`#edit_comment_${id}`).removeClass("hidden");
    $(`#comment_content_${id}`).addClass("hidden");
    $(`#value_${id}`).val(contentBeforeEdit);
  };

  const saveEditCmt = (e, id) => {
    e.preventDefault();
    $(`#icon_loading_${id}`).removeClass("hidden");
    Promise.all([
      axios.put(`${apiLocal}/api/comments/${id}`, {
        content: $(`#value_${id}`).val(),
      }),
    ])
      .then(() => {
        $(".cmt-content").removeClass("hidden");
        $(".edit-cmt").addClass("hidden");
        setAddCmt(addCmt + 1);
        $(`#icon_loading_${id}`).addClass("hidden");
      })
      .catch(() => {});
  };

  const exitEditCmt = () => {
    $(".cmt-content").removeClass("hidden");
    $(".edit-cmt").addClass("hidden");
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%" }}>
        <div
          style={{
            marginTop: "20px",
            borderBottom: "1px solid rgb(223, 222, 222)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              className={`btn-add-cmt ${
                user.banned ? "dark prevent-event" : ""
              }`}
              style={{ marginBottom: "6px" }}
              onClick={() => {
                $("#detail-list-report").addClass("hidden");
                $("#detail-list-cmt").removeClass("hidden");
                $("#writeCmt").toggle();
              }}
            >
              Viết bình luận
            </button>
            <button
              onClick={() => {
                $("#detail-list-report").removeClass("hidden");
                $("#detail-list-cmt").addClass("hidden");
              }}
              className={`btn-add-cmt ${
                user.banned ? "dark prevent-event" : ""
              } ${!user.permission ? "dark prevent-event" : ""}`}
              style={{ marginBottom: "6px" }}
            >
              Xem các báo cáo bài đánh giá
            </button>
          </div>
          <rb.Form
            id="writeCmt"
            onSubmit={submitCmt}
            style={{ marginTop: "8px", display: "none", marginBottom: "8px" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <i
                style={{ margin: "0 8px" }}
                id="icon_loading_3"
                className="hidden now-ui-icons loader_refresh spin"
              ></i>
              <rb.Form.Control
                ref={refCmt}
                onClick={() => dispatch(action.setIdReview(params.id))}
                type="text"
                style={{ width: "100%", fontSize: "18px" }}
              />
            </div>
          </rb.Form>
        </div>
        <div id="detail-list-cmt" className="ske-cmt">
          {cmt.length ? (
            [...cmt].reverse().map((item, index) => (
              <div key={index} className="d-flex flex-row ske-cmt-c">
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
                    {(item.idUser && item.idUser.name) || "Người dùng ẩn danh"}
                  </span>
                  <div
                    className={
                      user && item.idUser && user.id === item.idUser._id
                        ? ""
                        : "hidden"
                    }
                    style={{
                      marginTop: "8px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      onClick={() => editCmt(item._id, item.content)}
                      style={{ marginRight: "8px", cursor: "pointer" }}
                      className="now-ui-icons files_single-copy-04"
                    ></i>
                    <i
                      onClick={() => deleteCmt(item._id)}
                      style={{ marginRight: "4px", cursor: "pointer" }}
                      className="now-ui-icons design_scissors"
                    ></i>
                    <div style={{ marginLeft: "4px" }}>
                      <i
                        id={`icon_loading_${item._id}`}
                        className="hidden now-ui-icons loader_refresh spin"
                      ></i>
                    </div>
                  </div>
                </div>
                <rb.Form
                  className="edit-cmt hidden"
                  id={`edit_comment_${item._id}`}
                  onSubmit={(e) => saveEditCmt(e, item._id)}
                  style={{ width: "100%" }}
                >
                  <rb.Form.Control
                    id={`value_${item._id}`}
                    type="text"
                    style={{ width: "100%", fontSize: "18px" }}
                  />
                  <i
                    onClick={() => exitEditCmt()}
                    style={{ marginLeft: "8px", cursor: "pointer" }}
                    className="now-ui-icons ui-1_simple-remove"
                  ></i>
                </rb.Form>
                <p
                  style={{ margin: "0" }}
                  id={`comment_content_${item._id}`}
                  className="cmt-content"
                >
                  {item.content}
                </p>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
        <div className="hidden ske-cmt" id="detail-list-report">
          {[...review.report.message].reverse().map((item, index) => (
            <div className="d-flex flex-row ske-cmt-c" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListComment;
