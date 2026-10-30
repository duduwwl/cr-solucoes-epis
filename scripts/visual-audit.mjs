import { Browser } from 'file:///C:/Users/dudum/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { readFileSync, mkdirSync } from 'node:fs';
const out = '.taste-skill/product-audit';
mkdirSync(out, {recursive:true});
const browser = await Browser.launch();
try {
 const page = await browser.newPage({width:1200,height:1000});
 await page.goto('http://localhost:4010/');
 const meta=JSON.parse(readFileSync('src/data/images.json','utf8'));
 const names=Object.keys(meta).filter(n=>n.startsWith('t-'));
 for(let i=0;i<names.length;i+=12){
  await page.eval(({names,meta})=>{document.body.innerHTML='<main style="display:grid;grid-template-columns:repeat(4,1fr);background:white;color:black">'+names.map(n=>`<div style="height:310px;text-align:center;font:14px Arial"><img style="height:270px;width:95%;object-fit:contain" src="/images/opt/${n}-${meta[n].sizes.at(-1)}.webp"><p>${n}</p></div>`).join('')+'</main>';return Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))},{names:names.slice(i,i+12),meta});
  await page.screenshot({path:`${out}/sheet-${i}.jpg`});
 }
} finally {await browser.close();}
