import { React, useRef, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "./PdfViewer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function PdfViewer({ pdfURL }) {
  const [numPages, setNumPages] = useState(null);
  const refFile = useRef();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Document
      file={pdfURL}
      ref={refFile}
      onLoadSuccess={onDocumentLoadSuccess}
      renderMode={"canvas"}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          renderTextLayer={false}
          canvasBackground={"rgba(255,255,255,1)"}
          scale={1.5}
        />
      ))}
    </Document>
  );
}
