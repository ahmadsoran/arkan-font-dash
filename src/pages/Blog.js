import { Link as RouterLink, useParams, useSearchParams } from 'react-router-dom';
import React, { useState } from 'react'
// material
import { Grid, Button, Container, Stack, Typography, Skeleton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import { useGetFontsDataQuery, useDeleteFontsByIdQuery } from 'src/app/appApi';
import moment from 'moment'
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Blog() {
  const [params, setParams] = React.useState()
  const [id, setID] = React.useState({
    id: '',
    title: '',
  })
  const [openDialog, setOpenDialog] = React.useState(false)
  const { data, refetch: GetFontsData, isFetching } = useGetFontsDataQuery()
  const { isLoading, isSuccess, isError, error } = useDeleteFontsByIdQuery(params)
  React.useEffect(() => {
    GetFontsData()
  }, [])
  React.useEffect(() => {
    if (isSuccess) {
      GetFontsData()
      setOpenDialog(false)

    }
  }, [isSuccess])
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

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
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
        <Grid container spacing={3}>
          {data && data?.map((post, index) => (
            <BlogPostCard
              key={index}
              title={post.name}
              onClick={() => {
                setOpenDialog(!openDialog)
                setID({
                  id: post._id,
                  title: post.name,
                })
              }}
              date={moment(post.uploadDate).fromNow()}
              fonts={post.styles.length + 1}
              downloads={post.DownloadedTimes}
              imageUrl={post.uploader?.image}
              username={post.uploader?.username || 'Unknowing User'}
              userRole={post.uploader?.role || 'null'}
            />
          ))}
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
