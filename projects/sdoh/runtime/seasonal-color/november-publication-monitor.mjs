// Read-only campaign monitor: never stages, retries or publishes.
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

export function inspectCampaign(delivery, documents, nowMs=Date.now()) {
  if (!delivery.publication?.authorized || !delivery.publication?.scheduled)
    return {ok:true, decision:'CAMPAIGN_NOT_ACTIVE', checked:0, alerts:[]};
  const alerts=[];
  for (const record of delivery.records) {
    const doc=documents.find(d=>d.id===record.register_document_id);
    const lines=String(doc?.content||'').split(/\r?\n/);
    const rows=lines.filter(l=>l.trim().startsWith('|'))
      .map(l=>l.trim().slice(1,-1).split('|').map(c=>c.replace(/\*\*|\x60/g,'').trim()))
      .filter(c=>c[0]===record.content_id && c[1]==='Instagram — @satudosisobathati');
    if(rows.length!==1) {
      alerts.push({content_id:record.content_id,reason:'PUBLICATION_ROW_MISSING_OR_DUPLICATE'});
      continue;
    }
    const row=rows[0], expected=Date.parse(record.planned_at);
    const schedule=row[2].match(/^(\d{4}-\d{2}-\d{2}),\s*(\d{2}:\d{2}) WITA$/);
    const actual=schedule?Date.parse(schedule[1]+'T'+schedule[2]+':00+08:00'):Date.parse(row[2]);
    if(!Number.isFinite(expected)||actual!==expected)
      alerts.push({content_id:record.content_id,reason:'SCHEDULE_DRIFT'});
    if(!['SCHEDULED','PUBLISHED'].includes(row[3]))
      alerts.push({content_id:record.content_id,reason:'PUBLICATION_STATE_DRIFT'});
    if(nowMs>expected+30*60*1000 && row[3]!=='PUBLISHED')
      alerts.push({content_id:record.content_id,reason:'OVERDUE_WITHOUT_PUBLISHED_REGISTER_EVIDENCE'});
  }
  return {ok:alerts.length===0,decision:alerts.length?'CAMPAIGN_ATTENTION_REQUIRED':'CAMPAIGN_MONITOR_PASS',checked:delivery.records.length,alerts};
}

async function main(){
  const delivery=JSON.parse(readFileSync(new URL('./2026-11-delivery-preparation.json',import.meta.url),'utf8'));
  const documents=[];
  for(const id of new Set(delivery.records.map(r=>r.register_document_id))){
    const response=await fetch('https://api.linear.app/graphql',{
      method:'POST',signal:AbortSignal.timeout(30000),
      headers:{'Content-Type':'application/json',Authorization:process.env.LINEAR_API_KEY||''},
      body:JSON.stringify({query:'query($id:String!){document(id:$id){id content}}',variables:{id}})
    });
    if(!response.ok)throw Error('LINEAR_READ_FAILED');
    const data=await response.json();
    if(data.errors?.length || !data.data?.document?.content)throw Error('LINEAR_READ_FAILED');
    documents.push(data.data.document);
  }
  const result=inspectCampaign(delivery,documents);
  console.log(JSON.stringify(result));
  if(!result.ok){
    console.error('::error::Campaign schedule/evidence needs reconciliation. Do not blind-retry publication.');
    process.exitCode=1;
  }
}
if(import.meta.url===pathToFileURL(process.argv[1]||'').href){
  main().catch(()=>{console.error('::error::Campaign monitoring failed; publication state is unverified.');process.exitCode=1;});
}
