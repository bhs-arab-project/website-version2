// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";

import React, { useState } from "react";
import axios from "axios";
import Spinner from "reactstrap/lib/Spinner";
import { useAlert } from "react-alert";
import { API_URL } from "utils/constants";
import { validator } from "validator";

export default function SignUpPage() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const alert = useAlert();

  const required = (value) => {
    if (!value.toString().trim().length) {
      // We can return string or jsx as the 'error' prop for the validated Component
      return "require";
    }
  };

  const emailVal = (value) => {
    if (!validator.isEmail(value)) {
      return `${value} is not a valid email.`;
    }
  };

  const passwordVal = (value, props, components) => {
    // NOTE: Tricky place. The 'value' argument is always current component's value.
    // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
    // But if we're changing 'confirm' component - the condition will always be true
    // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
    if (value !== components["confirm"][0].value) {
      // components['password'][0].value !== components['confirm'][0].value
      // 'confirm' - name of input
      // components['confirm'] - array of same-name components because of checkboxes and radios
      return <span className="error">Passwords are not equal.</span>;
    }
  };

  let bodyFormData = new FormData();
  bodyFormData.set("name", name);
  bodyFormData.set("email", email);
  bodyFormData.set("password", password);
  bodyFormData.set("role", "user");

  // for (var pair of bodyFormData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  const handleSubmit = async (e) => {
    setLoggedIn(true);

    axios({
      method: "post",
      url: `${API_URL}register`,
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        setLoggedIn(false);

        alert.success(
          <div className="notif">
            Registrasi Berhasil, silahkan Cek Email anda
          </div>
        );

        //handle success
        console.log(response);
      })
      .catch(function (response) {
        setLoggedIn(false);
        console.log("error", response);
        if (response === "Error: Network Error at createError") {
          alert.error(
            <div className="notif">Tidak ada koneksi internet, coba lagi</div>
          );
        } else if (response === "Error: Request failed with status code 404") {
          alert.error(
            <div className="notif">
              Gagal Registrasi, silahkan coba lagi, 404 error
            </div>
          );
        }
        // alert.error(<div className="notif">Gagal Registrasi</div>);
      });

    e.preventDefault();
  };

  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/header2.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="6" xl="4">
              <Card className="card-login card-plain">
                <Form className="form" onSubmit={handleSubmit}>
                  <CardHeader className="text-center">
                    <h2>Daftar Akun</h2>
                    <h6 className="text-lowercase font-weight-normal">
                      dartar akunmu sekarang juga!
                    </h6>
                  </CardHeader>
                  <CardBody>
                    <InputGroup className={"no-border input-md"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        validations={[required]}
                        placeholder="Nama"
                        type="text"
                        onInput={(e) => setName(e.target.value)}
                        autofocus
                      ></Input>
                    </InputGroup>
                    <InputGroup className={"no-border input-md"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        validations={[required]}
                        placeholder="Email"
                        type="email"
                        onInput={(e) => setEmail(e.target.value)}
                        autofocus
                      ></Input>
                    </InputGroup>
                    <InputGroup className={"no-border input-md"}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_lock-circle-open"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        validations={[required]}
                        placeholder="Password"
                        type="password"
                        onInput={(e) => setPassword(e.target.value)}
                        autofocus
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    {loggedIn === true ? (
                      <Spinner></Spinner>
                    ) : (
                      <Button
                        block
                        className="btn-round"
                        color="info"
                        // onClick={(e) => e.preventDefault()}
                        size="md"
                      >
                        Daftar
                      </Button>
                    )}
                    <p>
                      <a
                        className="link"
                        href="/"
                        // onClick={(e) => e.preventDefault()}
                      >
                        Sudah Punya Akun? Login
                      </a>
                    </p>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}
