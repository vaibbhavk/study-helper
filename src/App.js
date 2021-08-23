import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './App.css';
import Main from './components/Main';

function App() {

  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#fafafa', height: '100vh' }} >
          <div className="main">
            <Main/>
          </div>
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default App;
