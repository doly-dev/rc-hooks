
const DARK_STYLE_ID = "__antd_more_antd_dark_style__";

function getDarkStyle() {
  return document.querySelector(`#${DARK_STYLE_ID}`);
}

export function loadDarkStyle() {
  if (!getDarkStyle()) {
    const oStyle = document.createElement("link");
    oStyle.setAttribute("id", DARK_STYLE_ID);
    oStyle.setAttribute("rel", "stylesheet");
    oStyle.setAttribute("href", "https://cdn.bootcdn.net/ajax/libs/antd/4.15.1/antd.dark.css");
    document.head.appendChild(oStyle);
  }
}

export function unloadDarkStyle() {
  const oStyle = getDarkStyle();
  oStyle && document.head.removeChild(oStyle);
}