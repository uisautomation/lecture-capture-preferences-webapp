import * as React from 'react';

import { RouteComponentProps } from 'react-router-dom'

import LoadingIndicator from '../components/LoadingIndicator';
import PagePaper from '../components/PagePaper';
import UserPreference from '../components/UserPreference';

import QueryPreferences from '../containers/QueryPreferences';

import Page from './Page';

const UserPreferencePage = ({ match }: RouteComponentProps<{ user: string; }>) => (
  <Page>
    <PagePaper>
      <QueryPreferences query={{ user: match.params.user }}>{
        ({ results, isLoading }) => isLoading ? <LoadingIndicator /> : <UserPreference
          preference={ (results && (results.length === 1)) ? results[0] : undefined }
          username={ match.params.user }
        />
      }</QueryPreferences>
    </PagePaper>
  </Page>
);

export default UserPreferencePage;
