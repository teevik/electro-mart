import { api } from "../api";
import { Table, TableBody, TableCell, TableRow } from "../components/table";
import { AuthenticatedUser } from "../state/auth";

interface AccountPageProps {
  authUser: AuthenticatedUser;
}

export function AccountPage(props: AccountPageProps) {
  const { authUser } = props;

  const query = api.user.getUser.useSuspenseQuery(undefined);

  const {
    id,
    email,
    first_name,
    last_name,
    street,
    postal_code,
    city,
    is_admin,
  } = query.data;

  return (
    <Table className="max-w-96">
      <TableBody>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>{id}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>
            {first_name} {last_name}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>{email}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Street</TableCell>
          <TableCell>{street}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Postal code</TableCell>
          <TableCell>{postal_code}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>City</TableCell>
          <TableCell>{city}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Is admin</TableCell>
          <TableCell>{is_admin ? "Yes" : "No"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
