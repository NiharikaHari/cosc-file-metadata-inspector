# File Metadata Inspector

Upload an image or PDF and inspect its metadata entirely client-side, no backend involved.

- **General** (any file, via the browser File API): name, size, MIME type, last modified date.
- **Images**: dimensions (via image decode), plus camera make/model, date taken, and GPS location (via [exifr](https://github.com/MikeKovarik/exifr)) when EXIF data is present.
- **PDFs**: title, author, creation/modification date, and page count (via [pdfjs-dist](https://mozilla.github.io/pdf.js/)).

## Setup

```
npm install
npm run dev
```

Then open the printed local URL and drag a file onto the drop zone, or click "Choose file".

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Manual test plan

This project has no automated tests, so verify these scenarios by hand via `npm run dev`:

1. **Image with EXIF + GPS** - use a real, unedited phone photo (transferred via USB/AirDrop, not re-downloaded through messaging/social apps, which strip EXIF on re-encode). Check size/MIME/last-modified, dimensions, camera make/model, date taken, and a working GPS map link.
2. **Image without EXIF** - a PNG screenshot or a re-saved JPEG. Dimensions still show; camera/GPS/date fields show "Not available", no crash.
3. **PDF with metadata** - export a PDF from Word/Docs/Pages/LaTeX with the document Title/Author set. Title, author, page count, and at least one date should show real values.
4. **PDF without metadata** - a bare/auto-generated PDF. Title/Author show "Not available" individually; page count still correct.
5. **Password-protected PDF** - encrypt a PDF (e.g. macOS Preview > Export as PDF > add password, or `qpdf --encrypt`). App shows a friendly "password-protected" message instead of crashing; General info still renders.
6. **Unsupported file type** - a `.txt` or `.zip` file. General info still shows; a note explains no image/PDF metadata is available.
7. **Drag-and-drop vs file picker** - both paths should produce identical results for the same file.
8. **Rapid file swap** - drop a large file, then immediately drop a different one before the first finishes. Final displayed metadata should match only the second file.
9. **Corrupted image with image MIME type** - rename a `.txt` file to `.jpg`. Dimensions/EXIF should gracefully show "Not available" rather than crashing.
