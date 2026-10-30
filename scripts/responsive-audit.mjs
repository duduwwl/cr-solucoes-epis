import { Browser } from 'file:///C:/Users/dudum/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const out='.taste-skill/responsive';mkdirSync(out,{recursive:true});
const browser=await Browser.launch();const results=[];
try {
 for(const width of [320,390,768,1024,1440]){
  const page=await browser.newPage({width,height:900,mobile:width<600,reducedMotion:true});
  for(const route of ['/','/produtos/','/empresas/','/sobre/','/contato/']){
   await page.goto('http://localhost:4010'+route);
   await page.eval(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});
   const state=await page.eval(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src)}));
   results.push({width,route,...state});
   if(route==='/'){
    await page.eval(()=>document.querySelector('.hero-stage').scrollIntoView({block:'center'}));
    for(let index=0;index<7;index++){
     await page.eval(i=>document.querySelectorAll('.hero-progress button')[i].click(),index);
     await new Promise(r=>setTimeout(r,80));
     const slide=await page.eval(()=>{const stage=document.querySelector('.hero-stage').getBoundingClientRect();const link=document.querySelector('.hero-slide.active');const im=link.querySelector('img').getBoundingClientRect();const copy=link.querySelector('.hero-slide-copy').getBoundingClientRect();const buttons=[...document.querySelectorAll('.hero-progress button')].map(b=>b.getBoundingClientRect());return {active:document.querySelectorAll('.hero-slide.active').length,overlap:im.bottom>copy.top+1,buttonsFit:buttons.every(b=>b.left>=stage.left&&b.right<=stage.right+1&&b.height>=44)}});
     assert.equal(slide.active,1);assert.equal(slide.overlap,false);assert.equal(slide.buttonsFit,true);
     if(index===4||index===0)await page.screenshot({path:`${out}/${width}-slide-${index}.jpg`});
    }
   }
  }
  await page.close();
 }
 const autoPage=await browser.newPage({width:390,height:844,mobile:true,reducedMotion:false});
 await autoPage.goto('http://localhost:4010/');
 const activeBefore=await autoPage.eval(()=>document.querySelector('.hero-progress button.active')?.getAttribute('aria-label'));
 await new Promise(r=>setTimeout(r,2300));
 const activeAfter=await autoPage.eval(()=>document.querySelector('.hero-progress button.active')?.getAttribute('aria-label'));
 assert.notEqual(activeAfter,activeBefore,'mobile carousel must advance automatically');
 assert.equal(await autoPage.eval(()=>document.querySelector('.hero-rotation-toggle'),null),null,'carousel must not render pause control');
 await autoPage.close();
 writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));
 assert(results.every(r=>!r.overflow&&!r.broken.length),JSON.stringify(results.filter(r=>r.overflow||r.broken.length)));
 console.log('PASS: 25 page/viewport combinations, 35 slide selections, 2-second carousel auto-rotation, no image failures or horizontal overflow.');
}finally{await browser.close()}
