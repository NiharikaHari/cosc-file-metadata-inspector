export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  )
  const value = bytes / 1024 ** exponent
  const precision = exponent === 0 ? 0 : 2
  return `${value.toFixed(precision)} ${units[exponent]}`
}
