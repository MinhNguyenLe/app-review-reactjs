import React, { useState, useRef } from "react";
import ListSchools from "../../components/schools/ListSchools";
import axios from "axios";
import { FormGroup, Input, Button } from "reactstrap";
import CustomNavbar from "../../components/Navbars/CustomNavbar.js";
import DarkFooter from "../../components/Footers/DarkFooter.js";
import { apiLocal } from "../../javascript/dataGlobal.js";
import SchoolPageHeader from "../../components/Headers/SchoolPageHeader.js";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import $ from "jquery";
import * as func from "../../javascript/funcGlobal.js";

function Schools() {
  const [data, setData] = useState([]);
  const refSearch = useRef();
  const refType = useRef();
  const refLevel = useRef();
  const refMajor = useRef();
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    // window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    Promise.all([axios.get(`${apiLocal}/api/schools/filter`)])
      .then(([result]) => {
        setData(result.data.schools);
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
  const filterSchool = () => {
    $("#search").addClass("prevent-event");
    $("#icon-filter-school").removeClass("hidden");
    $("#select-type-school").addClass("prevent-event");
    $("#select-major-school").removeClass("prevent-event");
    $("#select-level-school").removeClass("prevent-event");
    Promise.all([
      axios.get(
        `${apiLocal}/api/schools/filter?q=${refSearch.current.value}&type=${refType.current.value}&major=${refMajor.current.value}&level=${refLevel.current.value}`
      ),
    ])
      .then(([school]) => {
        console.log(school.data);
        setData(school.data.schools || []);
        $("#search").removeClass("prevent-event");
        $("#icon-filter-school").addClass("hidden");
        $("#select-type-school").removeClass("prevent-event");
        $("#select-major-school").removeClass("prevent-event");
        $("#select-level-school").removeClass("prevent-event");
      })
      .catch();
  };
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
              id="btn-filter-school"
                onClick={filterSchool}
                style={{ display: "flex", margin: "0 10px" }}
                className="btn btn-success"
              >
                L???c
                <i
                  style={{ marginLeft: "4px" }}
                  id="icon-filter-school"
                  className="hidden now-ui-icons loader_refresh spin"
                ></i>
              </button>
              <button
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#333",
                  borderRadius: "6px",
                }}
              >
                <i className="fas fa-search"></i>
              </button>
              <input
                ref={refSearch}
                id="search-school"
                type="text"
                name="location"
                style={{
                  margin: "20px 20px 20px 0",
                  border: "none",
                  height: "40px",
                }}
                placeholder="T??n, ?????a ch???, m?? tr?????ng"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <label>Theo c???p b???c</label>
                <select
                  defaultValue="all"
                  className="select-school"
                  ref={refLevel}
                  id="select-level-school"
                  type="select"
                  style={{ margin: "0 10px" }}
                  name="select-level-school"
                  data-testid="select-level-school"
                >
                  <option value="all">
                    T???t c???
                  </option>
                  <option value="1" data-testid="select-level-school-option">?????i h???c</option>
                  <option value="2" data-testid="select-level-school-option">Cao ?????ng</option>
                  <option value="3" data-testid="select-level-school-option">Trung c???p</option>
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <label>Theo ng??nh h???c</label>
                <select
                  className="select-school"
                  ref={refMajor}
                  id="select-major-school"
                  type="select"
                  style={{ margin: "0 10px" }}
                  name="select-major-school"
                  defaultValue="all"
                  data-testid="select-major-school"
                >
                  <option value="all">
                    T???t c???
                  </option>
                  <option value="1" data-testid="select-major-school-option">Khoa h???c - K??? thu???t</option>
                  <option value="2" data-testid="select-major-school-option">X?? h???i - Nh??n v??n</option>
                  <option value="3" data-testid="select-major-school-option">Y d?????c</option>
                  <option value="4" data-testid="select-major-school-option">Kinh t???- Qu???n l??</option>
                  <option value="5" data-testid="select-major-school-option">Ch??nh tr???- Qu??n s???</option>
                  <option value="6" data-testid="select-major-school-option">S?? ph???m</option>
                  <option value="7" data-testid="select-major-school-option">N??ng khi???u</option>
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <label>Theo th??? lo???i</label>
                <select
                  className="select-school"
                  ref={refType}
                  id="select-type-school"
                  type="select"
                  style={{ margin: "0 10px" }}
                  name="select-type-school"
                  defaultValue="all"
                  data-testid="select-type-school"
                >
                  <option value="all">
                    T???t c???
                  </option>
                  <option value="1" data-testid="select-type-school-option">C??ng l???p</option>
                  <option value="2" data-testid="select-type-school-option">D??n l???p</option>
                  <option value="3" data-testid="select-type-school-option">B??n c??ng</option>
                </select>
              </div>
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
