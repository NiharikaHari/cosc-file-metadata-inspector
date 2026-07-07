import InfoRow from './InfoRow.jsx'

export default function PdfInfoCard({ pdf }) {
  return (
    <section className="card">
      <h2 className="card-title">PDF Document</h2>
      <InfoRow label="Title" value={pdf?.title} />
      <InfoRow label="Author" value={pdf?.author} />
      <InfoRow
        label="Creation Date"
        value={pdf?.creationDate?.toLocaleString()}
      />
      <InfoRow
        label="Modification Date"
        value={pdf?.modificationDate?.toLocaleString()}
      />
      <InfoRow label="Page Count" value={pdf?.pageCount} />
    </section>
  )
}
