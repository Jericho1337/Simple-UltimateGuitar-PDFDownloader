import { useState } from 'react'
import Tab from "./Tab.jsx"
import PDF from './PDF.jsx';
import TopAppbar from './TopAppBar.jsx';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from "./DefaultTheme.js"

function App() {

	//URL DEFAULT PARAMETERS
	const CORSproxy = "/ug?url=";
	const defaultTab = "https://tabs.ultimate-guitar.com/tab/misc-computer-games/clair-obscur-expedition-33-lumiere-chords-5776982";
	const fullDefaultTab = CORSproxy + defaultTab;
	const [currentUrlTab, setCurrentUrlTab] = useState(fullDefaultTab);
	const [transposeOffset, setTransposeOffset] = useState(0);

	return (
		<CssBaseline>
			<Box sx={{bgcolor: theme["palette"]["background"]}}>
				<Grid container spacing={2}>
					<TopAppbar />

					<Grid size={{xs:10, md:6}} offset={{xs: 1, md:3}}>
						<TextField
						sx={{
								bgcolor: theme["palette"]["overbackground"], 
								input:{color: theme["palette"]["text"]}, 
								label: {color: theme["palette"]["text"]}, 
								"& .MuiInputLabel-root.Mui-focused": {color: theme["palette"]["headermain"]},
								"& .MuiFilledInput-root:after": {borderBottomColor: theme["palette"]["headermain"]}
							}}
						fullWidth
						label="Input Tab URL here" 
						variant="filled"
						onChange={(newUrl) => {
							if(JSON.stringify(newUrl["nativeEvent"]["data"]).includes("https://tabs.ultimate-guitar.com")) {
								setCurrentUrlTab(CORSproxy + newUrl["nativeEvent"]["data"])
							}}}/>			
					</Grid>
					
					<Grid size={{xs:10, md:6}} offset={{xs: 1, md:3}}>
						<Slider
						sx={{
							color: theme["palette"]["headermain"],
							'& .MuiSlider-markLabel': {color: theme["palette"]["text"]}
						}}
						valueLabelDisplay="auto" 
						defaultValue={0} 
						step={1} 
						marks={[{value: -11, label: '-11'},{value: 0, label: '0'},{value: 11, label: '+11'} ]} 
						min={-11} 
						max={11} onChange={(newOffset) => (setTransposeOffset(newOffset.target.value))} />
					</Grid>

					<Grid size={{xs:12, md: 6}} sx={{alignItems: "center"}}>
						<Tab url={currentUrlTab} transposeOffset={transposeOffset}/> {/*HTML TAB*/}
					</Grid>
					<Grid size={{xs:12, md: 6}} sx={{alignItems: "center"}}>
						<PDF url={currentUrlTab} transposeOffset={transposeOffset} /> {/*PDF Document Preview*/}
					</Grid>
				</Grid>
			</Box>
		</CssBaseline>
	);
}

export default App;