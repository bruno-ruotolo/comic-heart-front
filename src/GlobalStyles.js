import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
//reset CSS
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

//global styles
* {
  box-sizing: border-box;
}

body {
  /* font-family: 'Fredoka One', cursive; */
  font-family: 'Lexend Deca', sans-serif;
  background-color: #4E0000;
  display:flex;
  align-items:center;
  justify-content:center;

  form {
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
  }

  input {
    background-color: #F3EED9;
    border-radius: 8px;
    padding-left: 20px; 
    font-family: 'Fredoka One', cursive;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #4E0000;
    box-shadow: inset 0px 0px 2px #4E0000;
    border: none;

    &::placeholder{
      font-family: 'Fredoka One', cursive;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      color: #4E000099;
    }
  }

  button {
    background-color: #EC665C;
    border-radius: 8px;
    display:flex;
    align-items:center;
    justify-content:center;
    border: none;
    font-family: 'Fredoka One', cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    color: #F3EED9;
    box-shadow: inset 0px 0px 2px #4e0000;
  }

}
`

export default GlobalStyles;