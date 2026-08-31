import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import RobotoMono from "./fonts/RobotoMono.ttf"
import { useEffect, useState } from 'react';
import axios from "axios";
import * as cheerio from "cheerio";


Font.register({ family: 'Roboto Mono', src: RobotoMono});
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
    fontSize: 26,
    color: '#18181b',
    marginTop: 40,
    paddingBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#e0301e',
  },
  paragraph: {
    marginTop: 20,
    fontFamily: "Roboto Mono",
  },
});

// Create Document Component
function PDFDocument(props){

  const [data, setData] = useState([]); //RAW EXTRACTED DATA
  const [loaded, setLoaded] = useState(false); //LOADED PAGE
  const [jsData, setJsData] = useState(); //JS DATA

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
        stringTab = stringTab.replaceAll("[tab]", "").replaceAll("[/tab]", "").replaceAll("[ch]", "").replaceAll("[/ch]","");

        let jsonTabModified = JSON.parse(stringTab);
        
        setJsData(jsonTabModified);
        setLoaded(false);
    } catch (err){
      console.error(err);
    }
	}
    return(
        <Document>
            <Page size="A4" style={styles.page}>

                <Text style={styles.title}>Documents, written in React</Text>

                <Text style={styles.paragraph}>
                    {jsData}
                </Text>
            </Page>
        </Document>
    );
}

export default PDFDocument;