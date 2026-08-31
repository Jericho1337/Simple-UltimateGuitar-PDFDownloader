import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import RobotoMono from "./fonts/RobotoMono.ttf"


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
    return(
        <Document>
            <Page size="A4" style={styles.page}>

                <Text style={styles.title}>Documents, written in React</Text>

                <Text style={styles.paragraph}>
                    {props.tab}
                </Text>
            </Page>
        </Document>
    );
}

export default PDFDocument;