import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { Button} from '@material-ui/core';
import { logout } from "../services/authenticate";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function Header() {
  const classes = useStyles();
  const { currency, setCurrency } = CryptoState();

  const history = useHistory();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="white" position="static" >
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push('/dashboard')}
              variant="h6"
              className={classes.title}
            >
              Crypto Dashboard
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15, textcolor: 'white !important' }}
              onChange={(e) => setCurrency(e.target.value)}
              inputProps={{
                MenuProps: {
                  MenuListProps : {
                    sx: {
                      textcolor: 'white !important'
                    }
                  }
                }
              }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            <div className="button-container" style={{ marginLeft: '20px' }}>
              <Button type='submit' variant='contained' onClick={() => logout()}>Logout</Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
