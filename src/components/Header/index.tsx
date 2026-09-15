import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { HEADER_HEIGHT } from '@constants/ui.constants';

type HeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onMenuClick?: () => void;
};

const Header = ({ search, onSearchChange, onMenuClick }: HeaderProps) => (
  <AppBar
    position="sticky"
    elevation={0}
    sx={{ bgcolor: '#2c3e50', height: HEADER_HEIGHT, justifyContent: 'center' }}
  >
    <Toolbar sx={{ gap: 2, minHeight: `${HEADER_HEIGHT}px !important` }}>
      <IconButton edge="start" color="inherit" onClick={onMenuClick} aria-label="menu">
        <MenuIcon />
      </IconButton>

      <Box flexGrow={1} display="flex" justifyContent="center" minWidth={0} px={1}>
        <TextField
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          size="small"
          sx={{
            width: '100%',
            maxWidth: 560,
            bgcolor: 'common.white',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '& fieldset': { border: 'none' }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Box display="flex" alignItems="center" gap={0.5} flexShrink={0}>
        <IconButton color="inherit" aria-label="cart">
          <ShoppingCartOutlinedIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="account">
          <AccountCircleOutlinedIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="profile">
          <PersonOutlineOutlinedIcon />
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
