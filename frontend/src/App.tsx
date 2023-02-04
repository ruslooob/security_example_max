import React from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./components/NotFound";
import {Main} from "./components/Main";
import {Header} from "./components/Header";
import {Container, CssBaseline} from '@material-ui/core';
import {RegisterForm} from "./components/forms/RegisterForm";
import {LoginForm} from "./components/forms/LoginForm";
import Welcome from "./components/PublicPage";
import RequireAuth from "./components/RequireAuth";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: '100vh',
        display: "flex",
        flexDirection: "column"
    },
    main: {
        display: "flex",
        flexDirection: 'column',
        flex: '1 1 auto',
        justifyContent: "center",
        alignItems: "center",
    }
}));

function App() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Header/>
            <Container className={classes.main} maxWidth="xs">
                <CssBaseline/>
                <Routes>
                    {/* public routes */}
                    <Route path="/" element={<Welcome/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                    {/* protected routes */}
                    <Route element={<RequireAuth/>}>
                        <Route path="/main" element={<Main/>}/>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
