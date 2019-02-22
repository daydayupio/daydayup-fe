import APP_CONFIG from '../config/app'

const AUTH_TOKEN = APP_CONFIG.AUTH_TOKEN

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN)
}

export function setAuthToken(token) {
  localStorage.setItem(AUTH_TOKEN, token)
}

export function mutate(vm, args) {
  return new Promise((resolve) => {
    vm.$apollo.mutate(args)
      .then(data => resolve([null, data]))
      .catch(error => resolve([error, null]))
  })
}

export function getVueApolloErrorMessage(error) {
  const {networkError, graphQLErrors} = error
  if (networkError) {
    return networkError.result.errors[0].extensions.message
  }
  if (graphQLErrors) {
    return graphQLErrors[0].message
  }
}

export function getVueApolloErrorCode(error) {
  const {networkError, graphQLErrors} = error
  if (networkError) {
    return networkError.result.errors[0].extensions.code
  }
  if (graphQLErrors) {
    return graphQLErrors[0].extensions.code
  }
}