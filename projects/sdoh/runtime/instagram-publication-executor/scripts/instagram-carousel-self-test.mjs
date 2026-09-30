import { createInstagramClient } from "../src/instagram-carousel-executor.js";

const calls = [];
const queue = [
  { id: "child-1" },
  { id: "parent-1" },
  { id: "parent-1", status_code: "FINISHED", status: "ready" },
  { id: "media-1" },
  {
    id: "media-1",
    permalink: "https://www.instagram.com/p/test/",
    timestamp: "2026-09-30T00:00:00+0000",
    caption: "locked caption",
  },
];

const fetchImpl = async (url, options = {}) => {
  calls.push({
    url,
    method: options.method || "GET",
    body: options.body || null,
    authorization: options.headers?.Authorization ? "PRESENT" : "MISSING",
  });
  const payload = queue.shift();
  if (!payload) throw new Error("unexpected extra request");
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

const client = createInstagramClient({
  accessToken: "test-token",
  igUserId: "17841437534220039",
  apiBase: "https://graph.instagram.com",
  fetchImpl,
});

const child = await client.createCarouselChild({
  imageUrl: "https://worker.example/media/job/1?exp=1&sig=x",
});
if (child !== "child-1") throw new Error("child creation contract failed");

const parent = await client.createCarouselParent({
  childIds: ["c1", "c2", "c3", "c4", "c5"],
  caption: "locked caption",
});
if (parent !== "parent-1") throw new Error("parent creation contract failed");

const status = await client.getContainerStatus(parent);
if (status.status_code !== "FINISHED") throw new Error("container status contract failed");

const mediaId = await client.publishContainer(parent);
if (mediaId !== "media-1") throw new Error("publish contract failed");

const media = await client.getPublishedMedia(mediaId);
if (
  media.id !== "media-1" ||
  media.permalink !== "https://www.instagram.com/p/test/" ||
  media.caption !== "locked caption"
) {
  throw new Error("published media verification contract failed");
}

const childCall = calls[0];
if (childCall.method !== "POST" || !childCall.url.endsWith("/17841437534220039/media")) {
  throw new Error("child endpoint mismatch");
}
const childParams = new URLSearchParams(childCall.body);
if (
  childParams.get("is_carousel_item") !== "true" ||
  !childParams.get("image_url")?.startsWith("https://worker.example/media/")
) {
  throw new Error("child payload mismatch");
}

const parentParams = new URLSearchParams(calls[1].body);
if (
  parentParams.get("media_type") !== "CAROUSEL" ||
  parentParams.get("children") !== "c1,c2,c3,c4,c5" ||
  parentParams.get("caption") !== "locked caption"
) {
  throw new Error("parent payload mismatch");
}

if (calls[3].method !== "POST" || !calls[3].url.endsWith("/17841437534220039/media_publish")) {
  throw new Error("publish endpoint mismatch");
}
const publishParams = new URLSearchParams(calls[3].body);
if (publishParams.get("creation_id") !== "parent-1") {
  throw new Error("publish payload mismatch");
}

if (calls.some((call) => call.authorization !== "PRESENT")) {
  throw new Error("Bearer authorization missing");
}

console.log("instagram carousel executor self-test PASS");
console.log("child create → parent create → status → publish → remote verify contract PASS");
