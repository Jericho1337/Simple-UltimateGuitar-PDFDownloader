import { useState, useEffect } from 'react'
import axios from "axios";
import * as cheerio from "cheerio";

function Tab(props){

    const [data, setData] = useState([]); //RAW EXTRACTED DATA
	const [loaded, setLoaded] = useState(false); //LOADED PAGE
	const [jsData, setJsData] = useState(); //JS DATA

    console.log("Tab executed!");

    useEffect( () => {
        console.log("Axios executed!");
		axios({ method: "get", url: props.url })
		.then(response => {setData(response.data); setLoaded(true)})
	} , [props.url] );
	
	if(loaded){
        try{
            console.log("Loaded!");
            const $ = cheerio.load(data);
            const fullJson = JSON.parse( $("[data-content]").attr("data-content") );
            const jsonTab = fullJson["store"]["page"]["data"]["tab_view"]["wiki_tab"]["content"]
            let stringTab = JSON.stringify(jsonTab);
            stringTab = stringTab.replaceAll("[tab]", "").replaceAll("[/tab]", "").replaceAll("[ch]", "<b>").replaceAll("[/ch]","</b>");

            let jsonTabModified = JSON.parse(stringTab);
            
            setJsData(jsonTabModified);
            setLoaded(false);
        } catch (err){
            console.error(err);
        }
	}

    return(
        <div id="tab-content">
            {jsData !== undefined ? <pre><div dangerouslySetInnerHTML={{ __html: jsData }} /></pre> : <pre>Loading...</pre>}
        </div>	
    );
}

export default Tab;