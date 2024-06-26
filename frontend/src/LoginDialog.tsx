import { useEffect } from "react";
import { Button } from "./components/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "./components/dialog";
import { ErrorMessage, Field, FieldGroup, Label } from "./components/fieldset";
import { Input } from "./components/input";
import { Spinner } from "./components/Spinner";
import { Text, TextButton } from "./components/text";
import { useAuth } from "./state/auth";
import { api } from "./api";
import { components } from "../openapi/openapi";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignupDialog: () => void;
}

type LoginUserBody = components["schemas"]["LoginUserBody"];

export function LoginDialog(props: LoginDialogProps) {
  const { isOpen, onClose, onOpenSignupDialog } = props;

  const { login } = useAuth();
  const loginMutation = api.user.loginUser.useMutation();

  // On success
  useEffect(() => {
    if (loginMutation.isSuccess) {
      login(loginMutation.data);
      onClose();
    }
  }, [loginMutation.isSuccess]);

  const isLoading = loginMutation.isPending;

  function onSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const requestBody = Object.fromEntries(formData) as LoginUserBody;

    loginMutation.mutate({ body: requestBody });
  }

  let errorMessage: string | null;
  if (loginMutation.isError) {
    errorMessage = "Invalid email or password.";
  } else {
    errorMessage = null;
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Log In to Electro Mart</DialogTitle>

      <form onSubmit={onSubmitForm}>
        <DialogBody>
          <FieldGroup>
            <Field disabled={isLoading}>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                required
                placeholder="user@example.com"
              />
            </Field>
            <Field disabled={isLoading}>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                required
                placeholder="******"
              />
            </Field>
          </FieldGroup>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </DialogBody>

        <DialogActions className="justify-between">
          <Text>
            Don't have an account?{" "}
            <TextButton onClick={() => onOpenSignupDialog()}>
              Sign Up
            </TextButton>
          </Text>
          <Button type="submit" disabled={isLoading}>
            Log In
            {isLoading && <Spinner />}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
