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

function Review({ upVote, downVote,item, name, typePage, editReview, deleteReview }) {
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
                        style={{flex : "1.5"}}
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
                      <div style={{flex : "1"}}>
                        <p style={{margin : "0"}}>{item.comments} comments</p>
                        <p className={`${typePage === "detail" ? "hidden" : ""}`} style={{margin : "0",fontWeight:"bold",display :"flex",justifyContent:"center",alignItems:"center"}}>
                        {item.ratePoint} <p style={{fontSize : "13px",margin : "0px 0 0 2px"}}>(voted)</p>
                        </p>
                      </div>
                      <div className="d-flex " style={{flex : "1", justifyContent:"flex-end"}}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Link to={`/reviews/${item._id}/detail`}>
                            <i className="now-ui-icons ui-1_zoom-bold"></i>
                          </Link>
                        </div>
                        <div
                          className={
                            typePage !== "detail" &&
                            user &&
                            item.idUser &&
                            user.id === item.idUser._id
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
                            marginLeft: "8px",
                          }}
                        >
                          <i className="now-ui-icons files_single-copy-04"></i>
                        </div>
                        <div
                          className={
                            typePage !== "detail" &&
                            user &&
                            item.idUser &&
                            user.id === item.idUser._id
                              ? ""
                              : "hidden"
                          }
                          onClick={() => deleteReview(item._id)}
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "8px",
                          }}
                        >
                          <i className="now-ui-icons design_scissors"></i>
                        </div>
                        <div>
                          {" "}
                          <i
                            style={{ marginLeft: "8px" }}
                            id={`icon_loading_${item._id}`}
                            className="hidden now-ui-icons loader_refresh spin"
                          ></i>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tabId="pills2">
                      <p className={typePage !== "detail" ? "content-hidden" : ""}>{item.positive}</p>
                    </TabPane>
                    <TabPane tabId="pills3">
                      <p className={typePage !== "detail" ? "content-hidden" : ""}>{item.negative}</p>
                    </TabPane>
                    <TabPane tabId="pills4">
                      <p className={typePage !== "detail" ? "content-hidden" : ""}>{item.advice}</p>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          <Col className={`${typePage === "detail" ? "" : "hidden"}`}>
          <div style={{margin : "10px",display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
                          <button onClick={()=> upVote()} className={`btn-icon btn-round btn ${!user.id ? "btn-dark prevent-event" : item.rateValue.up.idUser.includes(user.id) ? "btn-success": "btn-info"}`}>
                          <i className="now-ui-icons arrows-1_minimal-up"></i>
                          </button>
                          <div style={{display : "flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
                            <p
                            id="scores_id"
                          className={`${user.id ? "": "dark"}`}  
                          style={{margin : "0 10px",fontSize  : "27px",fontWeight:"bold",color: '#1beb11'}}>
                          {item.rateValue.up.idUser.length - item.rateValue.down.idUser.length}
                          </p>
                          <i
                            style={{ margin: "0px",fontSize : "20px" }}
                            id={`icon_loading_detail-vote`}
                            className="hidden now-ui-icons loader_refresh spin"
                          ></i>
                          <p className={`${user.id ? "hidden" : ""}`} style={{margin : "0"}}>Vote for this review, <Link to="/login">please login at </Link></p>
                          </div>
                        <button onClick={()=> downVote()} className={`btn-icon btn-round ${!user.id ? "btn-dark prevent-event" : item.rateValue.down.idUser.includes(user.id) ? "btn-success": "btn-info"} btn`}>
                          <i className="now-ui-icons arrows-1_minimal-down"></i>
                          </button>
                        </div></Col>
            </Row>
        </Container>
      </div>
    </div>
  );
}

export default Review;
