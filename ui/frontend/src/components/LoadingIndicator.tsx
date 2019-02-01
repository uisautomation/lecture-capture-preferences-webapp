import * as React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * A loading indicator which can be used within a PagePaper component to show
 * loading progress.
 */
const LoadingIndicator = () => <div style={{ width: '100%', textAlign: 'center' }}>
  <CircularProgress />
</div>;

export default LoadingIndicator;
