import { createContainer } from 'react-tracked'
import { useReducerAsync } from 'use-reducer-async'
import PropTypes from 'prop-types'

import reducerActions from './reducerActions'

const initialState = {
  categories: [],
  intents: [],
  displayedIntents: [],
  phrases: [],
  displayedPhrases: [],
  changesSinceRelease: {
    categories: [],
    intents: [],
    phrases: [],
  },
  categoryChangesSinceRelease: [],
  totalCountOfCategoryChanges: 0,
  intentChangesSinceRelease: [],
  totalCountOfIntentChanges: 0,
  phraseChangesSinceRelease: [],
  totalCountOfPhraseChanges: 0,
  releases: [],
  max_taps: 0,
  passwords: [],
  // NotificationComposer
  sendingNotifications: false,
  notificationDraft: {
    header: '',
    subHeader: '',
    body: '',
    isRequestingContactInfo: '',
    recipients: '',
  },
  // CsvImport
  fileForCsvImport: {},
  importingPhrases: false,
  csvImportErrorRows: [],
  loggedIn: false,
  loginError: null,
  currentUser: {},
  phraseBeingEdited: {},
  selectedCategory: { body: 'All' },
  showingNewCategoryModal: false,
  showingEditCategoryModal: false,
  selectedIntent: { body: 'All' },
  showingNewIntentModal: false,
  showingEditIntentModal: false,
  isNewPhraseFormVisible: false,
  pastVersionsToDisplay: null,
  // Fetching phrases
  fetchingPhrases: false,
  fetchingPhrasesError: null,
  // Fetching past phrase versions
  fetchingPastPhraseVersionsId: null,
  fetchingPastPhraseVersionsError: null,
  // Fetching releases
  fetchingReleases: false,
  fetchingReleasesError: null,
  // Fetching changes since latest release
  fetchingChangesSinceRelease: false,
  fetchingChangesSinceReleaseError: null,
  // Creating a phrase
  creatingPhrase: false,
  creatingPhraseError: null,
  // Deleting a phrase
  deletingPhraseError: null,
  deletingPhraseId: null,
  // Updating a phrase
  updatingPhraseError: null,
  updatingPhraseId: null,
  // Updating a phrase's position
  updatingPhrasePosition: false,
  updatingPhrasePositionError: null,
  // Creating a release
  creatingReleaseError: null,
  creatingRelease: false,
  // Updating a category
  updatingCategoryError: null,
  updatingCategoryId: null,
  // Updating a category's position
  updatingCategoryPosition: false,
  updatingCategoryPositionError: null,
  // Deleting an intent
  deletingIntentError: null,
  deletingIntentId: null,
  // Updating an intent
  updatingIntentError: null,
  updatingIntentId: null,
  // Updating an intent's position
  updatingIntentPosition: false,
  updatingIntentPositionError: null,
  // getting tap limit
  fetchingConfig: false,
  fetchingConfigError: null,
  // updating tap limit
  updatingConfig: false,
  updatingConfigError: null,
  // Deleting a password
  deletingPasswordId: null,
  deletingPasswordError: null,
  // Just use one global aiTestResult,
  aiResponse: '',
  aiTestResult: null,
  aiTestResultError: null,
  // Updating a GPT3 config for an intent
  updatingGpt3Config: null,
  updatingGpt3ConfigError: null,
  // Fetching GPT3 config for a intent
  fetchingGpt3Config: null,
  fetchingGpt3ConfigError: null,
}
function reducer(state, { type, payload }) {
  const action = reducerActions.sync[type]
  if (!action) throw new Error(`Invalid action specified: ${ type }`)
  return action(state, { type, payload })
}

const { Provider, useTracked } = createContainer(() => useReducerAsync(reducer, initialState, reducerActions.async))

Provider.propTypes = {
  children: PropTypes.any,
}

Provider.defaultProps = {
  children: null,
}

const store = useTracked
export { store, Provider }
