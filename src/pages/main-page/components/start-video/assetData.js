// 원본 px 좌표/크기 (HandLight 중앙 계산용)
export const centerImageRaw = {
  x: 615,
  y: 279,
  width: 689,
  height: 577,
};
// 폴더/글씨 asset 정보 및 변환 함수
import { BASE_WIDTH, BASE_HEIGHT } from './handlightUtil';

const VW_DENOM = 90;
const VH_DENOM = 110;
export const convertX = x => x * (100 / VW_DENOM);
export const convertY = y => y * (100 / VH_DENOM);
export const vw = px => `${(px / BASE_WIDTH) * VW_DENOM}vw`;
export const vh = px => `${(px / BASE_HEIGHT) * VH_DENOM}vh`;

export const centerImage = {
  src: '/images/main-page/CreateYourOwnIdea.png',
  width: 689,
  height: 577,
  x: convertX(615),
  y: convertY(279),
};

export const folders = [
  { src: '/images/main-page/Folder.png', width: 190, height: 190, x: convertX(57), y: convertY(196), opacity: 1, rotate: -32.49 },
  { src: '/images/main-page/Folder.png', width: 99, height: 99, x: convertX(387), y: convertY(387), opacity: 0.5, rotate: -19.39 },
  { src: '/images/main-page/Folder.png', width: 144, height: 144, x: convertX(370), y: convertY(823), opacity: 0.7, rotate: -8.43 },
  { src: '/images/main-page/Folder.png', width: 221, height: 221, x: convertX(1203), y: convertY(520), opacity: 0.7, rotate: -27.21 },
  { src: '/images/main-page/Folder.png', width: 143, height: 143, x: convertX(1555), y: convertY(755), opacity: 1, rotate: 41.34 },
];
export const letters = [
  { text: 'E', width: 58, height: 89, x: convertX(282), y: convertY(306), rotate: 37.38 },
  { text: 'R', width: 67, height: 89, x: convertX(501), y: convertY(545), rotate: 17.52 },
  { text: 'E', width: 58, height: 89, x: convertX(768), y: convertY(890), rotate: -36.48 },
  { text: 'P', width: 59, height: 89, x: convertX(1239), y: convertY(820), rotate: -3.76 },
  { text: 'C', width: 60, height: 89, x: convertX(1458), y: convertY(349), rotate: 31.67 },
  { text: 'I', width: 19, height: 89, x: convertX(1655), y: convertY(514), rotate: -3.76 },
];
export const fontUrl = '/fonts/116watermelon.ttf';
