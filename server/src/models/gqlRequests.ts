import {gql} from 'graphql-request'

export const FIND_ALL_LINKS = gql`
  query FindAllLinks {
    findAllLinks {
      data {
        _id
        _ts
        title
        destination
        description
        addedTs
      }
    }
  }
`

export const FIND_LINK_BY_TITLE = gql`
  query FindLinkByTitle($title: String!) {
    findLinkByTitle(title: $title) {
      _id
      _ts
      title
      destination
      description
      addedTs
    }
  }
`

export const FIND_LINK_BY_DESTINATION = gql`
  query FindLinkByDestination($destination: String!) {
    findLinkByDestination(destination: $destination) {
      _id
      _ts
      title
      destination
      description
      addedTs
    }
  }
`

export const FIND_LINK_BY_ID = gql`
  query FindLinkById($id: ID!) {
    findLinkByID(id: $id) {
      _id
      _ts
      title
      destination
      description
      addedTs
    }
  }
`

export const CREATE_LINK = gql`
  mutation CreateLink($input: LinkInput!) {
    createLink(data: $input) {
      _id
      _ts
      title
      destination
      description
      addedTs
    }
  }
`

export const UPDATE_LINK = gql`
  mutation UpdateLink($id: ID!, $input: LinkInput!) {
    updateLink(id: $id, data: $input) {
      _id
      _ts
      title
      destination
      description
      addedTs
    }
  }
`

export const FIND_ALL_CLICKS = gql`
  query FindAllClicks {
    findAllClicks {
      data {
        _id
        _ts
        linkId
        clickedTs
        language
        userAgent
        ipAddress
        country
        region
        city
      }
    }
  }
`

export const FIND_ALL_CLICKS_BY_LINK_ID = gql`
  query FindAllClicksByLinkId($linkId: ID!) {
    findAllClicksByLinkId(linkId: $linkId) {
      data {
        _id
        _ts
        linkId
        clickedTs
        language
        userAgent
        ipAddress
        country
        region
        city
      }
    }
  }
`

export const CREATE_CLICK = gql`
  mutation CreateClick($input: ClickInput!) {
    createClick(data: $input) {
      _id
      _ts
      linkId
      clickedTs
      language
      userAgent
      ipAddress
      country
      region
      city
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(data: $input) {
      _id
      _ts
      email
      firstName
      lastName
      googleId
      authorized
    }
  }
`

export const FIND_USER_BY_GOOGLE_ID = gql`
  query FindUserByGoogleId($googleId: String!) {
    findUserByGoogleId(googleId: $googleId) {
      _id
      _ts
      email
      firstName
      lastName
      googleId
      authorized
    }
  }
`

export const FIND_AUTHORIZED_USER = gql`
  query FindAuthorizedUser($googleId: String!) {
    findAuthorizedUser(googleId: $googleId, authorized: true) {
      _id
      _ts
      email
      firstName
      lastName
      googleId
      authorized
    }
  }
`

export const FIND_SETTINGS_BY_USER_ID = gql`
  query FindSettingsByUserId($userId: ID!) {
    findSettingsByUserId(userId: $userId) {
      _id
      _ts
      userId
      slug
      logoUrl
      colors {
        primary
        secondary
      }
      socialLinks {
        facebook
        instagram
        twitter
        youtube
      }
    }
  }
`

export const CREATE_SETTINGS = gql`
  query CreateSettings($input: SettingsInput!) {
    createSettings(data: $input) {
      _id
      _ts
      userId
      slug
      logoUrl
      colors {
        primary
        secondary
      }
      socialLinks {
        facebook
        instagram
        twitter
        youtube
      }
    }
  }
`

export const UPDATE_SETTINGS = gql`
  query UpdateSettings($id: ID!, $input: SettingsInput!) {
    updateSettings(id: $id, data: $input) {
      _id
      _ts
      userId
      slug
      logoUrl
      colors {
        primary
        secondary
      }
      socialLinks {
        facebook
        instagram
        twitter
        youtube
      }
    }
  }
`
