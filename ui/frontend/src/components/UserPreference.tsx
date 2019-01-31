import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import { IPreference } from '../api';

export interface IProps {
  /** The user's current preference, if any. */
  preference?: IPreference;

  /** The username of the user. */
  username: string
};

/**
 * Display an existing user preference (or lack thereof). If the preference is
 * provided, the display name from the preference is used otherwise the username
 * is used.
 */
const UserPreference = ({ username, preference }: IProps) => (
  preference
  ?
  <>
    <Typography variant="h4" gutterBottom={true}>
      Preferences for { preference.user.display_name }
    </Typography>
    <Typography variant="body1">
      <ul>
        <li>
          <strong>{ preference.allow_capture ? "DOES " : "DOES NOT " }</strong>
          agree to having lectures recorded.
        </li>
        <li>
          <strong>{ preference.request_hold ? "DOES " : "DOES NOT " }</strong>
          wish to hold recordings for trimming.
        </li>
      </ul>
    </Typography>
  </>
  :
  <Typography variant="body1">
    There is no preference recorded for { username }.
  </Typography>
);

export default UserPreference;
