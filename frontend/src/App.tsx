import React from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {Header} from "./components/Header";
import {closeDialogAC} from "./redux/reducer/DialogReducer";
import {RegisterDialog} from "./components/RegisterDialog";
import {LoginDialog} from "./components/LoginDialog";

const useStyles = makeStyles((theme: Theme) => ({
    app: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

function App() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closeDialogAC())
    };

    return (
        <div className={classes.app}>
            <Header/>
            <RegisterDialog handleClose={handleClose}/>
            <LoginDialog handleClose={handleClose}/>
        </div>
    );
}

export default App;
