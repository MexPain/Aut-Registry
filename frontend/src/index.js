import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import 'fontsource-roboto'
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#ad3345',
            main: '#990017',
            dark: '#6b0010',
            contrastText: '#fff',
        },
        secondary: {
            light: '#38688d',
            main: '#074371',
            dark: '#042e4f',
            contrastText: '#fff',
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

