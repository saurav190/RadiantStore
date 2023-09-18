import React from "react";
import "./assets/css/tailwind.css";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SnackbarProvider } from "notistack";
import { MaterialDesignContent } from "notistack";
import styled from "@emotion/styled";

function App() {
  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    "&.notistack-MuiContent-success": {
      backgroundColor: "#385A64",
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: "#970C0C",
    },
  }));

  return (
    <>
      <div className="App">
        <Provider store={store}>
          <SnackbarProvider
            Components={{
              success: StyledMaterialDesignContent,
              error: StyledMaterialDesignContent,
            }}
            maxSnack={2}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Router />
          </SnackbarProvider>
        </Provider>
      </div>
    </>
  );
}

export default App;
