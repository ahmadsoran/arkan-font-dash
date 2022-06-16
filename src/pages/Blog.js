import { Link as RouterLink } from 'react-router-dom';
import React from 'react'
// material
import { Grid, Button, Container, Stack, Typography, Skeleton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPostCard } from '../sections/@dashboard/blog';
// mock
import { useGetFontsDataQuery, useDeleteFontsByIdQuery } from 'src/app/appApi';
import moment from 'moment'
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
async function loadFonts(fontname, fontUrl) {
  const font = new FontFace(fontname, `url(${fontUrl})`);
  // wait for font to be loaded
  await font.load();
  // add font to document
  document.fonts.add(font);
  // enable font with CSS class
  console.log(font + 'loaded')
}

export default function Blog() {
  const [params, setParams] = React.useState()
  const [id, setID] = React.useState({
    id: '',
    title: '',
  })
  const [openDialog, setOpenDialog] = React.useState(false)
  const { data, refetch: GetFontsData, isFetching } = useGetFontsDataQuery()
  const { isLoading, isError, error, data: DeleteData } = useDeleteFontsByIdQuery(params)
  React.useEffect(() => {
    GetFontsData()
  }, []) // eslint-disable-line
  React.useEffect(() => {
    if (DeleteData) {
      GetFontsData()
      setOpenDialog(false)

    }
  }, [DeleteData]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (data) {
      data?.forEach((post) => {
        loadFonts(post?.name?.english, post?.regular)
      })
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Page title="Fonts">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Fonts
          </Typography>
          <Button variant="contained" disabled={isLoading} component={RouterLink} to="/dashboard/uploadFonts" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Font
          </Button>
        </Stack>



        {
          isFetching && (
            <>
              <Skeleton variant="text" />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rectangular" width={210} height={118} />
            </>
          )
        }
        <Grid container spacing={3} >
          {data && data?.map((post, index) => {
            return (
              <BlogPostCard
                key={index}
                title={
                  <Typography
                    fontFamily={`${post?.name?.english}`}
                    variant="h6" >
                    {post?.name?.english} | {post?.name?.kurdish}
                  </Typography>
                }
                onclick={() => {
                  setOpenDialog(!openDialog)
                  setID({
                    id: post?._id,
                    title: post?.name?.english,
                  })
                }}
                date={moment(post?.uploadDate).fromNow()}
                fonts={post?.styles?.length + 1}
                downloads={post?.DownloadedTimes}
                imageurl={post.uploader?.image}
                username={post.uploader?.username || 'Unknowing User'}
                userrole={post.uploader?.role || 'null'}
                textsample={post?.testText}
                samplestyle={{ fontFamily: post?.name?.english, fontSize: 30 }}

              />
            )

          }).reverse()}
        </Grid>
      </Container>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(!openDialog)}
        aria-describedby="alert-dialog-slide-description"
        sx={{ backgroundColor: isError ? '#ff000061' : '#ffffff50' }}
      >
        <DialogTitle>{isError ? 'Error' : `Do you want to delete ${id.title} font ?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {isError ? <Typography variant="p">{error?.data?.error}</Typography> : <Typography variant="p">By clicking on YES this font will be deleted from database</Typography>}

          </DialogContentText>
        </DialogContent>
        {
          !isError &&
          <DialogActions>
            <Button onClick={() => setOpenDialog(!openDialog)}>no</Button>
            <Button onClick={() => {
              setParams(id.id)

            }
            }>yes</Button>
          </DialogActions>
        }
      </Dialog>
    </Page>
  );
}
