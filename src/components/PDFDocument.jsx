import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import axios from "axios";
import * as cheerio from "cheerio";
import { PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 11,
    lineHeight: 1.6,
    color: '#3f3f46',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7',
    paddingBottom: 12,
  },
  title: {
    fontSize: 20,
	textAlign: "center",
    color: '#18181b',
    
  },
  paragraph: {
    marginTop: 20,
    fontFamily: "Courier",
  },
  bold: {
    marginTop: 20,
    fontFamily: "Courier-Bold",
  },
  subtitle: {
    marginTop: 10,
	marginBottom: 10,
    fontFamily: "Courier",
	textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },

});

// Create Document Component
function PDFDocument(props){

	const [data, setData] = useState([]); //RAW EXTRACTED DATA
	const [loaded, setLoaded] = useState(false); //LOADED PAGE
	const [jsData, setJsData] = useState(); //JS DATA
	const [songTitle, setSongTitle] = useState("");
	const [songArtist, setSongArtist] = useState("");
	const regexSplit = /(<b>.+?<\/b>)/;	

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
			stringTab = stringTab.replaceAll("[tab]", "").replaceAll("[/tab]", "").replaceAll("[ch]", "<b>").replaceAll("[/ch]","</b>");
			const jsonTabModified = JSON.parse(stringTab);
				
			setSongTitle(songTitleJson);
			setSongArtist(songArtistJson);
			setJsData(jsonTabModified);
			setLoaded(false);
			
		} catch (err){
      		console.error(err);
    	}
		
	}
    return(
		<PDFViewer style={{ width: '100%', height: '90vh', margin: "2em 0" }}>
			<Document>
				<Page size="A4" style={styles.page}>
					<Text style={styles.title}>
						{songTitle}
					</Text>
					<Text style={styles.subtitle}>
						{songArtist}
					</Text>

					<Text>
						{/*Inline expression performs
							1. Split text into array using <b>...</b> (includes splitting tags into split using parethesis for group reges)
							2. Maps every element to a <Text>...</Text> element
								2.1 If <b> is present style.bold is set else style.paragraph is used
								2.2 <b> and </b> are removed with replaceAll function before inserting into array
							3. If data is not yet loaded a placeholder <Text>Loading...</Text> is shown */}
						{jsData !== undefined ? jsData.split(regexSplit).map( (item, index) => (<Text key={index} style={item.includes("<b>") ? styles.bold : styles.paragraph}>{item.replaceAll("<b>", "").replaceAll("</b>","")}</Text>)) : <Text>Loading...</Text>}
					</Text>
				</Page>
			</Document>
		</PDFViewer>
    );
}

export default PDFDocument;