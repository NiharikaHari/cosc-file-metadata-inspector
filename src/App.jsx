import { useEffect, useState } from 'react'
import DropZone from './components/DropZone.jsx'
import MetadataResults from './components/MetadataResults.jsx'
import { extractGeneralInfo } from './utils/generalMetadata.js'
import { readImageDimensions } from './utils/imageMetadata.js'
import { extractExifData } from './utils/exifMetadata.js'
import { extractPdfMetadata } from './utils/pdfMetadata.js'
import './App.css'

export default function App() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [general, setGeneral] = useState(null)
  const [image, setImage] = useState(null)
  const [pdf, setPdf] = useState(null)
  const [sectionError, setSectionError] = useState(null)

  useEffect(() => {
    if (!file) return undefined

    let cancelled = false
    setStatus('loading')
    setImage(null)
    setPdf(null)
    setSectionError(null)
    setGeneral(extractGeneralInfo(file))

    ;(async () => {
      try {
        if (file.type.startsWith('image/')) {
          const [dimensions, exif] = await Promise.allSettled([
            readImageDimensions(file),
            extractExifData(file),
          ])
          if (!cancelled) {
            setImage({
              dimensions: dimensions.status === 'fulfilled' ? dimensions.value : null,
              exif: exif.status === 'fulfilled' ? exif.value : { available: false },
            })
          }
        } else if (file.type === 'application/pdf') {
          const pdfInfo = await extractPdfMetadata(file)
          if (!cancelled) setPdf(pdfInfo)
        }
      } catch (err) {
        if (!cancelled) setSectionError(err.message)
      } finally {
        if (!cancelled) setStatus('ready')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [file])

  return (
    <div className="app-page">
      <header className="topbar">
        <span className="app-icon">🔍</span>
        <h1 className="app-title">File Metadata Inspector</h1>
      </header>
      <main className="app-main">
        <DropZone onFileSelected={setFile} />
        <MetadataResults
          file={file}
          status={status}
          general={general}
          image={image}
          pdf={pdf}
          sectionError={sectionError}
        />
      </main>
    </div>
  )
}
