import React, { useState, useRef } from "react";
import ListSchools from "components/schools/ListSchools";
import axios from "axios";
import { FormGroup, Input, Button } from "reactstrap";
import CustomNavbar from "components/Navbars/CustomNavbar.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import { apiLocal } from "javascript/dataGlobal.js";
import SchoolPageHeader from "components/Headers/SchoolPageHeader.js";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import $ from "jquery";
import * as func from "javascript/funcGlobal.js";

function Schools() {
  const params = useParams();
  const [data, setData] = useState([]);
  const refCode = useRef();
  const refLocation = useRef();
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    Promise.all([axios.get(`${apiLocal}/api/schools`)])
      .then(([result]) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((err) => {
        // history.push("/error");
      });
    func.scrollTop();
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  const selectTypeSchool = async (e) => {
    $("#search_code").addClass("prevent-event");
    $("#search_location").addClass("prevent-event");
    $("#select_type_school").addClass("prevent-event");
    Promise.all([
      axios.get(`${apiLocal}/api/schools/${e.target.value}/type-of-schools`),
    ])
      .then(([school]) => {
        setData(school.data);
        console.log(school.data);
        $("#search_code").removeClass("prevent-event");
        $("#search_location").removeClass("prevent-event");
        $("#select_type_school").removeClass("prevent-event");
      })
      .catch();
  };
  const searchLocationSchool = (e) => {
    $("#search_code").addClass("prevent-event");
    $("#search_location").addClass("prevent-event");
    $("#select_type_school").addClass("prevent-event");
    Promise.all([
      axios.get(
        `${apiLocal}/api/schools/search/location?q=${refLocation.current.value}`
      ),
    ])
      .then(([school]) => {
        setData(school.data);
        console.log(school.data);
        $("#search_code").removeClass("prevent-event");
        $("#search_location").removeClass("prevent-event");
        $("#select_type_school").removeClass("prevent-event");
      })
      .catch();
  };
  const searchCodeSchool = (e) => {
    $("#search_code").addClass("prevent-event");
    $("#search_location").addClass("prevent-event");
    $("#select_type_school").addClass("prevent-event");
    Promise.all([
      axios.get(
        `${apiLocal}/api/schools/search/code?q=${refCode.current.value}`
      ),
    ])
      .then(([school]) => {
        console.log(school.data);
        setData(school.data || []);
        $("#search_code").removeClass("prevent-event");
        $("#search_location").removeClass("prevent-event");
        $("#select_type_school").removeClass("prevent-event");
      })
      .catch();
  };
  // <div
  //   className={"data-content-".concat(item._id)}
  //   dangerouslySetInnerHTML={{ __html: item.content }}
  // ></div>;
  return (
    <>
      <CustomNavbar />
      <div className="wrapper">
        <SchoolPageHeader />
        <div className="main">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px 0",
            }}
          >
            <FormGroup
              style={{ width: "70%", display: "flex", alignItems: "center" }}
            >
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  color: "#333",
                  borderRadius: "6px",
                }}
                onClick={() => searchLocationSchool()}
              >
                <i class="fas fa-search"></i>
              </button>
              <input
                ref={refCode}
                id="search_code"
                type="text"
                name="code"
                placeholder="Search location of school"
                style={{ margin: "20px 20px 20px 0", border: "none" }}
              />
              <button
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#333",
                  borderRadius: "6px",
                }}
                onClick={() => searchCodeSchool()}
              >
                <i class="fas fa-search"></i>
              </button>
              <input
                ref={refLocation}
                id="search_location"
                type="text"
                name="location"
                style={{
                  margin: "20px 20px 20px 0",
                  border: "none",
                  height: "40px",
                }}
                placeholder="Search code of school"
              />
              <Input
                id="select-type-school"
                type="select"
                style={{ margin: "0 20px" }}
                name="select"
                onChange={(e) => selectTypeSchool(e)}
              >
                <option selected="selected" disabled hidden>
                  Type of school
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Input>
            </FormGroup>
          </div>
          <ListSchools
            loading={loading}
            setLoading={setLoading}
            data={data}
            setData={setData}
          ></ListSchools>
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Schools;
