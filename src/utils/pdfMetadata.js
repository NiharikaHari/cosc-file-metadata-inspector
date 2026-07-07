import { getDocument, GlobalWorkerOptions, PDFDateString } from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

GlobalWorkerOptions.workerSrc = pdfWorkerUrl

export async function extractPdfMetadata(file) {
  const arrayBuffer = await file.arrayBuffer()
  const loadingTask = getDocument({ data: arrayBuffer })

  let pdfDocument
  try {
    pdfDocument = await loadingTask.promise
  } catch (err) {
    if (err?.name === 'PasswordException') {
      throw new Error(
        'This PDF is password-protected; metadata could not be read.',
      )
    }
    throw new Error('Could not read this PDF file. It may be corrupted or invalid.')
  }

  try {
    const { info } = await pdfDocument.getMetadata()
    return {
      pageCount: pdfDocument.numPages,
      title: info?.Title || null,
      author: info?.Author || null,
      creationDate: info?.CreationDate
        ? PDFDateString.toDateObject(info.CreationDate)
        : null,
      modificationDate: info?.ModDate
        ? PDFDateString.toDateObject(info.ModDate)
        : null,
    }
  } finally {
    pdfDocument.destroy()
  }
}
