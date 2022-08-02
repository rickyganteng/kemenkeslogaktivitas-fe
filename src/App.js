import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
import BasicReact from "./pages/learning/BasicReact/BasicReact";
import BasicHome from "./pages/learning/Home/Home";
import BasicRedux from "./pages/learning/BasicRedux/BasicRedux";


import Home from "./pages/main/Home/Home"
import DataUser from "./pages/main/DataUser/DataUser"
import DataLaporanAktivitas from "./pages/main/DataLaporanAktivitas/DataLaporanAktivitas";
import DataLaporanAktivitasHariIni from "./pages/main/DataLaporanAktivitasHariIni/DataLaporanAktivitasHariIni"
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>

              <PublicRoute
                restricted={true}
                path="/login"
                exact
                component={Login}
              />
              <PublicRoute
                path="/learning/basic-react"
                exact
                component={BasicReact}
              />
              <PrivateRoute
                path="/learning/basic-home"
                exact
                component={BasicHome}
              />
              <Route
                path="/learning/basic-redux"
                exact
                component={BasicRedux}
              />
              {/* /// */}
              <PrivateRoute
                restricted={true}
                path="/"
                exact
                component={Home}
              />
              <PrivateRoute
                restricted={true}
                path="/datauser"
                exact
                component={DataUser}
              />
              <PrivateRoute
                restricted={true}
                path="/laporanaktivitas"
                exact
                component={DataLaporanAktivitas}
              />
              <PrivateRoute
                restricted={true}
                path="/laporanaktivitashariini"
                exact
                component={DataLaporanAktivitasHariIni}
              />

            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
