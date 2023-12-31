import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { startNewNote } from "../../store/journal"
import { useDispatch, useSelector } from "react-redux"

export const JournalPage = () => {

  const dispatch = useDispatch()
  const {isSaving, active} = useSelector(state=>state.journal)

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
    {/* <Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus vero culpa reprehenderit distinctio. Eos, impedit magni amet perferendis voluptate ducimus! Amet earum nulla similique explicabo ullam officia maxime magni obcaecati.</Typography> */}
    {
      (!!active)
      ? <NoteView/>
      : <NothingSelectedView/>
    }

    <IconButton
    onClick={onClickNewNote}
      size='large'
      disabled={isSaving}
      sx={{
        color:'white',
        backgroundColor:'error.main',
        ':hover' : {backgroundColor:'error.main', opacity:0.8},
        position:'fixed',
        right:50,
        bottom:50
      }}
    >
      <AddOutlined sx={{fontSize:30}}/>

    </IconButton>
    </JournalLayout>
  )
}
