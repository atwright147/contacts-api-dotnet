import { useState } from 'react';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const StyledDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.09)',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const links = [
  {
    text: 'Home',
    icon: <HomeIcon />,
    path: '/',
  },
  {
    text: 'Messages',
    icon: <ForumIcon />,
    path: '/messages',
  },
  {
    text: 'Calls',
    icon: <PhoneIcon />,
    path: '/calls',
  },
  {
    text: 'Contacts',
    icon: <GroupIcon />,
    path: '/contacts',
  },
  {
    text: 'Calendar',
    icon: <EventNoteIcon />,
    path: '/calendar',
  },
  {
    text: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
  },
];

export function Root(): JSX.Element {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Sidebar Collapse
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            borderColor: theme.palette.primary.main,
          },
        }}
      >
        <StyledDrawerHeader>
          <IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
        </StyledDrawerHeader>

        <Divider />

        <List>
          {links.map((link) => (
            <ListItem key={link.text} disablePadding sx={{ display: 'block' }}>
              <Link
                component={RouterNavLink}
                to={link.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  alignItems: 'center',
                  px: 2.5,
                  display: 'flex',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'primary.main',
                  },
                  '.MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.text} sx={{ opacity: open ? 1 : 0 }} />
              </Link>
            </ListItem>
          ))}

          <ListItem disablePadding sx={{ display: 'block' }}>
            <Link
              component={RouterNavLink}
              to=""
              onClick={(event) => {
                event.preventDefault();
                setIsLoggedIn(!isLoggedIn);
              }}
              // to={isLoggedIn ? '/api/auth/signout' : '/api/auth/signin'}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                alignItems: 'center',
                px: 2.5,
                display: 'flex',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'primary.main',
                },
                '.MuiListItemIcon-root': {
                  color: 'primary.main',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {isLoggedIn ? <LockOpenIcon /> : <LockIcon />}
              </ListItemIcon>
            </Link>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
