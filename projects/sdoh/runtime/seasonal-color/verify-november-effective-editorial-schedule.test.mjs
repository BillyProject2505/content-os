// Effective editorial reschedule only. Historical QA bindings and approved media
// archive are immutable; this validator never schedules or publishes anything.
import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const base=new URL("./",import.meta.url);
const read=(name)=>JSON.parse(readFileSync(new URL(name,base),"utf8"));
const active=read("2026-11-effective-editorial-schedule.json");
const binding=read("2026-11-content-binding.json");
const archived=read("2026-11-final-media-archive.json");
const seasonal=read("2026-11-trans-awareness.json");
const frozen=read("2026-11-editorial-series-draft.json");
const memorialId="SDOH-BURGUNDY-CAR-0020";
const nextDay=(date)=>new Date(Date.parse(date+"T12:00:00Z")+86400000).toISOString().slice(0,10);

test("13 approved items retain identity, order, fingerprints, original evidence and unique new dates",()=>{
  assert.equal(active.schema,"sdoh-november-2026-effective-editorial-schedule-v1");
  assert.equal(active.decision,"OWNER_REQUESTED_RESTART_NOVEMBER_09");
  assert.equal(active.timezone,"Asia/Makassar");
  assert.equal(active.status,"EDITORIAL_DATE_REVISION_ONLY");
  assert.equal(active.items.length,13);
  assert.equal(active.summary.content_items,13);
  assert.equal(active.summary.shifted_by_one_day,12);
  assert.equal(active.summary.protected_memorial_date,1);
  assert.equal(active.effective_period.start,"2026-11-09");
  assert.equal(active.effective_period.end,"2026-11-30");
  assert.equal(binding.items.length,13);
  assert.equal(archived.items.length,13);
  const dates=new Set(),ids=new Set();
  active.items.forEach((item,index)=>{
    const old=binding.items[index],media=archived.items[index];
    assert.equal(item.content_id,old.content_id);
    assert.equal(item.content_id,media.content_id);
    assert.equal(item.theme,old.theme);
    assert.equal(item.copy_fingerprint,old.copy_fingerprint);
    assert.equal(item.copy_fingerprint,media.copy_fingerprint);
    assert.equal(item.previous_editorial_date,old.target_date);
    assert.equal(item.previous_editorial_date,media.editorial_date);
    assert.equal(item.owner_final_media_approval,media.owner_approval_evidence);
    assert.equal(item.archive_registry_content_id,media.content_id);
    assert.equal(item.revised_editorial_date,
      item.content_id===memorialId?old.target_date:nextDay(old.target_date));
    assert.equal(item.date_rule,item.content_id===memorialId?
      "FIXED_NOVEMBER_20_TDOR":"MOVE_PLUS_ONE_CALENDAR_DAY");
    assert.match(item.revised_editorial_date,/^2026-11-(?:0[9]|[12][0-9]|30)$/);
    assert.ok(!ids.has(item.content_id)&&!dates.has(item.revised_editorial_date),"Duplicate content/date");
    ids.add(item.content_id);dates.add(item.revised_editorial_date);
  });
  assert.equal(active.items[0].revised_editorial_date,"2026-11-09");
  assert.equal(active.items.at(-1).revised_editorial_date,"2026-11-30");
  assert.equal(dates.size,13);
});

test("memorial item remains on Nov 20 because approved copy explicitly says 'hari ini'",()=>{
  const p=active.items.find(x=>x.content_id===memorialId);
  assert.ok(p);
  assert.equal(p.revised_editorial_date,"2026-11-20");
  const root=new URL("../../../../",import.meta.url);
  const copy=JSON.parse(readFileSync(new URL("projects/sdoh/content/burgundy/carousel/SDOH-BURGUNDY-CAR-0020.json",root),"utf8"));
  assert.match(copy.slides[0].copy,/hari ini/);
  assert.match(copy.caption_body_paragraphs[0],/tanggal 20 november/);
});

test("historic dates remain immutable and no publish, schedule or activation authority is invented",()=>{
  assert.deepEqual(binding.items.map(x=>x.target_date),
    archived.items.map(x=>x.editorial_date));
  assert.deepEqual(binding.items.map(x=>[x.target_date,x.content_id]),
    frozen.schedule.filter(x=>x.theme!=="OFF").map(x=>[x.date,x.content_id]));
  assert.equal(active.authority.frozen_evidence_unchanged,true);
  assert.equal(active.authority.release_gate_separate,true);
  assert.equal(active.calendar.publication_time,null);
  assert.equal(active.calendar.channel,null);
  assert.equal(active.calendar.calendar_events_created,false);
  assert.equal(active.calendar.scheduling_executed,false);
  assert.equal(active.publication.scheduled,false);
  assert.equal(active.publication.authorized,false);
  assert.equal(active.publication.activation_enabled,false);
  assert.equal(active.publication.published_by_this_revision,false);
  assert.equal(archived.publication.scheduled,false);
  assert.equal(archived.publication.authorized,false);
  assert.equal(seasonal.activation.enabled,false);
});
