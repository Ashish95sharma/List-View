import { StyledEngineProvider, CssBaseline, ThemeProvider } from '@mui/material';
import themes from '../themes';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RouteManager } from '../routes';
import { store } from '../store';

const themeCustomization = {
  opened: true,
  borderRadius: 10,
  defaultId: 'default',
  fontFamily: `'Poppins', sans-serif`,
  isOpen: []
};

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(themeCustomization)}>
        <CssBaseline />
        <Provider store={store}>
          <BrowserRouter>
            <RouteManager />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
