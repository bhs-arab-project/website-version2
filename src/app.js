// import logo from './logo.svg';
import React from "react";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./user/Home.js";
import LoginPage from "auth/LoginPage";
import ForgotPassword from "auth/forgotPassword";
import BabPage from "./user/murid/Bab-page";
import ProfilePage from "./user/Profile-page";
import SignUp from "./auth/SignUpPage.js";
import DetailBab from "./user/murid/Bab-detail.js";
import Materi from "./user/murid/materi.js";
import NotFound from "components/NotFound/notFound";

import CreateLesson from "./user/guru/CRUDLesson/CreateLesson";
import EditLesson from "./user/guru/CRUDLesson/EditLesson";
import DetailLesson from "./user/guru/CRUDLesson/DetailLesson";

import useToken from "./auth/useToken";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import CreateMateri from "./user/guru/CRUDMateri/CreateMateri";
import CreateTeacher from "user/admin/createTeacher.js";
import Quiz from "./user/murid/quiz/quiz";
import CreateQuiz from "./user/guru/CreateQuiz";
import EditMateri from "./user/guru/CRUDMateri/EditMateri";

function App() {
  const { token, setToken } = useToken();
  let history = document.URL.split("/");
  const user = localStorage.getItem("token");
  const userJson = JSON.parse(user);
  const roleUser = userJson?.user?.role;

  // const roleUser = userJson?.token?.role[0];

  if (
    !token &&
    history[history.length - 1] !== "forgot-password" &&
    history[history.length - 1] !== "sign-up"
  ) {
    return <LoginPage setToken={setToken} />;
  }

  const options = {
    position: "bottom left",
    timeout: 5000,
    offset: "30px",
    transition: "scale",
    containerStyle: {
      zIndex: 1000,
    },
  };

  function RoleBasedRouting({ component: Component, roles, ...rest }) {
    return (
      <>
        {roles === roleUser && (
          <Route
            {...rest}
            render={(props) => (
              <>
                <Component {...props} />
              </>
            )}
          />
        )}
        {!roles === roleUser && <Redirect to="/" />}
      </>
    );
  }

  return (
    <div>
      <AlertProvider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />

            {/* start User Route */}

            <RoleBasedRouting
              exact
              path="/bab"
              component={BabPage}
              roles="user"
            />
            <RoleBasedRouting
              exact
              path="/detail-bab/:id"
              component={DetailBab}
              roles="user"
            />

            <RoleBasedRouting
              exact
              path="/quiz"
              component={Quiz}
              roles="user"
            />

            {/* end User route */}

            {/* start Teacher route */}

            <RoleBasedRouting
              exact
              path="/create-lesson"
              component={CreateLesson}
              roles="teacher"
            />
            <RoleBasedRouting
              exact
              path="/create-chapter"
              component={CreateMateri}
              roles="teacher"
            />
            <RoleBasedRouting
              exact
              path="/edit-lesson/:id"
              component={EditLesson}
              roles="teacher"
            />
            <RoleBasedRouting
              exact
              path="/edit-materi/:id"
              component={EditMateri}
              roles="teacher"
            />
            <Route
              path="/detail-lesson/:id"
              render={() => <DetailLesson />}
              roles="teacher"
            />

            <Route
              path="/create-question"
              render={() => <CreateQuiz />}
              roles="teacher"
            />

            <Route
              path="/create-answer"
              render={() => <CreateQuiz />}
              roles="teacher"
            />

            {/* end Teacher route */}
            {/* start Admin route */}
            <Route
              path="/create-teacher"
              render={() => <CreateTeacher />}
              roles="admin"
            />
            {/* end Admin Route */}
            <Route path="/sign-up" render={() => <SignUp />} />
            <Route path="/login-page" render={() => <LoginPage />} />
            <Route
              exact
              path="/profile-page"
              component={ProfilePage}
              userRole={roleUser}
              setToken={setToken}
            />
            <Route exact path="/materi/:id" component={Materi} />
            <Route path="/forgot-password" render={() => <ForgotPassword />} />
            <Route path="*" render={() => <NotFound />} />
          </Switch>
        </BrowserRouter>
      </AlertProvider>
    </div>
  );
}

export default App;
