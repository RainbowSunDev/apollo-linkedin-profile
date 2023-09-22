function success(data) {
  return {
    success: true,
    data,
  }
}

function failure(message) {
  return {
    success: false,
    message,
  }
}

function error(message) {
  return `TaskError: ${message}`
}

export { success, failure, error }
