import { useState, useEffect } from 'react'
import axios from "axios";
import * as cheerio from "cheerio";
import { transposeTab } from './TransposeUtils.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import theme from './DefaultTheme.js';

function Tab(props){

    const [data, setData] = useState([]); //RAW EXTRACTED DATA
	const [loaded, setLoaded] = useState(false); //LOADED PAGE
	const [jsonTabFormatted, setjsonTabFormatted] = useState(); //JS DATA
    const [songTitle, setSongTitle] = useState("");
	const [songArtist, setSongArtist] = useState("");
    const [currentTransposeOffset, setCurrentTransposeOffset] = useState(0);
    const [currentUrl, setCurrentUrl] = useState("");


    useEffect( () =>  
        {
            if(props.url !== currentUrl){
                axios({ method: "get", url: props.url })
                .then(response => {setData(response.data); setLoaded(true); setCurrentUrl(props.url)})
            }
            else if(props.transposeOffset !== currentTransposeOffset){
                setCurrentTransposeOffset(props.transposeOffset)
                setLoaded(true); 
                setCurrentUrl(props.url);
            }
            
	    } , [props.url, props.transposeOffset] );
	
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
        <Card sx={{bgcolor: theme["palette"]["overbackground"]}}>
             <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{color: theme["palette"]["text"]}}>
                    {songTitle}
                </Typography>
                <Typography variant="h6" component="div" sx={{color: theme["palette"]["text"]}}>
                    {songArtist}
                </Typography>
                <Typography component="div" sx={{color: theme["palette"]["text"]}}>
                    {jsonTabFormatted !== undefined ? <pre><div dangerouslySetInnerHTML={{ __html: jsonTabFormatted }} /></pre> : <pre>Loading...</pre>}
                </Typography>
            </CardContent>
        </Card>  
    );
}

export default Tab;