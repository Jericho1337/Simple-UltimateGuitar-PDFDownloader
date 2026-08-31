import { useState, useEffect } from 'react'
import Tab from "./Tab.jsx"
import Document from "./PDFDocument.jsx"
import './App.css';
import { PDFViewer } from '@react-pdf/renderer';
import axios from "axios";
import * as cheerio from "cheerio";

function App() {

	//URL PARAMETERS
	const CORSproxy = "https://proxy.corsfix.com/";
	
	//STATE
	const [currentUrlTab, setCurrentUrlTab] = useState("https://proxy.corsfix.com/https://tabs.ultimate-guitar.com/tab/billie-eilish/happier-than-ever-chords-3592094");
	const [data, setData] = useState([]); //RAW EXTRACTED DATA
	const [loaded, setLoaded] = useState(false); //LOADED PAGE
	const [currentTabJson, setCurrentTabJson] = useState();
	const [currentFullJson, setCurrentFullJson] = useState();

    useEffect( () => {
		axios({ method: "get", url: currentUrlTab })
		.then(response => {setData(response.data); setLoaded(true)})
	} , [currentUrlTab] );
	
	if(loaded){
        try{
            const $ = cheerio.load(data);
            setCurrentFullJson(JSON.parse( $("[data-content]").attr("data-content") ) );
            setCurrentTabJson(currentFullJson["store"]["page"]["data"]["tab_view"]["wiki_tab"]["content"]);
            setLoaded(false);
        } catch (err){
            console.log(err);
        }
	}

	return (
		<div className="App">
			<h1>Ultimate guitar PDF downloader</h1>
			<div id="examples">
				<input size="100" name="TabLink" placeholder="https://tabs.ultimate-guitar.com/tab/billie-eilish/happier-than-ever-chords-3592094" onChange={(newUrl) => {
					if(JSON.stringify(newUrl["nativeEvent"]["data"]).includes("tabs.ultimate-guitar.com")) {
						setCurrentUrlTab(CORSproxy + newUrl["nativeEvent"]["data"])
					}}}/>
			</div>
			<Tab tab={currentTabJson} />
			<PDFViewer style={{ width: '100%', height: '90vh' }}>
				<Document tab={currentTabJson} />
			</PDFViewer>
		</div>	
	);
}

export default App