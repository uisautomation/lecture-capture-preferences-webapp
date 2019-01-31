import * as React from 'react';

import Paper from '@material-ui/core/Paper';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  root: {
    ...theme.mixins.gutters(),

    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,

    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
});

export interface IProps extends WithStyles<typeof styles> {
  [x: string]: any;
};

/**
 * A Paper element suitable for holding page content. On smaller screens, it
 * automatically becomes full-screen.
 */
export const PagePaper = withStyles(styles)(
  ({ classes, ...otherProps } : IProps) =>
  <Paper classes={{ root: classes.root }} {...otherProps} />
);

export default PagePaper;
