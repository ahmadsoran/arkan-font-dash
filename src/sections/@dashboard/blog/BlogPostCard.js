import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import FontDownloadTwoToneIcon from '@mui/icons-material/FontDownloadTwoTone';
function BlogPostCard(props) {
  return (

    <Grid item xs={12} sm={6} md={4} >

      <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

      }}>
        <Box>

          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} color='error' onClick={props.onClick}>
            <DeleteForeverTwoToneIcon color='error' />
          </IconButton>
          <CardHeader sx={props.fontnameStyle} title={props.title} subheader={props.date} />
          <CardContent>
            <Grid display='flex' justifyContent='space-evenly' >
              <Box>
                <FontDownloadTwoToneIcon color='warning' fontSize="large" />
                <br />
                <Typography textAlign='center' variant="body1"  >
                  {props.fonts}
                </Typography>
              </Box>

              <Box>
                <DownloadForOfflineTwoToneIcon color='success' fontSize="large" />
                <br />
                <Typography variant="body1" textAlign='center' color='success'>
                  {props.downloads}
                </Typography>
              </Box>
            </Grid>

            <Box py={2}>
              <Typography sx={props.sampleStyle} variant="body1" textAlign='center' color='success'>
                {props.textSample}
              </Typography>
            </Box>

          </CardContent>
        </Box>
        <Grid m={2} display='flex'>
          <Avatar src={props.imageUrl} sx={{ width: 30, height: 30, mx: 1, mt: 1 }} />
          <div>
            <Typography variant="body1" color="textSecondary" component="h6">
              {props.username}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p">
              {props.userRole}
            </Typography>
          </div>
        </Grid>

      </Card>
    </Grid >
  )
}

export default BlogPostCard