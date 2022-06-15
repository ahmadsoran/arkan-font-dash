
import { Link, } from 'react-router-dom';
// material
import {
  Table,

  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  Alert,
  AlertTitle,
  TableHead,
  Paper,
  Button,
  IconButton,
  Avatar,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import Page from '../components/Page';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useDeleteByIdMutation, useEditUserRoleMutation, useGetUsersQuery, useProfileQuery } from 'src/app/appApi';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { LoadingButton } from '@mui/lab';
import { RegisterForm } from 'src/sections/auth/register';
import { useSelector } from 'react-redux';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function User() {
  const { data } = useProfileQuery()
  const { data: UsersAdmin, refetch } = useGetUsersQuery()
  const [open, setOpen] = React.useState(false);
  const [ShowRegForm, setShowRegForm] = React.useState(false);
  const [EditedRole, setEditedRole] = React.useState({
    userIdForRole: '',
    role: '',
  });
  const [UserDataDelete, setUserDataDelete] = React.useState({
    id: '',
    name: '',
    username: '',
  })
  const [sendDeleteId, { data: deleteData, isLoading }] = useDeleteByIdMutation()
  const [sendEditedRole, { isLoading: editIsLoading, isSuccess, isError: isEditErr }] = useEditUserRoleMutation()

  const handleClickOpen = (e) => {
    setOpen(true);
    setUserDataDelete({
      id: e.currentTarget.getAttribute('data-id'),
      name: e.currentTarget.getAttribute('data-name'),
      username: e.currentTarget.getAttribute('data-username'),

    })
  };
  const RefetchData = useSelector(state => state.RefetchData.refetch)
  React.useEffect(() => {
    refetch()
    setOpen(false)
    setShowRegForm(false)
    setEditedRole({
      userIdForRole: '',
      role: '',
    })

  }, [deleteData, RefetchData, isSuccess])
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteById = () => {
    sendDeleteId({
      userIdForDelete: UserDataDelete.id,
    })
  }


  if (data) {
    if (data.role === 'admin' || data.role === 'dev') {
      return (
        <Page title="User">
          <Container style={{
            display: 'grid',
            placeItems: 'center',
          }}>

            <Button onClick={() => setShowRegForm(!ShowRegForm)} variant="outlined" sx={{ m: 2 }} startIcon={<AccountCircleRoundedIcon />
            }>
              Add Users

            </Button>
            <Container sx={{ my: 4 }}>
              {
                ShowRegForm && <RegisterForm />
              }
            </Container>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">email</TableCell>
                    <TableCell align="center">name</TableCell>
                    <TableCell align="center">username</TableCell>
                    <TableCell align="center">Phone Number</TableCell>
                    <TableCell align="center">Role</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {UsersAdmin && UsersAdmin?.map((row, i) => (
                    <TableRow
                      key={row._id}
                      sx={{ border: 0 }}
                    >

                      <TableCell component="th" scope="row">
                        <Avatar
                          src={row.image}
                          sx={{ width: 50, height: 50 }}

                        />
                      </TableCell>
                      <TableCell align="center">
                        {row.email}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.username}</TableCell>
                      <TableCell align="center">{row.phoneNumber}</TableCell>
                      <TableCell align="center">
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel id="demo-simple-select-required-label">Role</InputLabel>
                          <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            label="Role *"
                            name='role'
                            value={EditedRole?.userIdForRole === row._id ? EditedRole.role : !editIsLoading ? row.role : EditedRole.role}
                            onChange={(e) => {
                              setEditedRole({
                                userIdForRole: row._id,
                                role: e.target?.value,
                              })
                            }}
                            disabled={EditedRole?.userIdForRole === row._id ? false : true}
                          >

                            <MenuItem selected value='moderator'>moderator</MenuItem>
                            <MenuItem value='admin'>admin</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="large" color='error'
                          data-id={row._id}
                          data-name={row.name}
                          data-username={row.username}
                          onClick={handleClickOpen}>
                          <DeleteForeverIcon />
                        </IconButton>
                        <IconButton
                          size="large"
                          onClick={() => {
                            setEditedRole({
                              userIdForRole: row._id,
                              role: row.role,
                            })
                          }}
                          color={EditedRole?.userIdForRole === row._id ? 'primary' : 'default'}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {
              EditedRole.userIdForRole !== '' && (<LoadingButton loading={editIsLoading} onClick={() => sendEditedRole({ userIdForRole: EditedRole.userIdForRole, role: EditedRole.role }).unwrap()} variant="outlined" color={isEditErr ? 'error' : 'primary'} sx={{ my: 3 }} startIcon={<SaveAsTwoToneIcon />} />)
            }


          </Container>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Delete &nbsp;
              <span style={{ color: 'darkred' }}>
                {UserDataDelete.username}
              </span>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Do you want to delete {UserDataDelete.name} ?

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Abort</Button>

              <LoadingButton
                loading={isLoading}
                variant="text"
                color='error' onClick={handleDeleteById}
              >
                Delete
              </LoadingButton>

            </DialogActions>
          </Dialog>
        </Page >
      );
    }
    else {
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Only admins can access this page <Link to='/dashboard/app'>Go Back</Link>
        </Alert>
      )
    }
  }

}
