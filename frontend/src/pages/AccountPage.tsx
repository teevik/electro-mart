import { Table, TableBody, TableCell, TableRow } from "../components/table";
import { AuthenticatedUser } from "../state/auth";

interface AccountPageProps {
  user: AuthenticatedUser;
}

export function AccountPage(props: AccountPageProps) {
  const { user } = props;
  const { id, email, first_name, last_name } = user;

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
      </TableBody>
    </Table>
  );
}
