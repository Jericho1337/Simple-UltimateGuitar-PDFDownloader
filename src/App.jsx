import { useState } from 'react'
import Tab from "./Tab.jsx"
import Document from "./PDFDocument.jsx"
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

function App() {

	//URL PARAMETERS
	const CORSproxy = "https://proxy.corsfix.com/";
	
	//STATE
	const [currentUrlTab, setCurrentUrlTab] = useState("https://proxy.corsfix.com/https://tabs.ultimate-guitar.com/tab/billie-eilish/happier-than-ever-chords-3592094");

	return (
		<div className="App">
			
			<h1>Ultimate guitar PDF downloader</h1>
			<div id="examples">
				<input size="100" name="myInput" onChange={(newUrl) => {
					if(JSON.stringify(newUrl["nativeEvent"]["data"]).includes("tabs.ultimate-guitar.com")) {
						setCurrentUrlTab(CORSproxy + newUrl["nativeEvent"]["data"])
					}}}/>
			</div>
			<Tab url={currentUrlTab} />
			<PDFViewer style={{ width: '100%', height: '90vh' }}>
				<Document url={currentUrlTab} />
			</PDFViewer>
		</div>	
	);
}

export default App