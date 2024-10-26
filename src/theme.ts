import { createTheme, DEFAULT_THEME } from "@mantine/core";

const theme = createTheme({
  ...DEFAULT_THEME,
  fontFamily: "Roboto",
  breakpoints: {
    xs: "427px",
    sm: "769px",
    md: "1025px",
    lg: "1441px",
    xl: "2561px",
  },
  colors: {
    "primary-blue": [
      "#F0FFFF",
      "#89CFF0",
      "#7393B3",
      "#0096FF",
      "#0047AB",
      "#6495ED",
      "#00008B",
      "#3F00FF",
      "#1F51FF",
      "#4169E1",
    ],

    "primary-gray": [
      "#F0F0F0",
      "#DCDCDC",
      "#C0C0C0",
      "#808080",
      "#696969",
      "#A9A9A9",
      "#708090",
      "#36454F",
      "#2C3539",
      "#343434",
    ],
    "primary-green": [
      "#F5FFFA",
      "#F0FFF0",
      "#98FB98",
      "#90EE90",
      "#00FA9A",
      "#32CD32",
      "#2E8B57",
      "#228B22",
      "#008000",
      "#006400",
    ],
    "primary-red": [
      "#FFE4E1",
      "#F08080",
      "#FA8072",
      "#E9967A",
      "#FF6666",
      "#CD5C5C",
      "#DC143C",
      "#B22222",
      "#8B0000",
      "#800000",
    ],
    ...DEFAULT_THEME.colors,
  },
});

export default theme;
