import {DetailPage} from '@/components/site';
export function generateStaticParams(){return ['bota-gogowear-caramelo','botina-seguranca-escura','bota-seguranca-marrom','bota-seguranca-cinza','capacete-de-protecao','colete-refletivo','protetor-auditivo-plug','bota-pvc-branca','vestimenta-camara-fria','avental-vinil','linha-limpeza-profissional','extintor-incendio'].map(slug=>({slug}))}
export default async function Page({params}:{params:Promise<{slug:string}>}){return <DetailPage slug={(await params).slug}/>}
