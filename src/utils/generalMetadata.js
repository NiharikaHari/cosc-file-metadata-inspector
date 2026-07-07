export function extractGeneralInfo(file) {
  return {
    name: file.name,
    size: file.size,
    type: file.type || null,
    lastModified: file.lastModified ? new Date(file.lastModified) : null,
  }
}
