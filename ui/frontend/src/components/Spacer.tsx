import * as React from 'react';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  root: {
    height: theme.spacing.unit * 3,
  },
});

export interface IProps extends WithStyles<typeof styles> { };

/** A small vertical space which can be used to separate UI components. */
export const Spacer = withStyles(styles)(
  ({ classes } : IProps) => <div className={ classes.root } />
);

export default Spacer;
