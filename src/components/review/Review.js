import React from "react";
import Moment from "react-moment";
import Avatar from "components/avatar/Avatar.js";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

function Review({ item, name, typePage, editReview, deleteReview }) {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const [pills, setPills] = React.useState("1");
  return (
    <div key={item._id}>
      <div className="section section-tabs">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="10" xl="6">
              <Card>
                <CardHeader>
                  <Nav
                    className="nav-tabs-neutral justify-content-center"
                    data-background-color="blue"
                    role="tablist"
                    tabs
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        Người đăng
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        Ưu điểm
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("3");
                        }}
                      >
                        Khuyết điểm
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "4" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("4");
                        }}
                      >
                        Lời khuyên
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-center"
                    activeTab={"pills" + pills}
                  >
                    <TabPane tabId="pills1" className="tab-flex-avatar">
                      <Link
                        to={
                          typePage === "mypage"
                            ? "/mypage"
                            : typePage === "profile"
                            ? `/profile/${params.id}`
                            : `/profile/${
                                item.idUser ? item.idUser._id : "err"
                              }`
                        }
                        className="review-link-user"
                      >
                        <Avatar
                          type="review"
                          linkImg={item.idUser ? item.idUser.avatar : ""}
                        ></Avatar>
                        <div className="img-tab-review">
                          <p style={{ margin: "0" }}>{name}</p>
                          <Moment className="date-content" format="YYYY/MM/DD">
                            {item.createdAt}
                          </Moment>
                        </div>
                      </Link>
                      <div className="d-flex ">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Link
                            to={`/schools/${params.id}/reviews/${item._id}/detail`}
                          >
                            <i className="now-ui-icons ui-1_zoom-bold"></i>
                          </Link>
                        </div>
                        <div
                          className={
                            user && item.idUser && user.id === item.idUser._id
                              ? ""
                              : "hidden"
                          }
                          onClick={() =>
                            editReview(
                              item._id,
                              item.positive,
                              item.negative,
                              item.advice
                            )
                          }
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "6px",
                          }}
                        >
                          <i className="now-ui-icons files_single-copy-04"></i>
                        </div>
                        <div
                          className={
                            user && item.idUser && user.id === item.idUser._id
                              ? ""
                              : "hidden"
                          }
                          onClick={() => deleteReview(item._id)}
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "6px",
                          }}
                        >
                          <i className="now-ui-icons design_scissors"></i>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tabId="pills2">
                      <p>{item.positive}</p>
                    </TabPane>
                    <TabPane tabId="pills3">
                      <p>{item.negative}</p>
                    </TabPane>
                    <TabPane tabId="pills4">
                      <p>{item.advice}</p>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Review;
