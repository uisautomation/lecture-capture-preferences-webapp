import * as React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Spacer from '../components/Spacer';

/**
 * A dialog to be shown to anonymous (non-signed in) users in the new preference
 * dialog. Provides an introduction to the site and a sign-in button.
 */
const AnonymousPreferenceDialog = () => <>
  <Typography variant="h4" gutterBottom={true}>
    Lecture Capture Preferences
  </Typography>
  <Spacer />
  <Typography variant="body2" gutterBottom={true}>
    This site allows those giving lectures in the University of Cambridge to
    opt-in to having their lectures be captured for the benefit of students.
  </Typography>
  <Typography variant="body1" gutterBottom={true}>
    Captured lectures are normally only available to students enrolled on the
    appropriate course.
  </Typography>
  <Spacer />
  <Grid container={true} spacing={16} justify="flex-end">
    <Grid item={true} xs={12} sm={6} md={4}>
      <Button
        component="a" href="/accounts/login" fullWidth={true}
        color="primary" size="large" variant="outlined"
      >
        Sign in with Raven
      </Button>
    </Grid>
  </Grid>
</>;

export default AnonymousPreferenceDialog;
