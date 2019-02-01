import * as React from 'react';

import * as dateFormat from 'dateformat';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { IPreference, IProfile } from '../api';

import UpdatePreference from '../containers/UpdatePreference';

import Spacer from './Spacer';

export interface IProps {
  /** The current user's profile. */
  profile: IProfile;

  /** If present, an existing user preference. */
  existingPreference?: IPreference;
};

/**
 * A dialog shown to users who have signed in. Takes the current user profile
 * and any existing preferences as props.
 */
const NewPreferenceDialog = ({ profile, existingPreference }: IProps) => (
  /* This is required because we dynamically create the event handlers for the
   * checkboxes. Apparently, the received wisdom is that this is no-longer a
   * performance problem. (See the FAQs around the new React Hooks feature.) */
  /* tslint:disable jsx-no-lambda */
  <UpdatePreference initialPreference={ existingPreference }>{
    ({ preference, isSubmitting, update, submit, lastSubmittedAt }) =>
      lastSubmittedAt
      ?
      <>
        <Typography variant="h4" gutterBottom={true}>
          Thank you, { profile.display_name }
        </Typography>
        <Typography variant="body1">
          Your preferences have been recorded.
        </Typography>
        <Spacer />
        <Typography variant="body1" component="ul">
          <li>
            You <strong>{ preference.allow_capture ? " DO " : " DO NOT " }</strong>
            agree to having your lectures recorded.
          </li>
          <li>
            You <strong>{ preference.request_hold ? " DO " : " DO NOT " }</strong>
            wish to hold recordings for trimming.
          </li>
        </Typography>
        <Spacer />
        <Typography variant="body1">
          You may check your preference at any point by visiting your <a
          href={ `/preferences/user/${profile.username}/` }>public profile
          page</a> or you may <a href="/">change them</a>.
        </Typography>
      </>
      :
      <>
        <Typography variant="h4" gutterBottom={true}>
          Welcome, { profile.display_name }
        </Typography>
        <Typography variant="caption" gutterBottom={true}>
          Not you? Please <a href="/accounts/logout">sign out</a>.
        </Typography>
        <Spacer />
        <Typography variant="body1">
          {
            preference.expressed_at
            ? `You last expressed a preference at ${dateFormat(new Date(preference.expressed_at))}.`
            : "You have not previously expressed a preference."
          }
        </Typography>
        <Spacer />
        <Grid container={true} justify="center">
          <Grid item={true} xs={12} sm={10}>
            <FormGroup>
              <FormControlLabel
                checked={ preference.allow_capture }
                disabled={ isSubmitting }
                onChange={ (event, checked) => update({ allow_capture: checked }) }
                control={ <Checkbox /> }
                label="I agree that my lectures may be captured"
              />
              <FormControlLabel
                checked={ preference.request_hold }
                disabled={ isSubmitting }
                control={ <Checkbox /> }
                onChange={ (event, checked) => update({ request_hold: checked }) }
                label="I wish to hold recordings for trimming before they are published"
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Spacer />
        <Typography variant="caption">
          Opt-ins are for the current Academic year and will renew each year
          automatically unless the option is deselected. Your lecture capture
          preference is public information.
        </Typography>
        <Spacer />
        <Grid container={true} spacing={16} justify="flex-end">
          <Grid item={true} xs={12} sm={6} md={4}>
            <Button
              fullWidth={true} variant="outlined" color="primary" onClick={ submit }
              disabled={ isSubmitting }
            >
              Express preference
            </Button>
          </Grid>
        </Grid>
      </>
  }</UpdatePreference>
);

export default NewPreferenceDialog;
