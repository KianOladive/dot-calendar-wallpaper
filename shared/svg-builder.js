import { modes, colorCombos } from './colors.js';

const height = 2556;
const width = 1179;

const textAscent = 36;
const textDescent = 12;

export function buildSvg({ mode, dotColor, dotCount, highlighted, dotSize, text, gridPosition, layout = 1 }) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${modes[mode].bg}"/>
    ${buildDotGrid({ mode, dotColor, dotCount, highlighted, dotSize, svgWidth: width, text, gridPosition, layout })}
  </svg>`;
}

function buildDotGrid({ mode, dotColor, dotCount, highlighted, dotSize, svgWidth, text, gridPosition, layout }) {
  const colors = highlightColors(mode, dotColor);
  const cols = 12;
  const textGap = 50;
  const pad = dotSize * 3.5;
  const gridWidth = pad * (cols - 1) + dotSize * 2;
  const gridRows = Math.ceil(dotCount / cols);
  const gridHeight = pad * (gridRows - 1) + dotSize * 2;
  const textAbove = layout === 1;
  const textY = textAbove
    ? -dotSize - textGap
    : gridHeight - dotSize + textGap + textAscent;
  const { offsetX, offsetY } = gridOffsets(gridPosition, svgWidth, gridWidth, gridHeight, dotSize, textY);

  const cells = buildCells({ dotCount, highlighted, cols, pad, dotSize, colors });
  const percentValue = Math.round((highlighted / dotCount) * 100) + "%";
  const textBlock = buildTextBlock({
    layout,
    gridWidth,
    gridHeight,
    dotSize,
    textGap,
    textY,
    textColor: modes[mode].text,
    text,
    percentValue,
  });

  return `<g transform="translate(${offsetX}, ${offsetY})">
    ${textAbove ? textBlock + cells : cells + textBlock}
  </g>`;
}

function buildCells({ dotCount, highlighted, cols, pad, dotSize, colors }) {
  let cells = '';
  for (let i = 0; i < dotCount; i++) {
    const xPos = i % cols;
    const yPos = Math.floor(i / cols);
    const fill = i === highlighted ? colors.currentDate : i < highlighted ? colors.pastDates : colors.futureDates;
    if (i === highlighted) {
      cells += `<circle cx="${xPos * pad}" cy="${yPos * pad}" r="${dotSize*1.8}" fill="${fill}" opacity="0.3"/>`;
    }
    cells += `<circle cx="${xPos * pad}" cy="${yPos * pad}" r="${dotSize}" fill="${fill}"/>`;
  }
  return cells;
}

function buildTextBlock({ layout, gridWidth, gridHeight, dotSize, textGap, textY, textColor, text, percentValue }) {
  if (layout === 2) {
    return buildCombinedText({ gridWidth, textY, textColor, text, percentValue });
  }
  const goalText = buildGoalText({ gridWidth, textY, textColor, text });
  const percentText = buildPercentText({
    gridWidth,
    y: gridHeight - dotSize + textGap + textAscent,
    textColor,
    percentValue,
  });
  return goalText + percentText;
}

function buildGoalText({ gridWidth, textY, textColor, text }) {
  return `
    <text
      x="${gridWidth / 2}"
      y="${textY}"
      text-anchor="middle"
      font-size="48"
      font-family="sans-serif"
      font-weight="bold"
      fill="${textColor}"
    >
      ${escapeXml(text)}
    </text>
  `;
}

function buildPercentText({ gridWidth, y, textColor, percentValue }) {
  return `
    <text
      x="${gridWidth / 2}"
      y="${y}"
      text-anchor="middle"
      font-size="40"
      font-family="sans-serif"
      fill="${textColor}"
      opacity="60%"
    >
      ${escapeXml(percentValue)}
    </text>
  `;
}

function buildCombinedText({ gridWidth, textY, textColor, text, percentValue }) {
  return `
    <text
      x="${gridWidth / 2}"
      y="${textY}"
      text-anchor="middle"
      font-family="sans-serif"
      fill="${textColor}"
    >
      <tspan font-size="40" opacity="60%">${escapeXml(text)} ⋅ ${escapeXml(percentValue)}</tspan>
    </text>
  `;
}

function gridOffsets(gridPosition, svgWidth, gridWidth, gridHeight, dotSize, textY) {
  const offsetX = (svgWidth - gridWidth) / 2;
  const blockTop = Math.min(-dotSize, textY - textAscent);
  const blockBottom = Math.max(gridHeight - dotSize, textY + textDescent);
  const gridPositions = {
    "top": 700 - blockTop,
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
