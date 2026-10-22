import {CategoryPage} from '@/components/site';
export function generateStaticParams(){return ['calcados','capacetes','vestimentas','auditiva','limpeza','incendio'].map(slug=>({slug}))}
export default async function Page({params}:{params:Promise<{slug:string}>}){return <CategoryPage slug={(await params).slug}/>}
