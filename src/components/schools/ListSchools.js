import React, { useEffect, useState } from "react";
import * as rb from "react-bootstrap";
import axios from "axios";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "redux/actions.js";
import * as func from "javascript/funcGlobal.js";
import Loading from "components/loading/Loading.js";
import { apiLocal } from "javascript/dataGlobal.js";

const ListSchool = () => {
  const email = useSelector((state) => state.email);
  const userRedux = useSelector((state) => state.user);
  const arrId = useSelector((state) => state.arrId);

  const params = useParams();
  const history = useHistory();

  const [user, setUser] = useState({});

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const axiosData = () => {
      Promise.all([axios.get(`${apiLocal}/api/schools`)])
        .then(([result]) => {
          setData(result.data);
          setLoading(false);
        })
        .catch((err) => {
          // history.push("/error");
        });
    };
    axiosData();
    func.scrollTop();
  }, []);

  useEffect(() => {
    if (email) {
      const axiosData = () => {
        Promise.all([axios.get(`${apiLocal}/api/users/email/${email}`)])
          .then(([result]) => {
            setUser(result.data);
            dispatch(action.setUser(result.data));
          })
          .catch((err) => {
            // history.push("/error");
          });
      };
      axiosData();
    }
  }, [email]);

  const goReview = (id) => {
    dispatch(action.setIdSchool(id));
    func.scrollTop();
  };

  return loading ? (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "500px" }}
    >
      <Loading />
    </div>
  ) : (
    <div
      className="d-flex flex-column align-items-center"
      style={{ marginTop: "80px" }}
    >
      {data.map((item, index) => (
        <rb.Card
          className="hover-shadow"
          style={{ width: "70%", margin: "16px 0 16px 0", padding: "20px" }}
          key={index}
          onClick={() => goReview(item._id)}
        >
          <Link
            to={`/schools/${item._id}/reviews`}
            className="d-flex flex-row"
            style={{ textDecoration: "none" }}
          >
            <rb.Card.Img
              src={item.images[0]}
              className="school-img"
            ></rb.Card.Img>
            <rb.Card.Body style={{ margin: "0" }}>
              <rb.Card.Text
                className="school-name"
                style={{ fontSize: "21px", fontWeight: "700" }}
              >
                {item.name}
              </rb.Card.Text>
              <rb.Card.Text>
                <span style={{ fontWeight: "500", fontSize: "19px" }}>
                  Mã trường :{" "}
                </span>
                <span style={{ fontSize: "16px", fontWeight: "normal" }}>
                  {item.code}
                </span>
              </rb.Card.Text>
              <rb.Card.Text className="school-name">
                <span style={{ fontWeight: "500", fontSize: "19px" }}>
                  Location:{" "}
                </span>
                {item.location}
              </rb.Card.Text>
              <div className="d-flex flex-row align-items-center">
                <rb.Badge
                  variant="success"
                  className="d-flex justify-content-center align-items-center school-badge"
                >
                  9.9
                </rb.Badge>
                <div>
                  <rb.Card.Text>{item.review} bài đánh giá</rb.Card.Text>
                </div>
              </div>
            </rb.Card.Body>
            <rb.Card.Img src={item.logo} className="school-logo"></rb.Card.Img>
          </Link>
        </rb.Card>
      ))}
    </div>
  );
};

export default ListSchool;
