import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import FontDownloadTwoToneIcon from '@mui/icons-material/FontDownloadTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import FontEdit from 'src/components/FontEdit';
import SaveIcon from '@mui/icons-material/Save';
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

          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} color='error' onClick={props.onclick}>
            <DeleteForeverTwoToneIcon color='error' />
          </IconButton>
          <IconButton sx={{ position: 'absolute', top: 0, right: 40 }} onClick={props.editclick} color='success' >
            {
              props.save ? <SaveIcon color={props.editcolor} disabled={props.editdisable} /> : <EditIcon color={props.editcolor} />
            }
          </IconButton>
          <CardHeader sx={props.titleStyle} title={props.title} subheader={props.date} />
          <CardContent>
            {props.editmode ?
              <FontEdit />
              :
              <>
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
                  <Typography sx={props.samplestyle} variant="body1" textAlign='center' color='success'>
                    {props.textsample}
                  </Typography>
                </Box>
              </>

            }
            {
              props.iserr && <Typography variant="body1" textAlign='center' color='error'>{props.errmsg}</Typography>
            }
          </CardContent>
        </Box>
        <Grid m={2} display='flex'>
          <Avatar src={props.imageurl} sx={{ width: 30, height: 30, mx: 1, mt: 1 }} />
          <div>
            <Typography variant="body1" color="textSecondary" component="h6">
              {props.username}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p">
              {props.userrole}
            </Typography>
          </div>
        </Grid>
      </Card>
    </Grid >
  )
}

export default BlogPostCard