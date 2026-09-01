import { useState } from 'react'
import Tab from "./Tab.jsx"
import Document from "./PDFDocument.jsx"
import './App.css';
import { PDFViewer } from '@react-pdf/renderer';

function App() {

	//URL DEFAULT PARAMETERS
	const CORSproxy = "https://proxy.corsfix.com/"; //THROTTLING TO 60 req/minute
	const defaultTab = "https://tabs.ultimate-guitar.com/tab/misc-computer-games/clair-obscur-expedition-33-lumiere-chords-5776982";
	//STATE
	const [currentUrlTab, setCurrentUrlTab] = useState(CORSproxy + defaultTab);

	return (
		<div className="App">
			<header>
				<div>
					<h1>Simple Ultimate guitar PDF downloader</h1>
					<p>A simple ultimate guitar pdf downloader</p>
				</div>
				
			</header>
			<div id="inputTab">
				<input style={{width: '100%'}} placeholder={defaultTab} onChange={(newUrl) => {
						if(JSON.stringify(newUrl["nativeEvent"]["data"]).includes("tabs.ultimate-guitar.com")) {
							setCurrentUrlTab(CORSproxy + newUrl["nativeEvent"]["data"])
						}}}/>
			</div>
			
			<div>
				<Tab url={currentUrlTab} />
				<PDFViewer style={{ width: '100%', height: '90vh', margin: "2em 0" }}>
					<Document url={currentUrlTab} />
				</PDFViewer>
			</div>
		</div>	
	);
}

export default App