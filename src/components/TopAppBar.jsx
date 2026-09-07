import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import githubIcon from '../assets/githubicon.png';
import theme from './DefaultTheme.js';

function TopAppBar() {
	return (
		<AppBar position="sticky" sx={{bgcolor: theme["palette"]["overbackground"]}}>
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme["palette"]["headermain"]}}>
				Simple Ultimate Guitar PDF Downloader
				</Typography>
				<IconButton
				size="large"
				edge="start"
				aria-label="menu"
				sx={{ mr: 2 }}
				>
					<a href='https://github.com/Jericho1337/Simple-UltimateGuitar-PDFDownloader' style={{color: "white"}}>
						<img src={githubIcon} alt="Github Page" style={{width: '50px', height: '50px', display: 'block'}} />
					</a>
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}

export default TopAppBar;