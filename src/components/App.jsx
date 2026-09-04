import { useState } from 'react'
import Tab from "./Tab.jsx"
import Reference from './Reference.jsx';
import Header from './Header.jsx';
import PDFDocument from './PDFDocument.jsx';


function App() {

	//URL DEFAULT PARAMETERS
	const CORSproxy = "/ug?url=";
	const defaultTab = "https://tabs.ultimate-guitar.com/tab/misc-computer-games/clair-obscur-expedition-33-lumiere-chords-5776982";
	const fullDefaultTab = CORSproxy + defaultTab;
	const [currentUrlTab, setCurrentUrlTab] = useState(fullDefaultTab);

	return (
		<div className="App">
			<Reference /> {/*Github image reference*/}
			<Header /> {/*Header Title*/}
			
			<div id="paragraphInputTab">
				<b>Input URL in the field below</b>
			</div>

			<div id="inputTab">
				<input style={{width: '100%'}} placeholder={defaultTab} onChange={(newUrl) => {
					if(JSON.stringify(newUrl["nativeEvent"]["data"]).includes("https://tabs.ultimate-guitar.com")) {
						setCurrentUrlTab(CORSproxy + newUrl["nativeEvent"]["data"])
					}}}
				/>
			</div>
			
			<Tab url={currentUrlTab} /> {/*HTML TAB*/}
			<PDFDocument url={currentUrlTab} /> {/*PDF Document Preview*/}
		</div>	
	);
}

export default App