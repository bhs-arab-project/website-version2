import React, { useState } from "react";

import { API_URL } from "../../utils/constants";
import axios from "axios";

// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import loaderListMateri from "components/loader/loaderListMateri";
import { withAuthUser } from "./../../auth/RouteAccess";
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
defineLordIconElement(loadAnimation);

const ListMateri = () => {
  const [load, setLoad] = useState(true);
  let [lesson, setLesson] = React.useState([]);
  let [listType, setListType] = React.useState("exist");
  let [valB, setValB] = React.useState("Materi Yang Tersedia");
  const user = localStorage.getItem("token");
  const userJson = JSON.parse(user);
  const token = userJson?.token?.token;

  let chapOnlyFilter = lesson?.filter(function (e) {
    // eslint-disable-next-line
    return e.chapter.length != 0;
  });

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setLesson(response.data);
      })
      .catch((error) => {
        setLoad(false);
        let message = error.response;
        return message;
      });
  }

  React.useEffect(() => {
    setLoad(true);
    fetchData();
    // eslint-disable-next-line
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div>
      <div className="section section-tabs text-capitalize">
        <Container>
          <Row>
            <Col>
              <h2>Mulai belajar - ابدا بالتعلم</h2>
            </Col>
            <Col>
              <Dropdown
                className="float-right"
                isOpen={dropdownOpen}
                toggle={toggle}
              >
                <DropdownToggle caret color="info">
                  {valB}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    checked={listType === "exist"}
                    onClick={() => {
                      setListType("exist");
                      setValB("Materi Yang Tersedia");
                    }}
                  >
                    Materi Yang Tersedia
                  </DropdownItem>
                  <DropdownItem
                    checked={listType === "AllChap"}
                    onClick={() => {
                      setListType("AllChap");
                      setValB("Semua Pelajaran");
                    }}
                  >
                    Semua Pelajaran
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>

          <Row className="d-flex justify-space-between">
            {load === false ? (
              lesson.length === 0 ? (
                <div className="container text-left">
                  <p className=" font-weight-bold text-dark">
                    Pengajar Sedang Membuat Kelas Terbaik Untuk Kamu, Tungguin
                    Terus Yaa! <br /> - Al-Qolam
                  </p>
                  <img
                    width="250rem"
                    alt="..."
                    className="rounded float-right"
                    src={require("assets/img/books.png")}
                  ></img>
                </div>
              ) : listType === "exist" ? (
                chapOnlyFilter.map((pelajaran, index) => {
                  return (
                    <Col md="6" xl="4" key={index}>
                      <Card>
                        <CardBody className="ml-2">
                          <CardTitle className="pt-0">
                            <span
                              className={` badge float-right mt-2 ${
                                pelajaran.tingkatan === "mudah"
                                  ? "badge-success"
                                  : pelajaran.tingkatan === "menengah"
                                  ? "badge-warning"
                                  : "badge-danger"
                              }`}
                            >
                              {pelajaran.tingkatan}
                            </span>
                            <h3>{pelajaran.pelajaran}</h3>
                          </CardTitle>
                          <Row>
                            <Col xs="3">
                              <img
                                width="90%"
                                alt="..."
                                className="rounded-circle "
                                src={require("assets/img/muslim.png")}
                              ></img>
                            </Col>
                            <Col xs="auto">
                              <div className="pl-0 pr-0 pb-1">
                                <h6 className="card-title text-left card-trainer-name">
                                  {pelajaran.guru}
                                </h6>{" "}
                                <h6 className="card-title text-left card-trainer-tipe text-info">
                                  Pengajar
                                </h6>
                              </div>
                            </Col>
                          </Row>
                          <Row className="d-flex justify-content-end">
                            <Col xs="auto" className="mt-3">
                              <i className="now-ui-icons files_single-copy-04 "></i>
                              <span>
                                {" "}
                                :{" "}
                                {pelajaran.chapter.length === 0 ? (
                                  <span className="text-danger">
                                    Tidak Ada Materi
                                  </span>
                                ) : (
                                  pelajaran.chapter.length + " Materi"
                                )}{" "}
                              </span>
                            </Col>
                            <Col xs="auto">
                              <Link to={`detail-bab/${pelajaran.id}`}>
                                <Button color="info" className="float-right">
                                  Mulai belajar
                                </Button>
                              </Link>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })
              ) : (
                lesson.map((pelajaran, index) => {
                  return (
                    <Col md="6" xl="4" key={index}>
                      <Card>
                        <CardBody className="ml-2">
                          <CardTitle className="pt-0">
                            <span
                              className={` badge float-right mt-2 ${
                                pelajaran.tingkatan === "mudah"
                                  ? "badge-success"
                                  : pelajaran.tingkatan === "menengah"
                                  ? "badge-warning"
                                  : "badge-danger"
                              }`}
                            >
                              {pelajaran.tingkatan}
                            </span>
                            <h3>{pelajaran.pelajaran}</h3>
                          </CardTitle>
                          <Row>
                            <Col xs="3">
                              <img
                                width="90%"
                                alt="..."
                                className="rounded-circle "
                                src={require("assets/img/muslim.png")}
                              ></img>
                            </Col>
                            <Col xs="auto">
                              <div className="pl-0 pr-0 pb-1">
                                <h6 className="card-title text-left card-trainer-name">
                                  {pelajaran.guru}
                                </h6>{" "}
                                <h6 className="card-title text-left card-trainer-tipe text-info">
                                  Pengajar
                                </h6>
                              </div>
                            </Col>
                          </Row>
                          <Row className="d-flex justify-content-end">
                            <Col xs="auto" className="mt-3">
                              <i className="now-ui-icons files_single-copy-04 "></i>
                              <span>
                                {" "}
                                :{" "}
                                {pelajaran.chapter.length === 0 ? (
                                  <span className="text-danger">
                                    Tidak Ada Materi
                                  </span>
                                ) : (
                                  pelajaran.chapter.length + " Materi"
                                )}{" "}
                              </span>
                            </Col>
                            <Col xs="auto">
                              <Link to={`detail-bab/${pelajaran.id}`}>
                                <Button color="info" className="float-right">
                                  Mulai belajar
                                </Button>
                              </Link>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })
              )
            ) : (
              loaderListMateri()
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default withAuthUser(ListMateri);
