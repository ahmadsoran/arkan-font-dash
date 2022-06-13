import { styled } from '@mui/material/styles';
import { Container, Typography, } from '@mui/material';
import Page from '../components/Page';
import { RegisterForm } from '../sections/auth/register';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));



const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {



  return (
    <Page title="Register">
      <RootStyle>

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Add Users
            </Typography>


            <RegisterForm />

          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
