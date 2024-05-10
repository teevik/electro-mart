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
import { Text, TextButton } from "./components/text";
import { useUserServicePostUserRegister } from "../openapi/queries";
import { useAuth } from "./state/auth";
import { ApiError, ReigsterUserBody } from "../openapi/requests";
import { Spinner } from "./components/Spinner";

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLoginDialog: () => void;
}

export function SignupDialog(props: SignupDialogProps) {
  const { isOpen, onClose, onOpenLoginDialog } = props;

  const { login } = useAuth();
  const registerMutation = useUserServicePostUserRegister();

  // On success
  useEffect(() => {
    if (registerMutation.isSuccess) {
      login(registerMutation.data);
      onClose();
    }
  }, [registerMutation.isSuccess]);

  const isLoading = registerMutation.isPending;

  function onSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formBody = Object.fromEntries(formData) as any as ReigsterUserBody;

    const requestBody: ReigsterUserBody = {
      ...formBody,
      is_admin: false,
    };

    registerMutation.mutate({ requestBody });
  }

  let errorMessage: string | null;
  if (registerMutation.isError) {
    errorMessage = (registerMutation.error as ApiError).message;
  } else {
    errorMessage = null;
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Sign Up for Electro Mart</DialogTitle>

      <form onSubmit={onSubmitForm}>
        <DialogBody>
          <FieldGroup>
            <Field disabled={isLoading}>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                required
                placeholder="johndoe@example.com"
              />
            </Field>
            <Field disabled={isLoading}>
              <Label>Password</Label>
              <Input
                name="password"
                required
                type="password"
                placeholder="******"
              />
            </Field>
            <Field disabled={isLoading}>
              <Label>First name</Label>
              <Input name="first_name" required placeholder="John" />
            </Field>
            <Field disabled={isLoading}>
              <Label>Last name</Label>
              <Input name="last_name" required placeholder="Doe" />
            </Field>
            <Field disabled={isLoading}>
              <Label>Street</Label>
              <Input name="street" required placeholder="123 Maple Avenue" />
            </Field>
            <Field disabled={isLoading}>
              <Label>Postal code</Label>
              <Input name="postal_code" required placeholder="12345" />
            </Field>
            <Field disabled={isLoading}>
              <Label>City</Label>
              <Input name="city" required placeholder="Springfield" />
            </Field>
          </FieldGroup>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </DialogBody>

        <DialogActions className="justify-between">
          <Text>
            Already have an account?{" "}
            <TextButton onClick={onOpenLoginDialog}>Log In</TextButton>
          </Text>
          <Button type="submit" disabled={isLoading}>
            Sign Up
            {isLoading && <Spinner />}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
