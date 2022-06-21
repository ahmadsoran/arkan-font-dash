import { Grid, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setENname, setKUname, setTestText } from 'src/feature/EditFontInputSlice'

function FontEdit() {
    const dispatch = useDispatch()
    const KUnameSelector = useSelector(state => state.EditFontInputSlice.KUname)
    const ENnameSelector = useSelector(state => state.EditFontInputSlice.ENname)
    const testTextSelector = useSelector(state => state.EditFontInputSlice.testText)
    const KUinputHandler = (e) => {
        dispatch(setKUname(e.target.value))
    }
    const ENinputHandler = (e) => {
        dispatch(setENname(e.target.value))
    }
    const testTextinputHandler = (e) => {
        dispatch(setTestText(e.target.value))
    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="KU Font Name"
                    value={KUnameSelector || ''}
                    onChange={KUinputHandler}
                    required id="fullWidth"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="EN Font Name"
                    required
                    value={ENnameSelector || ''}
                    onChange={ENinputHandler}

                    id="fullWidth" />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Sample Text OPTIONAL"
                    multiline
                    maxRows={8}
                    minRows={4}
                    value={testTextSelector || ''}
                    onChange={testTextinputHandler}
                    fullWidth />
            </Grid>
        </Grid>
    )
}

export default FontEdit