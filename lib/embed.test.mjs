import assert from "node:assert/strict";
import { test } from "node:test";
import { embedUrl } from "./embed.mjs";

test("embedUrl", () => {
  const yt = "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ";
  assert.equal(embedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1s"), yt);
  assert.equal(embedUrl("https://youtu.be/dQw4w9WgXcQ"), yt);
  assert.equal(embedUrl("https://youtube.com/shorts/dQw4w9WgXcQ"), yt);
  assert.equal(embedUrl("https://vimeo.com/123456789"), "https://player.vimeo.com/video/123456789");
  assert.equal(embedUrl("https://player.vimeo.com/video/123456789?h=abc"), "https://player.vimeo.com/video/123456789");
  assert.equal(embedUrl("https://example.com/clip.mp4"), undefined);
  assert.equal(embedUrl(""), undefined);
});
