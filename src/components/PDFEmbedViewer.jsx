import { PDFViewer } from '@embedpdf/react-pdf-viewer';
import { useEffect, useRef } from "react";

{/*
export default function PDFEmbedViewer(props) {
  return (
    <div style={{ height: "100vh" }}>
      <PDFViewer
        key={props.url} 
        config={{
          src: props.url,
          theme: { preference: 'dark' }
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
  */}

export default function PDFEmbedViewer(){
	const containerRef = useRef(null);

		useEffect(() => {
		const container = containerRef.current;

		const { NutrientViewer } = window;
		if (container && NutrientViewer) {
			NutrientViewer.load({
			container,
			// You can also specify a file in public directory, for example `/nutrient-web-demo.pdf`.
			document: "https://www.nutrient.io/downloads/nutrient-web-demo.pdf",
			});
		}

		return () => {
			NutrientViewer?.unload(container);
		};
		}, []);

		// Set the container height and width.
		return (
		// Make sure to set the container height and width explicitly.
		<div ref={containerRef} style={{ height: "100vh", width: "50w" }} />
		);
	}