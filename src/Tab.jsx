import { useState, useEffect } from 'react'
import axios from "axios";
import * as cheerio from "cheerio";

function Tab(props){

    const [data, setData] = useState([]); //RAW EXTRACTED DATA
	const [loaded, setLoaded] = useState(false); //LOADED PAGE
	const [jsonTabFormatted, setjsonTabFormatted] = useState(); //JS DATA

    useEffect( () => {
		axios({ method: "get", url: props.url })
		.then(response => {setData(response.data); setLoaded(true)})
	} , [props.url] );
	
	if(loaded){
        try{
            const $ = cheerio.load(data);
            const fullJson = JSON.parse( $("[data-content]").attr("data-content") );
            const jsonTab = fullJson["store"]["page"]["data"]["tab_view"]["wiki_tab"]["content"];
            let stringTab = JSON.stringify(jsonTab);
            stringTab = stringTab.replaceAll("[tab]", "").replaceAll("[/tab]", "").replaceAll("[ch]", "<b>").replaceAll("[/ch]","</b>");

            let jsonTabModified = JSON.parse(stringTab);
            
            setjsonTabFormatted(jsonTabModified);
            setLoaded(false);
        } catch (err){
            console.error(err);
        }
	}

    return(
        <div id="tab-content">
            {jsonTabFormatted !== undefined ? <pre><div dangerouslySetInnerHTML={{ __html: jsonTabFormatted }} /></pre> : <pre>Loading...</pre>}
        </div>	
    );
}

export default Tab;