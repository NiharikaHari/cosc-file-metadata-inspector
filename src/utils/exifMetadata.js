import exifr from 'exifr'

export async function extractExifData(file) {
  let output
  try {
    output = await exifr.parse(file, { gps: true })
  } catch {
    return { available: false }
  }

  if (!output) return { available: false }

  return {
    available: true,
    make: output.Make ?? null,
    model: output.Model ?? null,
    dateTaken: output.DateTimeOriginal ?? output.CreateDate ?? null,
    gps: formatGps(output.latitude, output.longitude),
  }
}

function formatGps(latitude, longitude) {
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return null
  }
  const label =
    `${Math.abs(latitude).toFixed(6)}° ${latitude >= 0 ? 'N' : 'S'}, ` +
    `${Math.abs(longitude).toFixed(6)}° ${longitude >= 0 ? 'E' : 'W'}`
  return {
    latitude,
    longitude,
    label,
    mapsUrl: `https://www.google.com/maps?q=${latitude},${longitude}`,
  }
}
