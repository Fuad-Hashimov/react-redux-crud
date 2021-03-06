import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, loadUsers } from "../redux/actions";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useHistory } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  container: {
    width: "90%",
    margin: "auto",
  },
  tableSection: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
});

const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Home() {
  const classes = useStyles();
  let dispatch = useDispatch();
  let history = useHistory();
  let { users } = useSelector((state) => state.users);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the user ???")) {
      dispatch(deleteUsers(id));
    }
  };

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <div>
      <div className={useButtonStyles.root}>
        <Button
          onClick={() => history.push("/addUser")}
          variant="contained"
          color="primary"
        >
          Add User
        </Button>
      </div>

      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              {/* <StyledTableCell align="center">
                Address City Street
              </StyledTableCell> */}
              <StyledTableCell align="center">Phone</StyledTableCell>

              <StyledTableCell align="center">Website</StyledTableCell>

              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                {/* <StyledTableCell align="center">
                  {user.address.city}
                </StyledTableCell> */}
                <StyledTableCell align="center">{user.phone}</StyledTableCell>
                <StyledTableCell align="center">{user.website}</StyledTableCell>
                <StyledTableCell className={classes.root}>
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    <Button onClick={()=> history.push(`/editUser/${user.id}`)}>Edit</Button>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      style={{ color: "red" }}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;
