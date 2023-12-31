import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, clearNotesLogout, creatingNewNote, deleteNoteById, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";
import { logoutFirebase } from "../../firebase/providers";
import { logout } from "../auth";

export const startNewNote = () => {
        return async(dispatch, getState) => {
            dispatch(creatingNewNote())
            const {uid} = getState().auth;

            const newNote = {
                title: '',
                body: '',
                date: new Date().getTime(),


            }
            const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notas`));
            await setDoc(newDoc, newNote);

            newNote.id = newDoc.id;

            //dispatch
            dispatch(addNewEmptyNote(newNote))
            dispatch(setActiveNote(newNote))
            //dispatch(activarNote)
        }
}
export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));

    }
}

export const startSaveNote = () =>{
    const faltatitulo=false;
    return async(dispatch, getState) => {

        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        const {title} = note;
        if (title !== '')
        {
        dispatch(setSaving());
        const noteToFireStore = {...note};
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${note.id}`);
        await setDoc(docRef, noteToFireStore, {merge: true});

        dispatch(updateNote(note));
        }else {
            console.log('Missing Title')
        }
        

    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );
            
        // await fileUpload( files[0] );
        const fileUploadPromises = [];
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ));
        
    }
}
export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout());
    }
}
export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}