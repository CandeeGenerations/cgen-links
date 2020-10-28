import {gql} from 'graphql-request'

const FRAGMENTS = {
  // User
  USER: gql`
    fragment UserFragments on User {
      _id
      _ts
      googleId
      firstName
      lastName
      email
      authorized
    }
  `,

  // Link
  LINK: gql`
    fragment LinkFragments on Link {
      _id
      _ts
      title
      destination
      description
      addedTs
      active
      deleted
    }
  `,

  // Click
  CLICK: gql`
    fragment ClickFragments on Click {
      _id
      _ts
      clickedTs
      ipAddress
      language
      userAgent
      country
      region
      city
    }
  `,

  // Settings
  SETTINGS: gql`
    fragment SettingsFragments on Settings {
      _id
      _ts
      slug
      logoUrl
      primaryColor
      secondaryColor
      useGradient
      facebook
      instagram
      twitter
      youtube
    }
  `,
}

const GQL = {
  // USER
  USER: {
    // Create User
    CREATE_USER: gql`
      mutation createUser($input: UserInput!) {
        createUser(data: $input) {
          ...UserFragments
        }
      }
      ${FRAGMENTS.USER}
    `,

    // Find User By Google ID
    FIND_USER_BY_GOOGLE_ID: gql`
      query findUserByGoogleId($googleId: String!) {
        findUserByGoogleId(googleId: $googleId) {
          ...UserFragments
          settings {
            ...SettingsFragments
          }
        }
      }
      ${FRAGMENTS.USER}
      ${FRAGMENTS.SETTINGS}
    `,

    // Find Authorized User
    FIND_AUTHORIZED_USER: gql`
      query findAuthorizedUser($googleId: String!) {
        findAuthorizedUser(googleId: $googleId, authorized: true) {
          ...UserFragments
          settings {
            ...SettingsFragments
          }
        }
      }
      ${FRAGMENTS.USER}
      ${FRAGMENTS.SETTINGS}
    `,

    // Find User By Id
    FIND_USER_BY_ID: gql`
      query findUserByID($id: ID!) {
        findUserByID(id: $id) {
          ...UserFragments
          settings {
            ...SettingsFragments
          }
        }
      }
      ${FRAGMENTS.USER}
      ${FRAGMENTS.SETTINGS}
    `,
  },

  // Link
  LINK: {
    // Create Link
    CREATE_LINK: gql`
      mutation createLink($input: LinkInput!) {
        createLink(data: $input) {
          ...LinkFragments
          owner {
            _id
          }
        }
      }
      ${FRAGMENTS.LINK}
    `,

    // Update Link
    UPDATE_LINK: gql`
      mutation updateLink($id: ID!, $input: LinkInput!) {
        updateLink(id: $id, data: $input) {
          ...LinkFragments
          owner {
            _id
          }
        }
      }
      ${FRAGMENTS.LINK}
    `,

    // Toggle Active Link
    TOGGLE_ACTIVE_LINK: gql`
      mutation toggleActiveLink($id: ID!, $active: Boolean!) {
        toggleActiveLink(id: $id, active: $active) {
          ...LinkFragments
          owner {
            _id
          }
        }
      }
      ${FRAGMENTS.LINK}
    `,

    // Soft Delete Link
    SOFT_DELETE_LINK: gql`
      mutation softDeleteLink($id: ID!) {
        softDeleteLink(id: $id) {
          _id
          active
          deleted
        }
      }
    `,

    // Find Link By ID
    FIND_LINK_BY_ID: gql`
      query findLinkByID($id: ID!) {
        findLinkByID(id: $id) {
          ...LinkFragments
          owner {
            _id
          }
        }
      }
      ${FRAGMENTS.LINK}
    `,

    // Find Links By Owner
    FIND_LINKS_BY_OWNER: gql`
      query findLinksByOwner($owner: ID!) {
        findLinksByOwner(owner: $owner) {
          data {
            ...LinkFragments
            owner {
              _id
            }
          }
        }
      }
      ${FRAGMENTS.LINK}
    `,

    // Find Active Links By Owner
    FIND_ACTIVE_LINKS_BY_OWNER: gql`
      query findActiveLinksByOwner($owner: ID!) {
        findActiveLinksByOwner(owner: $owner) {
          data {
            ...LinkFragments
            owner {
              _id
            }
          }
        }
      }
      ${FRAGMENTS.LINK}
    `,

    // Find Links By Title
    FIND_LINKS_BY_TITLE: gql`
      query findLinksByTitle($owner: ID!, $title: String!) {
        findLinksByTitle(owner: $owner, title: $title) {
          data {
            _id
          }
        }
      }
    `,

    // Find Links By Destination
    FIND_LINKS_BY_DESTINATION: gql`
      query findLinksByDestination($owner: ID!, $destination: String!) {
        findLinksByDestination(owner: $owner, destination: $destination) {
          data {
            _id
          }
        }
      }
    `,
  },

  // Click
  CLICK: {
    // Create Click
    CREATE_CLICK: gql`
      mutation createClick($input: ClickInput!) {
        createClick(data: $input) {
          ...ClickFragments
          owner {
            _id
          }
        }
      }
      ${FRAGMENTS.CLICK}
    `,

    // Find Clicks By Owner
    FIND_CLICKS_BY_OWNER: gql`
      query findClicksByOwner($owner: ID!) {
        findClicksByOwner(owner: $owner) {
          data {
            ...ClickFragments
            owner {
              _id
            }
          }
        }
      }
      ${FRAGMENTS.CLICK}
    `,

    // Click Count By Owner
    CLICK_COUNT_BY_OWNER: gql`
      query clickCountByOwner($owner: ID!) {
        clickCountByOwner(owner: $owner)
      }
    `,
  },

  // Settings
  SETTINGS: {
    // Find Settings By Slug
    FIND_SETTINGS_BY_SLUG: gql`
      query findSettingsBySlug($slug: String!) {
        findSettingsBySlug(slug: $slug) {
          ...SettingsFragments
          owner {
            _id
          }
        }
      }
      ${FRAGMENTS.SETTINGS}
    `,

    // Create Settings
    CREATE_SETTINGS: gql`
      mutation createSettings($input: SettingsInput!) {
        createSettings(data: $input) {
          ...SettingsFragments
          owner {
            _id
          }
        }
      }
      ${FRAGMENTS.SETTINGS}
    `,

    // Update Settings
    UPDATE_SETTINGS: gql`
      mutation updateSettings($id: ID!, $input: SettingsInput!) {
        updateSettings(id: $id, data: $input) {
          ...SettingsFragments
          owner {
            _id
          }
        }
      }
      ${FRAGMENTS.SETTINGS}
    `,
  },
}

export default GQL
