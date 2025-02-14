/*
  This component is used to display a child component in FullScreen mode.
  This code is used in the ProjectsModule component in a different codebase.
  It's setup as a separate component to make it easier to unit test, maintain, and reuse.
*/
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProjectsModuleActions } from 'src/redux/projectsModule';

export const FullScreen = ({ children }) => {
  const classes = useStyles();
  const { isFullScreen } = useSelector((s) => s.projectsModule);

  const { setIsFullScreen, clearFilters } = useProjectsModuleActions();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFullScreen(false);
        clearFilters();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsFullScreen]);

  return (
    <>
      {isFullScreen && (
        <div
          className={classes.underlay}
          data-testid="projects-module-fullscreen-underlay"
        />
      )}
      <div
        className={`${classes.projectCardContainer} ${
          isFullScreen ? 'fullscreen' : ''
        }`}
        data-testid="projects-module-fullscreen"
      >
        {children}
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  underlay: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 400,
    animation: 'fadeIn 300ms ease-in-out',
  },
  projectCardContainer: {
    width: '100%',
    margin: '0',
    left: 0,
    [theme.breakpoints.up('md')]: {
      width: '100%',
      margin: theme.spacing(0, 'auto'),
    },
    '&.fullscreen': {
      position: 'fixed',
      width: '100%',
      height: '100%',
      zIndex: 500,
      top: 0,
      left: 0,
      overflowY: 'hidden',
      padding: '16px',
    },
  },
}));
