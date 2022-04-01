import { createTheme, adaptV4Theme } from "@mui/material";

const globalTheme = createTheme(adaptV4Theme({
	palette: {
		primary: {
			main: "#56CCF2",
			contrastText: "#fff"
		},
		secondary: {
			main: "#EB5757",
			contrastText: "#fff"
		},
		text: {
			primary: "#000"
		},
		grey: { // for some reason theme.palette.grey.main doesn't work
			primary: "#F1F1F1"
		}
	},
	overrides: {
		MuiOutlinedInput: {
			notchedOutline: {
				border: 0,
			}
		}
	}
}));

export default globalTheme;