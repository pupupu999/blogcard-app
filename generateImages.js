const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const words = [
    "ferunabex", "grovanix", "xemrati", "tarnelo", "blenquo", "zorilen", "nevalita",
    "crelmadi", "valenope", "drosmeri", "lomberica", "yandire", "tramorel", "selventu",
    "marnive", "belquato", "zulferina", "kerliven", "numorista", "drequile","sarnavela", 
    "lufidane","xenorila","pristona","dyvarine","culvarine","flonatrix","revolika" ,
    "kelmorita","zonterila", "framotika","durafina","qualetrix","sibreluna",
    "povariel","trulemin","vandrelis","nevariax","dorinaxa","xelvoria","zatowa",
    "miraku","senkyo","torima","kureto","nobire","haruea","iyurami","zizumeri",
    "auiten","hirobushi","keyaguvi","guitenpi","nanryoki","vandebu","outhime",
    "parenfu","kityuda","werica","taxgen"
];

const width = 300;
const height = 300;

const outputDir = path.join(__dirname, 'public/images');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

words.forEach(word => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 背景：青
  ctx.fillStyle = '#2196f3'; // blue
  ctx.fillRect(0, 0, width, height);

  // フォント設定（Times New Roman）
  ctx.font = 'bold 48px "Times New Roman"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 黒のアウトライン
  ctx.lineWidth = 6;
  ctx.strokeStyle = 'black';
  ctx.strokeText(word, width / 2, height / 2);

  // ピンクの文字
  ctx.fillStyle = '#ffc0cb';
  ctx.fillText(word, width / 2, height / 2);

  // 画像として保存
  const outPath = path.join(outputDir, `${word}.jpg`);
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(outPath, buffer);
  console.log(`Saved: ${outPath}`);
});