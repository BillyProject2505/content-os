import test from 'node:test';
import assert from 'node:assert/strict';
import {inspectCampaign} from './november-publication-monitor.mjs';
const record={content_id:'SDOH-SAGE-CAR-0015',register_document_id:'sage',planned_at:'2026-11-09T19:30:00+08:00'};
const delivery={publication:{authorized:true,scheduled:true},records:[record]};
const doc=(state='SCHEDULED',date='2026-11-09, 19:30 WITA')=>[{id:'sage',content:'| SDOH-SAGE-CAR-0015 | Instagram — @satudosisobathati | '+date+' | **'+state+'** |'}];
const due=Date.parse(record.planned_at);
test('future and within-window scheduled records do not alert',()=>{
 assert.equal(inspectCampaign(delivery,doc(),due-1).ok,true);
 assert.equal(inspectCampaign(delivery,doc(),due+1800000).ok,true);
});
test('overdue scheduled record alerts instead of silent success',()=>{
 const r=inspectCampaign(delivery,doc(),due+1800001);
 assert.equal(r.ok,false);assert.equal(r.alerts[0].reason,'OVERDUE_WITHOUT_PUBLISHED_REGISTER_EVIDENCE');
});
test('published register record does not trigger retry or overdue alert',()=>{
 assert.equal(inspectCampaign(delivery,doc('PUBLISHED'),due+86400000).ok,true);
});
test('missing/duplicate rows, changed state and date fail closed',()=>{
 assert.equal(inspectCampaign(delivery,[],due).ok,false);
 const docs=doc();docs[0].content+='\n'+docs[0].content;
 assert.equal(inspectCampaign(delivery,docs,due).ok,false);
 assert.equal(inspectCampaign(delivery,doc('PLANNED'),due).ok,false);
 assert.equal(inspectCampaign(delivery,doc('SCHEDULED','2026-11-10, 19:30 WITA'),due).ok,false);
});
test('inactive campaign is not treated as scheduled',()=>{
 assert.equal(inspectCampaign({...delivery,publication:{authorized:false}},[],due).decision,'CAMPAIGN_NOT_ACTIVE');
});
