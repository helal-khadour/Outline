import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#7986cb",
      main: "#3A7CE1",
      dark: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
    },
    background: {
      default: "#F3F3F3",
    },
    text: {
      primary: 
      'rgba(0, 0, 0, 0.87)',
      secondary: 
      'rgba(0, 0, 0, 0.54)',
      disabled: 
      'rgba(0, 0, 0, 0.38)',
      hint: 
      'rgba(0, 0, 0, 0.38)',
      divider: 
      'rgba(0, 0, 0, 0.12)'
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: "0.04",
      selected: "rgba(58, 124, 255, 0.20)",
      selectedOpacity: "0.20",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: "0.38",
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: "0.12",
      activatedOpacity: "0.12",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
});
export default theme;
