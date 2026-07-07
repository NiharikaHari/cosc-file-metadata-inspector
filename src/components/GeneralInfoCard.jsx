import InfoRow from './InfoRow.jsx'
import { formatBytes } from '../utils/formatBytes.js'

export default function GeneralInfoCard({ general }) {
  return (
    <section className="card">
      <h2 className="card-title">General</h2>
      <InfoRow label="Name" value={general.name} />
      <InfoRow label="Size" value={formatBytes(general.size)} />
      <InfoRow label="MIME Type" value={general.type} />
      <InfoRow
        label="Last Modified"
        value={general.lastModified?.toLocaleString()}
      />
    </section>
  )
}
