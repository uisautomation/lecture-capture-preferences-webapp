import * as React from 'react';

import AnonymousPreferenceDialog from '../components/AnonymousPreferenceDialog';
import LoadingIndicator from '../components/LoadingIndicator';
import NewPreferenceDialog from '../components/NewPreferenceDialog';
import PagePaper from '../components/PagePaper';

import { ProfileConsumer } from '../providers/ProfileProvider';

import QueryPreferences from '../containers/QueryPreferences';

import Page from './Page';

/**
 * The index page for the web application. Upon mount, it fetches a list of the latest media items
 * and shows them to the user.
 */
const IndexPage = () => (
  <Page>
    <ProfileConsumer>{ profile =>
      <PagePaper>
        { !profile ? <LoadingIndicator /> : null }
        { profile && profile.is_anonymous ? <AnonymousPreferenceDialog /> : null }
        { profile && !profile.is_anonymous ?
          <QueryPreferences query={{ user: profile.username }}>{
            ({ results, isLoading }) => isLoading ? <LoadingIndicator /> : <NewPreferenceDialog
              profile={ profile }
              existingPreference={ (results && (results.length === 1)) ? results[0] : undefined }
            />
          }</QueryPreferences> : null
        }
      </PagePaper>
    }</ProfileConsumer>
  </Page>
);

export default IndexPage;
