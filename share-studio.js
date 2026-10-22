/* Share Studio page logic: previews, PNG export, MP4 export (WebCodecs H.264
   muxed with mp4-muxer), and caption copy. Export approach follows the Market
   Studio on santaclaritaopenhouses.com, adapted to plain static JS. */
(function () {
  'use strict';
  var T = window.HAVTiles;
  var PREVIEW_SCALE = 0.5;
  var CODECS = ['avc1.640028', 'avc1.4d0028', 'avc1.420028'];

  function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Mac/i.test(navigator.platform));
  }
  function isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Mac/i.test(navigator.platform));
  }
  function canVideo() { return typeof window.VideoEncoder === 'function' && typeof window.VideoFrame === 'function' && !!window.Mp4Muxer; }

  var held = [];
  window.addEventListener('pagehide', function () { held.forEach(function (u) { try { URL.revokeObjectURL(u); } catch (e) {} }); held = []; });

  // Phones get the share sheet (Save Video, Instagram, TikTok one tap away).
  // Desktop always gets a plain download. iOS never takes the <a download> path.
  async function deliver(blob, filename, type) {
    var file = new File([blob], filename, { type: type });
    if (isMobile() && navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file] }); return 'shared'; }
      catch (e) { if (e && e.name === 'AbortError') return 'shared'; }
    }
    var url = URL.createObjectURL(blob); held.push(url);
    if (isIOS()) { var w = window.open(url, '_blank'); if (w) return 'opened'; }
    var a = document.createElement('a');
    a.href = url; a.download = filename; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
    return 'downloaded';
  }

  function fullCanvas(fmtKey) {
    var f = T.FORMATS[fmtKey], c = document.createElement('canvas');
    c.width = f.w; c.height = f.h; return c;
  }
  function fileBase(tile, fmtKey) { var f = T.FORMATS[fmtKey]; return 'hireaivoice-' + tile.id + '-' + fmtKey + '-' + f.w + 'x' + f.h; }

  async function exportPng(tile, fmtKey) {
    await T.ready;
    var c = fullCanvas(fmtKey), ctx = c.getContext('2d');
    T.draw(ctx, tile, fmtKey, T.SECONDS);
    var blob = await new Promise(function (res) { c.toBlob(res, 'image/png'); });
    if (!blob) throw new Error('The PNG render came back empty.');
    return deliver(blob, fileBase(tile, fmtKey) + '.png', 'image/png');
  }

  async function pickCodec(w, h, fps, bitrate) {
    for (var i = 0; i < CODECS.length; i++) {
      try {
        var r = await VideoEncoder.isConfigSupported({ codec: CODECS[i], width: w, height: h, framerate: fps, bitrate: bitrate, avc: { format: 'avc' } });
        if (r.supported) return CODECS[i];
      } catch (e) { /* next */ }
    }
    return null;
  }
  function yieldNow() { return new Promise(function (r) { setTimeout(r, 0); }); }

  async function exportMp4(tile, fmtKey, onProgress) {
    await T.ready;
    if (!canVideo()) throw new Error('This browser cannot make MP4 files. Try Chrome or Edge on a computer.');
    var f = T.FORMATS[fmtKey], W = f.w, H = f.h, fps = T.FPS, total = T.SECONDS * fps;
    var bitrate = Math.min(16000000, Math.max(6000000, Math.round(W * H * 0.9)));
    var codec = await pickCodec(W, H, fps, bitrate);
    if (!codec) throw new Error('No H.264 encoder is available for ' + W + 'x' + H + ' in this browser.');

    var muxer = new Mp4Muxer.Muxer({
      target: new Mp4Muxer.ArrayBufferTarget(),
      fastStart: 'in-memory',
      video: { codec: 'avc', width: W, height: H, frameRate: fps }
    });
    var encErr = null;
    var enc = new VideoEncoder({
      output: function (chunk, meta) { muxer.addVideoChunk(chunk, meta); },
      error: function (e) { encErr = e; }
    });
    enc.configure({ codec: codec, width: W, height: H, framerate: fps, bitrate: bitrate, avc: { format: 'avc' } });

    var c = fullCanvas(fmtKey), ctx = c.getContext('2d');
    var L = T.layout(ctx, tile, f);
    try {
      for (var i = 0; i < total; i++) {
        if (encErr) throw encErr;
        // last frame lands exactly on the settled still
        var t = i === total - 1 ? T.SECONDS : i / fps;
        T.draw(ctx, tile, fmtKey, t, L);
        var frame = new VideoFrame(c, { timestamp: Math.round(i / fps * 1e6), duration: Math.round(1e6 / fps) });
        enc.encode(frame, { keyFrame: i % fps === 0 });
        frame.close();
        if (enc.encodeQueueSize > 8) {
          var last = Date.now(), deepest = enc.encodeQueueSize;
          while (enc.encodeQueueSize > 4) {
            if (encErr) throw encErr;
            await yieldNow();
            if (enc.encodeQueueSize < deepest) { deepest = enc.encodeQueueSize; last = Date.now(); }
            else if (Date.now() - last > 45000) throw new Error('The encoder stalled.');
          }
        }
        if (i % 6 === 0) { if (onProgress) onProgress(i / total); await yieldNow(); }
      }
      await enc.flush();
      if (encErr) throw encErr;
      muxer.finalize();
    } finally { try { enc.close(); } catch (e) {} }
    if (onProgress) onProgress(1);
    var buf = muxer.target.buffer;
    if (!buf || buf.byteLength < 4096) throw new Error('The encoder returned an empty file.');
    return deliver(new Blob([buf], { type: 'video/mp4' }), fileBase(tile, fmtKey) + '.mp4', 'video/mp4');
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (e) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e2) {}
      ta.remove(); return ok;
    }
  }

  /* ---------- page ---------- */
  var state = {}; // tile id -> fmt key
  var grid = document.getElementById('tiles');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function renderPreview(card, tile, t) {
    var fmtKey = state[tile.id], f = T.FORMATS[fmtKey];
    var cv = card.querySelector('canvas');
    var w = Math.round(f.w * PREVIEW_SCALE), h = Math.round(f.h * PREVIEW_SCALE);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; cv._L = null; }
    var ctx = cv.getContext('2d');
    ctx.setTransform(PREVIEW_SCALE, 0, 0, PREVIEW_SCALE, 0, 0);
    cv._L = T.draw(ctx, tile, fmtKey, t == null ? T.SECONDS : t, cv._L);
    cv.setAttribute('aria-label', tile.kicker + ' tile, ' + f.label + ': ' + tile.head);
    card.querySelector('.st-stage').setAttribute('data-fmt', fmtKey);
    card.querySelectorAll('[data-fmt-btn]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-fmt-btn') === fmtKey)); });
    card.querySelectorAll('.ms-mp4,.ms-dl,.ms-copy').forEach(function (b) { b.setAttribute('data-fmt', fmtKey); });
    card.querySelector('.st-size').textContent = f.w + ' x ' + f.h + ' · ' + f.name;
  }

  function play(card, tile) {
    var start = performance.now(), btn = card.querySelector('.st-play');
    if (card._raf) cancelAnimationFrame(card._raf);
    btn.hidden = true;
    function step(now) {
      var t = (now - start) / 1000;
      if (t >= T.SECONDS) { renderPreview(card, tile); btn.hidden = false; card._raf = null; return; }
      renderPreview(card, tile, t);
      card._raf = requestAnimationFrame(step);
    }
    card._raf = requestAnimationFrame(step);
  }

  function setStatus(card, msg, kind) {
    var s = card.querySelector('.st-status'); s.textContent = msg; s.className = 'st-status' + (kind ? ' ' + kind : '');
  }

  var busy = false;
  T.TILES.forEach(function (tile, idx) {
    state[tile.id] = 'story';
    var card = document.createElement('article');
    card.className = 'st-card'; card.id = 'tile-' + tile.id;
    var fmtBtns = Object.keys(T.FORMATS).map(function (k) {
      return '<button type="button" data-fmt-btn="' + k + '" aria-pressed="false">' + T.FORMATS[k].label + '</button>';
    }).join('');
    var mp4Label = isMobile() ? 'Share MP4' : 'Download MP4';
    var pngLabel = isMobile() ? 'Share PNG' : 'Download PNG';
    card.innerHTML =
      '<div class="st-head"><span class="st-num">' + String(idx + 1).padStart(2, '0') + '</span><span class="st-kicker">' + esc(tile.kicker) + '</span></div>' +
      '<div class="st-fmts" role="group" aria-label="Tile size">' + fmtBtns + '</div>' +
      '<div class="st-stage" data-fmt="story"><canvas role="img"></canvas><button type="button" class="st-play" aria-label="Play motion preview">&#9654; Preview motion</button></div>' +
      '<p class="st-size small"></p>' +
      '<div class="st-actions"><button type="button" class="ms-mp4" data-fmt="story">' + mp4Label + '</button><button type="button" class="ms-dl" data-fmt="story">' + pngLabel + '</button></div>' +
      '<p class="st-status" role="status" aria-live="polite"></p>' +
      '<label class="st-cap-label" for="cap-' + tile.id + '">Caption</label>' +
      '<textarea id="cap-' + tile.id + '" class="st-cap" readonly rows="7">' + esc(tile.caption) + '</textarea>' +
      '<button type="button" class="ms-copy" data-fmt="story">Copy caption</button>';
    grid.appendChild(card);

    card.querySelectorAll('[data-fmt-btn]').forEach(function (b) {
      b.addEventListener('click', function () { state[tile.id] = b.getAttribute('data-fmt-btn'); renderPreview(card, tile); });
    });
    card.querySelector('.st-play').addEventListener('click', function () { play(card, tile); });

    card.querySelector('.ms-dl').addEventListener('click', async function (ev) {
      var b = ev.currentTarget; b.disabled = true; setStatus(card, 'Rendering PNG…');
      try { var r = await exportPng(tile, state[tile.id]); setStatus(card, r === 'downloaded' ? 'PNG downloaded.' : 'PNG ready.', 'ok'); }
      catch (e) { setStatus(card, (e && e.message) || 'PNG export failed.', 'err'); }
      b.disabled = false;
    });

    card.querySelector('.ms-mp4').addEventListener('click', async function (ev) {
      if (busy) { setStatus(card, 'Another MP4 is rendering. One at a time.', 'err'); return; }
      var b = ev.currentTarget; b.disabled = true; busy = true;
      try {
        var r = await exportMp4(tile, state[tile.id], function (p) { setStatus(card, 'Rendering MP4… ' + Math.round(p * 100) + '%'); });
        setStatus(card, r === 'downloaded' ? 'MP4 downloaded.' : r === 'opened' ? 'MP4 opened in a new tab. Use Share to save it.' : 'MP4 ready.', 'ok');
      } catch (e) { setStatus(card, (e && e.message) || 'MP4 export failed.', 'err'); }
      busy = false; b.disabled = false;
    });

    card.querySelector('.ms-copy').addEventListener('click', async function (ev) {
      var b = ev.currentTarget, ok = await copyText(tile.caption);
      b.textContent = ok ? 'Copied' : 'Select and copy';
      if (!ok) { var ta = card.querySelector('.st-cap'); ta.focus(); ta.select(); }
      setTimeout(function () { b.textContent = 'Copy caption'; }, 1800);
    });

    T.ready.then(function () { renderPreview(card, tile); });
  });

  if (!canVideo()) {
    document.getElementById('mp4-note').hidden = false;
    document.querySelectorAll('.ms-mp4').forEach(function (b) { b.disabled = true; b.title = 'MP4 needs Chrome or Edge on a computer.'; });
  }

  document.querySelectorAll('[data-all-fmt]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-all-fmt');
      document.querySelectorAll('[data-all-fmt]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      T.TILES.forEach(function (tile) { state[tile.id] = k; renderPreview(document.getElementById('tile-' + tile.id), tile); });
    });
  });
})();
