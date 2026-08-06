import { modes, colorCombos } from './colors.js';

const height = 2556;
const width = 1179;

const textAscent = 36;
const textDescent = 12;

export function buildSvg({ mode, dotColor, dotCount, highlighted, dotSize, text, position, gridPosition }) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${modes[mode].bg}"/>
    ${buildDotGrid({ mode, dotColor, dotCount, highlighted, dotSize, svgWidth: width, text, position, gridPosition })}
  </svg>`;
}

function buildDotGrid({ mode, dotColor, dotCount, highlighted, dotSize, svgWidth, text, position, gridPosition }) {
  const { futureDates, pastDates, currentDate } = highlightColors(mode, dotColor);
  let cells = '';
  const cols = 15;
  const textGap = 50;
  const pad = dotSize * 3;
  const gridWidth = pad * (cols - 1) + dotSize * 2;
  const gridRows = Math.ceil(dotCount / cols);
  const gridHeight = pad * (gridRows - 1) + dotSize * 2;
  const textY = position === 'top'
    ? -dotSize - textGap
    : gridHeight - dotSize + textGap + textAscent;
  const { offsetX, offsetY } = gridOffsets(gridPosition, svgWidth, gridWidth, gridHeight, dotSize, textY);
  for (let i = 0; i < dotCount; i++) {
    const xPos = i % cols;
    const yPos = Math.floor(i / cols);
    const fill = i === highlighted ? currentDate : i < highlighted ? pastDates : futureDates;
    cells += `<circle cx="${xPos * pad}" cy="${yPos * pad}" r="${dotSize}" fill="${fill}"/>`;
  }
  const textSvg = `
    <text
      x="${gridWidth / 2}"
      y="${textY}"
      text-anchor="middle"
      font-size="48"
      font-family="sans-serif"
      font-weight="bold"
      fill="${modes[mode].text}"
    >
      ${escapeXml(text)}
    </text>
  `
  const percent = `
    <text
      x="${gridWidth / 2}"
      y="${gridHeight - dotSize + textGap + textAscent}"
      text-anchor="middle"
      font-size="40"
      font-family="sans-serif"
      fill="${modes[mode].text}"
      opacity="60%"
    >
      ${escapeXml(Math.round((highlighted / dotCount) * 100) + "%")}
    </text>
  `
  return `<g transform="translate(${offsetX}, ${offsetY})">
    ${position === 'top' ? textSvg + cells + percent : percent + cells + textSvg}
  </g>`
}

function gridOffsets(gridPosition, svgWidth, gridWidth, gridHeight, dotSize, textY) {
  const offsetX = (svgWidth - gridWidth) / 2;
  const blockTop = Math.min(-dotSize, textY - textAscent);
  const blockBottom = Math.max(gridHeight - dotSize, textY + textDescent);
  const gridPositions = {
    "top": 500 - blockTop,
    "middle": (height - (blockBottom - blockTop)) / 2 - blockTop,
    "bottom": (height - 500) - blockBottom,
  }
  const offsetY = gridPositions[gridPosition] ?? gridPositions.middle;
  return { offsetX, offsetY };
}

function highlightColors(mode, dotColor) {
  const isLight = mode.startsWith('light');
  const futureDates = modes[mode].empty;
  const pastDates = isLight ? colorCombos[dotColor].dark : colorCombos[dotColor].light;
  const currentDate = isLight ? colorCombos[dotColor].highlight.dark : colorCombos[dotColor].highlight.light;
  return { futureDates, pastDates, currentDate }
}

function escapeXml(str) {
  return str.replace(/[&<>"']/g, function(c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c];
  });
}
