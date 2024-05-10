import { Route, Switch } from "wouter";
import { NavBar } from "./NavBar";
import { Page } from "./Page";
import { Text, TextButton, TextLink } from "./components/text";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "./components/dialog";
import { Field, FieldGroup, Label } from "./components/fieldset";
import { Input } from "./components/input";
import { Button } from "./components/button";
import { useEffect, useState } from "react";
import { useUserServicePostUserLogin } from "../openapi/queries";
import { useAuthToken } from "./hooks/useAuth";
import { LoginDialog } from "./LoginDialog";
import { SignupDialog } from "./SignupDialog";

type ShownDialog = "none" | "login" | "signup";

function App() {
  let [openDialog, setOpenDialog] = useState<ShownDialog>("none");

  // const auth = useAuthToken();
  // useEffect(() => {
  //   auth.login({ email: "user@example.com", password: "string" });
  // }, []);

  return (
    <>
      <NavBar
        onClickLogin={() => setOpenDialog("login")}
        onClickSignup={() => setOpenDialog("signup")}
      />

      <LoginDialog
        isOpen={openDialog == "login"}
        onClose={() => setOpenDialog("none")}
        onOpenSignupDialog={() => setOpenDialog("signup")}
      />

      <SignupDialog
        isOpen={openDialog == "signup"}
        onClose={() => setOpenDialog("none")}
        onOpenLoginDialog={() => setOpenDialog("login")}
      />

      <Switch>
        <Route path="/">
          <Page title="Products">awd</Page>
        </Route>
        <Route path="/categories">
          <Page title="Categories">awd</Page>
        </Route>
        <Route path="/brands">
          <Page title="Brands">awd</Page>
        </Route>

        {/* Default route in a switch */}
        <Route>
          <Page title="Page Not Found">
            <Text>
              The page you're looking for doesn't exist.
              <br />
              <TextLink href="/">Go back home</TextLink>
            </Text>
          </Page>
        </Route>
      </Switch>
    </>
  );
}

export default App;
