import test from 'node:test';
import assert from 'node:assert/strict';

test('feedback respects reduced motion, cancels stale effects and never requires animation support', async () => {
  const original = globalThis.matchMedia;
  const media = { matches: false, addEventListener(type, handler) { this.onChange = handler; } };
  globalThis.matchMedia = () => media;
  try {
    const { animateFeedback } = await import('../src/interaction-feedback.js?accessibility-test');
    let calls = 0;
    const animations = [];
    const element = { animate(frames, options) {
      calls++;
      assert.ok(options.duration < 300);
      const events = {};
      const animation = { cancelled: false, addEventListener(event, handler) { events[event] = handler; }, cancel() { this.cancelled = true; events.cancel?.(); } };
      animations.push(animation);
      return animation;
    } };
    animateFeedback(element,[{opacity:.65},{opacity:1}]);
    animateFeedback(element,[{opacity:.65},{opacity:1}]);
    assert.equal(animations[0].cancelled,true);
    media.matches = true;
    media.onChange({matches:true});
    assert.equal(animations[1].cancelled,true);
    assert.equal(animateFeedback(element,[]),null);
    assert.equal(calls,2);
    assert.equal(animateFeedback(null,[]),null);
    media.matches = false;
    assert.equal(animateFeedback({},[]),null);
  } finally {
    if (original) globalThis.matchMedia = original;
    else delete globalThis.matchMedia;
  }
});
