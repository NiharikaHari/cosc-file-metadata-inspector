import InfoRow from './InfoRow.jsx'

export default function ImageInfoCard({ image }) {
  const dimensions = image?.dimensions
    ? `${image.dimensions.width} × ${image.dimensions.height}px`
    : null
  const exif = image?.exif
  const gps = exif?.gps

  return (
    <section className="card">
      <h2 className="card-title">Image</h2>
      <InfoRow label="Dimensions" value={dimensions} />
      <InfoRow label="Camera Make" value={exif?.make} />
      <InfoRow label="Camera Model" value={exif?.model} />
      <InfoRow
        label="Date Taken"
        value={exif?.dateTaken ? new Date(exif.dateTaken).toLocaleString() : null}
      />
      <InfoRow
        label="GPS Location"
        value={
          gps ? (
            <a href={gps.mapsUrl} target="_blank" rel="noreferrer">
              {gps.label}
            </a>
          ) : null
        }
      />
    </section>
  )
}
