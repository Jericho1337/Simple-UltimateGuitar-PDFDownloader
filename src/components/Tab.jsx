import { useState, useEffect } from 'react'
import axios from "axios";
import * as cheerio from "cheerio";
import { transposeTab } from './TransposeUtils.js';

function Tab(props){

    const [data, setData] = useState([]); //RAW EXTRACTED DATA
	const [loaded, setLoaded] = useState(false); //LOADED PAGE
	const [jsonTabFormatted, setjsonTabFormatted] = useState(); //JS DATA
    const [songTitle, setSongTitle] = useState("");
	const [songArtist, setSongArtist] = useState("");

    useEffect( () => {
		axios({ method: "get", url: props.url })
		.then(response => {setData(response.data); setLoaded(true)})
	} , [props.url] );
	
	if(loaded){
        try{
            const $ = cheerio.load(data);
            const fullJson = JSON.parse( $("[data-content]").attr("data-content") );
            const jsonTab = fullJson["store"]["page"]["data"]["tab_view"]["wiki_tab"]["content"];
            const songTitleJson = fullJson["store"]["page"]["data"]["tab"]["song_name"];
			const songArtistJson = fullJson["store"]["page"]["data"]["tab"]["artist_name"];
            let stringTab = JSON.stringify(jsonTab);
            stringTab = transposeTab(stringTab, props.transposeOffset);
            stringTab = stringTab.replaceAll("[tab]", "").replaceAll("[/tab]", "").replaceAll("[ch]", "<b>").replaceAll("[/ch]","</b>");

            let jsonTabModified = JSON.parse(stringTab);
            
            setSongTitle(songTitleJson);
			setSongArtist(songArtistJson);
            setjsonTabFormatted(jsonTabModified);
            setLoaded(false);

        } catch (err){
            console.error(err);
        }
	}

    return(
        <div id="tab-content">
            <h2>{songTitle}</h2>
            <h4>{songArtist}</h4>
            {jsonTabFormatted !== undefined ? <pre><div dangerouslySetInnerHTML={{ __html: jsonTabFormatted }} /></pre> : <pre>Loading...</pre>}
        </div>	
    );
}

export default Tab;