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
import { addSyntheticLeadingComment } from "typescript";

const ListComment = ({ success, setSuccess }) => {
  const params = useParams();
  const history = useHistory();
  const refCmt = useRef();

  const user = useSelector((state) => state.user);
  const cmt = useSelector((state) => state.cmt);
  const dispatch = useDispatch();

  const [addCmt, setAddCmt] = useState(0);
  const [showEditCmt, setShowEditCmt] = useState(false);

  useEffect(() => {
    const refresh = setInterval(() => {
      setAddCmt(addCmt + 1);
      console.log("in");
    }, 5000);
    const axiosData = () => {
      Promise.all([axios.get(`${apiLocal}/api/reviews/${params.id}/comments`)])
        .then(([cmt]) => {
          dispatch(action.setCmt(cmt.data));
        })
        .catch();
      // .catch((err) => history.push("/error"));
    };
    axiosData();
    refCmt.current.value = "";
    return () => {
      console.log("out");
      clearInterval(refresh);
    };
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
    <div>
      <div
        style={{
          marginTop: "20px",
          borderBottom: "1px solid rgb(223, 222, 222)",
        }}
      >
        <button
          className={`btn-add-cmt ${user.banned ? "dark prevent-event" : ""}`}
          style={{ marginBottom: "6px" }}
          onClick={() => $("#writeCmt").toggle()}
        >
          Click to add a comment
        </button>
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
      <div className="ske-cmt">
        {cmt.map((item, index) => (
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
                {(item.idUser && item.idUser.name) || "anonymous"}
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
        ))}
      </div>
    </div>
  );
};

export default ListComment;
