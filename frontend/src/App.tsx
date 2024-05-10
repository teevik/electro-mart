import { Route, Switch } from "wouter";
import { NavBar } from "./NavBar";
import { Page } from "./Page";
import { Text, TextLink } from "./components/text";
import { useState } from "react";
import { LoginDialog } from "./LoginDialog";
import { SignupDialog } from "./SignupDialog";
import { AccountPage } from "./pages/AccountPage";
import { useAuth } from "./state/auth";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";

type ShownDialog = "none" | "login" | "signup";

function App() {
  let [openDialog, setOpenDialog] = useState<ShownDialog>("none");

  const { isLoggedIn, user } = useAuth();

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
          <Page title="Products">
            <ProductsPage />
          </Page>
        </Route>

        <Route path="/products/:id">
          {({ id }) => <ProductPage id={id} />}
        </Route>

        <Route path="/categories">
          <Page title="Categories">awd</Page>
        </Route>
        <Route path="/brands">
          <Page title="Brands">awd</Page>
        </Route>
        {isLoggedIn && (
          <Route path="/account">
            <Page title="Account">
              <AccountPage user={user} />
            </Page>
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/cart">
            <Page title="Cart">
              <CartPage />
            </Page>
          </Route>
        )}

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
