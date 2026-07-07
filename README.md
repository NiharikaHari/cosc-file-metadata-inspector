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
