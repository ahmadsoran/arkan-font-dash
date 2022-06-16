import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { useProfileQuery } from './app/appApi';
import { removeToken } from './feature/tokenSlice';

// ----------------------------------------------------------------------

export default function App() {
  const { error } = useProfileQuery()
  const token = useSelector(state => state.tokenSlice.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      return navigate('/login')
    }

    if (error?.data?.error === 'invalid token') {
      console.log('removeToken')
      dispatch(removeToken())
      return navigate('/login')
    }
  }, []) // eslint-disable-line

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
