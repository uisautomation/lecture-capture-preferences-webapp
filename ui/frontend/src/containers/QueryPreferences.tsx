import * as React from 'react';

import { IPreference, IPreferenceListQuery, preferenceList } from '../api';

export interface IProps {
  /**
   * A function which takes the results of the query and a flag indicating if
   * new results are being loaded.
   */
  children?: (props: { results: IPreference[], isLoading: boolean }) => React.ReactNode;

  /**
   * The query to pass to the preference list API.
   */
  query?: IPreferenceListQuery;
}

export interface IState {
  results: IPreference[],

  isLoading: boolean;
}

/**
 * Query a preferences.
 *
 * This component queries the preferences API and returns the *full* list to its
 * child. The child must be a function. For example:
 *
 * ```jsx
 * <QueryPreferences query={{ ordering: 'expressed_at' }}>{
 *   ({ results, isLoading }) => <>
 *    <p>Loading new results: { isLoading ? 'yes' : 'no' }</p>
 *    <p>Results: { JSON.stringify(results) }</p>
 *   </>
 * }</QueryPreferences>
 * ```
 *
 * All pages returned by the query are merged together. Changes to the query
 * prop result in the query results being re-loaded.
 */
export class QueryPreferences extends React.Component<IProps, IState> {
  public state = {
    results: [],

    isLoading: false,
  }

  public componentDidMount() {
    // On mount, fetch the initial list of preferences.
    this.fetchList();
  }

  public componentDidUpdate(prevProps: IProps) {
    // If the query changes, refresh the list of preferences.
    if(prevProps.query !== this.props.query) {
      this.fetchList();
    }
  }

  public render() {
    const { results, isLoading } = this.state;
    return this.props.children ? this.props.children({ results, isLoading }) : null;
  }

  private fetchList() {
    const { query } = this.props;
    this.setState({ results: [], isLoading: true });

    // A promise which is used to recursively fetch pages of results.
    const fetchNextPage = (
      currentResults: IPreference[], endpointUrl?: string
    ): Promise<IPreference[]> => (
      preferenceList(query, endpointUrl)
      .then(({ next, results }) => {
        // Merge results from this fetch into the current running list of
        // results.
        const mergedResults = currentResults.concat(results);

        // If there are no more pages, return the results. Otherwise, fetch the
        // next page.
        if(next && next !== '') {
          return fetchNextPage(mergedResults, next);
        } else {
          return mergedResults;
        }
      })
    );

    // Start fetching the first page.
    return fetchNextPage([]).then(results => this.setState({ results, isLoading: false }));
  }
}

export default QueryPreferences;
