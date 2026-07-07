import GeneralInfoCard from './GeneralInfoCard.jsx'
import ImageInfoCard from './ImageInfoCard.jsx'
import PdfInfoCard from './PdfInfoCard.jsx'

export default function MetadataResults({ file, status, general, image, pdf, sectionError }) {
  if (!file) return null

  const isImage = file.type.startsWith('image/')
  const isPdf = file.type === 'application/pdf'

  return (
    <div className="metadata-grid">
      <GeneralInfoCard general={general} />

      {status === 'loading' && <p className="status-note">Reading metadata…</p>}

      {status === 'ready' && sectionError && (
        <p className="status-note status-note--error">{sectionError}</p>
      )}

      {status === 'ready' && !sectionError && isImage && (
        <ImageInfoCard image={image} />
      )}

      {status === 'ready' && !sectionError && isPdf && <PdfInfoCard pdf={pdf} />}

      {status === 'ready' && !isImage && !isPdf && (
        <p className="status-note">
          No image or PDF-specific metadata available for this file type.
        </p>
      )}
    </div>
  )
}
