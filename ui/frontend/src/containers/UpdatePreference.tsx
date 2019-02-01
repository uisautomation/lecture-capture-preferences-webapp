import * as React from 'react';

import { IPreferenceMutable, preferenceUpdate } from '../api';

/** The default user preference. */
export const DEFAULT_PREFERENCE = {
  allow_capture: true, request_hold: false,
};

/**
 * Interface containing fields which may be updated by UpdatePreference in a
 * preference object. These are the mutable properties and, because
 * UpdatePreference can update a preference, the expressed_at property.
 */
export interface IUpdatingPreference extends IPreferenceMutable {
  expressed_at?: string;
}

/**
 * Properties passed to the child function.
 */
export interface IChildProps {
  /** The current preference. */
  preference: IUpdatingPreference;

  /** A function which can be used to update the current preference. */
  update: (newFields: { [x: string]: any }) => void;

  /** A function which can be used to submit the preference to the API. */
  submit: () => void;

  /** A flag indicating if an update is in progress. */
  isSubmitting: boolean;

  /**
   * If present, the last date and time at which the preference was synchronised
   * with the API.
   */
  lastSubmittedAt?: Date;
}

export interface IProps {
  /** Child function which receives current preference. */
  children?: (props: IChildProps) => React.ReactNode;

  /** An initial preference. If omitted, a default preference is used. */
  initialPreference?: IUpdatingPreference;
};

export interface IState {
  preference: IUpdatingPreference;

  isSubmitting: boolean;

  lastSubmittedAt?: Date;
};

/**
 * Allow a signed-in user to update their preference.
 *
 * This component passes an "in-progress" preference to its child along with a
 * function which can be used to update the state.
 *
 * Calling update() with an object containing properties to update on the
 * preference will cause the child to be re-rendered. The preference can be
 * submitted back to the application via the submit() function.
 *
 * Example:
 *
 * ```jsx
 * <UpdatePreference>{
 *  ({ preference, submit, update }) => <>
 *    <Checkbox
 *      checked={ preference.allow_capture }
 *      onClick={ (event, checked) => update({ allow_capture: checked }) }
 *    />
 *    <Button onClick={ submit }>Submit change</Button>
 *  </>
 * }</UpdatePreference>
 * ```
 */
export class UpdatePreference extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      preference: {...DEFAULT_PREFERENCE, ...props.initialPreference},

      isSubmitting: false,
    };
  }

  public update = (newFields: { [x: string]: any }) => this.setState({
    preference: { ...this.state.preference, ...newFields }
  });

  public submit = () => {
    this.setState({ isSubmitting: true });
    return preferenceUpdate(this.state.preference)
      .then(preference => { this.setState({
        isSubmitting: false,
        lastSubmittedAt: new Date(),
        preference,
      }) });
  }

  public render() {
    const { lastSubmittedAt, preference, isSubmitting } = this.state;
    const childProps = {
      isSubmitting,
      lastSubmittedAt,
      preference,
      submit: this.submit,
      update: this.update,
    };
    return this.props.children ? this.props.children(childProps) : null;
  }
}

export default UpdatePreference;
