
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
// components
import Page from '../components/Page';

import {

  AppCurrentVisits,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { useGetBugsQuery, useGetFontsDataQuery, useGetLogsQuery, useProfileQuery, useVisitsQuery } from 'src/app/appApi';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const { data } = useProfileQuery();
  const { data: DownloadsData } = useGetFontsDataQuery()
  const { data: getVisitors } = useVisitsQuery()
  const { data: BugsData } = useGetBugsQuery()
  const { data: LogsData, isError } = useGetLogsQuery()
  const [AllDownloads, setAllDownloads] = useState(0)
  const [AllFonts, setAllFonts] = useState(0)
  const [LoadMore, setLoadMore] = useState(25)
  useEffect(() => {
    if (DownloadsData) {
      // get sum off all downloads
      let sum = 0;
      DownloadsData?.map(item => {
        return sum += item.DownloadedTimes
      })
      setAllDownloads(sum)
      setAllFonts(DownloadsData?.length)
    }
  }, [DownloadsData])
  const sortedArray = []
  let sumVisitors = 0;
  const sortedByVisits = getVisitors?.map(item => {
    sumVisitors += item.visits
    return {
      label: item.location,
      value: item.visits,
    }
  }).sort((a, b) => {
    return b.value - a.value
  })
  if (sortedByVisits) {
    sortedArray.push(...sortedByVisits)
  }

  return (
    <Page title="Arkan Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          <span style={{ opacity: .7 }}>
            Hi, Welcome back &nbsp;
          </span>
          {data && data?.name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Uploaded Fonts" total={AllFonts} icon={<FontDownloadIcon width={24} height={24} />} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Visits" total={sumVisitors} color="info" icon={<VisibilityIcon width={24} height={24} />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Downloads" total={AllDownloads} color="success" icon={<DownloadTwoToneIcon width={24} height={24} />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bugs Report" total={BugsData ? BugsData?.length : 0} color="error" icon={<BugReportIcon width={24} height={24} />} />
          </Grid>


          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={sortedArray?.slice(0, 4) || [{ label: 'no data', value: 0 }]
              }
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Visits"
              subheader="Top Countries Visits"
              chartData={sortedArray?.slice(0, 15).reverse() || [{ label: 'no data', value: 0 }]}

            />
          </Grid>
          <Grid item xs={12}  >
            <TableContainer component={Paper} >
              <Typography variant="h6" textAlign='center' color='error' bgcolor='#ff06061f'>
                Bugs Reports
              </Typography>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">#</TableCell>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Message</TableCell>
                    <TableCell align="center">Date</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {BugsData && BugsData?.map((row, i) => (
                    <TableRow
                      key={row._id}
                      sx={{ border: 0 }}
                      hover={true}
                    >

                      <TableCell align="left">
                        {i + 1}
                      </TableCell>
                      <TableCell align="center">
                        {row.title}
                      </TableCell>
                      <TableCell align="center">{row.message}</TableCell>
                      <TableCell sx={{ letterSpacing: 1 }} align="center">{moment(row.date).format('DD/M/YYYY h:mm A')}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>
          {
            !isError &&
            <Grid item xs={12}  >
              <TableContainer sx={{
                maxHeight: 'calc(100vh - 300px)',
              }} component={Paper} >
                <Typography variant="h6" textAlign='center' color='error' bgcolor='#ffc9061f'>
                  Logs Data
                </Typography>
                <Table sx={{ minWidth: 650, }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">#</TableCell>
                      <TableCell align="center">Level</TableCell>
                      <TableCell align="center">Message</TableCell>
                      <TableCell align="center">Date</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {LogsData && LogsData?.map((row, i) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          border: 0,
                          backgroundColor: row.level === 'error' ? '#ff060655' : row.level === 'info' ? '#067aff1f' : '#ffffffff'

                        }}

                      >

                        <TableCell align="left">
                          {i + 1}
                        </TableCell>
                        <TableCell align="center">
                          {row.level}
                        </TableCell>
                        <TableCell align="center">{row.message}</TableCell>
                        <TableCell sx={{ letterSpacing: 1 }} align="center">{moment(row.timestamp).format('DD/M/YYYY h:mm A')}</TableCell>

                      </TableRow>
                    )).reverse().slice(0, LoadMore)}
                  </TableBody>
                </Table>
                {
                  LogsData?.length > 25 && <Button variant="contained" fullWidth color="primary" onClick={() => setLoadMore(LoadMore + 20)}>Load More</Button>
                }

              </TableContainer>

            </Grid>
          }
        </Grid>
      </Container>
    </Page>
  );
}
