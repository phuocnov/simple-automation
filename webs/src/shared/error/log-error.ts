export function logError(
  error: Error,
  info?: React.ErrorInfo
) {
  console.error('App Error:', error, info);
}
