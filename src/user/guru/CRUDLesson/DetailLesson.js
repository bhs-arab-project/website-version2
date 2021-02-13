import React, { useState } from "react";
import { Button, Container } from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar";
import { API_URL } from "utils/constants";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BulletList } from "react-content-loader";
import AvatarWithText from "components/loader/loaderAvatarWithText";
import DetailHeader from "components/Headers/DetailHeader";
import DefaultFooter from "components/Footers/DefaultFooter";

const MyBulletListLoader = () => <BulletList />;

const DetailLesson = () => {
  let { id } = useParams();
  let [detailLesson, setDetailLesson] = React.useState([]);
  const [load, setLoad] = useState(true);

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran/${id}`)
      .then((response) => {
        setLoad(false);
        setDetailLesson(response.data);
      })
      .catch((error) => {
        let message = error.response;
        console.log(message.data.errors);
      });
  }

  React.useEffect(() => {
    setLoad(true);
    fetchData();
  }, [id]);

  let pageHeader = React.createRef();

  // const detailLesson = this;
  return (
    <div>
      <IndexNavbar />
      <div className="wrapper allButFooter">
        <DetailHeader
          header={detailLesson.pelajaran}
          subHeader={detailLesson.deskripsi}
          img={require("assets/img/my-bab.jpg")}
        />
        <Container className="mt-4">
          {load === false ? (
            detailLesson?.chapter?.map((list, index) => {
              if (list.length === 0) {
                return (
                  <>
                    <span>tidak ada data</span>
                  </>
                );
              } else {
                return (
                  <div class="card rounded" key={index}>
                    <div class="card-body">
                      <div className="row">
                        <div className="col-md-10 col-xs-2 col-sm-3 d-inline">
                          <div className="row">
                            <div className="col-md-1 col-xs-3 col-sm-2 mt-1">
                              <img
                                // width="50%"
                                alt="..."
                                className="rounded-circle "
                                src={require("assets/img/book2.png")}
                              ></img>
                            </div>
                            <div className="col-md-5 col-xs-4 col-sm-5 mt-3">
                              {list.judul_bab}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2 col-xs-1 col-sm-1 px-1 text-right d-inline"></div>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <MyBulletListLoader />
          )}
        </Container>
      </div>
      <DefaultFooter />
    </div>
  );
};

export default DetailLesson;
