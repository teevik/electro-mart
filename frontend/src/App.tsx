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
import { OrdersPage } from "./pages/OrdersPage";
import { OrderPage } from "./pages/OrderPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { CategoryPage } from "./pages/CategoryPage";
import { BrandsPage } from "./pages/BrandsPage";
import { BrandPage } from "./pages/BrandPage";

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
          {({ id }) => (
            <Page title="Product" backHref="/">
              <ProductPage id={id} />
            </Page>
          )}
        </Route>

        <Route path="/categories">
          <Page title="Categories">
            <CategoriesPage />
          </Page>
        </Route>

        <Route path="/categories/:id">
          {({ id }) => (
            <Page title="Category" backHref="/categories">
              <CategoryPage id={id} />
            </Page>
          )}
        </Route>

        <Route path="/brands">
          <Page title="Brands">
            <BrandsPage />
          </Page>
        </Route>

        <Route path="/brands/:id">
          {({ id }) => (
            <Page title="Brand" backHref="/brands">
              <BrandPage id={id} />
            </Page>
          )}
        </Route>

        <Route path="/brands">
          <Page title="Brands">awd</Page>
        </Route>

        {isLoggedIn && (
          <>
            <Route path="/account">
              <Page title="Account">
                <AccountPage authUser={user} />
              </Page>
            </Route>

            <Route path="/orders">
              <Page title="Orders">
                <OrdersPage />
              </Page>
            </Route>

            <Route path="/orders/:id">
              {({ id }) => <OrderPage id={id} />}
            </Route>

            <Route path="/cart">
              <Page title="Cart">
                <CartPage />
              </Page>
            </Route>
          </>
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
