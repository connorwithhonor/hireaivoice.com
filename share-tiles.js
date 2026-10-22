/* HireAIVoice Share Studio tiles.
   Every tile is drawn straight onto a canvas as a pure function of time, so the
   PNG, the on-page preview and every MP4 frame come from the same code path.
   Claims stay inside what hireaivoice.com already says. No stats, no results. */
(function () {
  'use strict';

  var DEMO = '(661) 219-7299';
  var URL_SHOW = 'hireaivoice.com';
  var URL_FULL = 'https://hireaivoice.com';
  var ASK = 'Want one built for your business?';
  var CTA = 'Call the demo ' + DEMO;
  var BUILT = 'Built by Connor MacIvor';
  var CRED = ['20 years with LAPD', '28 years running a Santa Clarita business', 'builds AI phone systems'];
  var PORTRAIT_SRC = '/connor-portrait.jpg';

  var C = {
    bg: '#f5f5ed', white: '#ffffff', ink: '#122921', muted: '#52645c',
    green: '#09683f', greenSoft: '#edf5ef', greenTint: '#ddebe1',
    line: '#dbe3dc', amber: '#c07910'
  };
  var SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, Roboto, Helvetica, Arial, sans-serif';
  var EMOJI = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';

  var FORMATS = {
    story:  { w: 1080, h: 1920, label: '9:16', name: 'Reels, TikTok, Stories' },
    square: { w: 1080, h: 1080, label: '1:1',  name: 'Feed post' },
    link:   { w: 1200, h: 628,  label: '1200x628', name: 'Facebook, LinkedIn link' }
  };

  var SECONDS = 6, FPS = 30;
  var ANSWER_AT = 2.4; // the phone stops ringing and the AI picks up

  var CLOSE = '\n\nBuilt by Connor MacIvor. 20 years with LAPD, 28 years running a Santa Clarita business, and now building AI phone systems.\n\n' + ASK + ' ' + CTA + '\n' + URL_FULL;

  var TILES = [
    { id: 'under-the-sink', kicker: 'Plumbers', emoji: '🔧',
      head: 'You’re under a sink. Your phone is buzzing in your back pocket.',
      sub: 'Let it ring. The AI picks up, holds a real conversation, captures the job and books it to your calendar.',
      chat: [['Caller', 'Kitchen sink is backing up. Can someone come Friday?'], ['AI', 'I’m the AI assistant for the shop. Let’s get your address and a good time.']],
      caption: 'You’re under a sink with both hands full. The phone buzzes. Do you crawl out, or do you let a new customer go to voicemail?\n\nNeither. HireAIVoice answers the calls your team can’t get to. It says it’s an AI, holds a real conversation, captures the job and books it to your calendar.\n\nStay under the sink. The call is covered.' + CLOSE + '\n\n#plumbing #plumber #smallbusiness #missedcalls' },
    { id: 'two-am-water-heater', kicker: 'After hours', emoji: '🚿',
      head: '2 AM. Cold shower. Your phone is on the nightstand. On silent.',
      sub: 'The AI answers, follows your emergency rules, captures the address and texts your on-call tech.',
      chat: [['Caller', 'Our water heater just quit. There’s water on the floor.'], ['AI', 'I’m an AI assistant. I’ll take your address and alert the on-call tech now.']],
      caption: 'Water heaters don’t fail on business hours.\n\nWhen the 2 AM call comes in, HireAIVoice answers it. It introduces itself as AI, follows the emergency rules you approve, captures the address and callback number, and can text your on-call tech the details.\n\nYou sleep. The caller gets an answer instead of a beep.' + CLOSE + '\n\n#plumbing #waterheater #afterhours #smallbusiness' },
    { id: 'voicemail-hallway', kicker: 'Voicemail', emoji: '🚪',
      head: 'Voicemail is a hallway to somebody else’s phone.',
      sub: 'A caller who hits voicemail may leave a message. Or call the next company on the list. Give them an answer instead.',
      caption: 'Voicemail is a hallway. At the end of it is your competitor’s phone.\n\nA caller who hits your voicemail may leave a message, call back later, or call the next business on the list. HireAIVoice gives them a real answer: a conversation, a captured request, and a clear next step.' + CLOSE + '\n\n#smallbusiness #missedcalls #customerservice' },
    { id: 'step-one', kicker: 'The whole system', emoji: '🧩',
      head: 'An answered call is step one.',
      sub: 'Once the phone is covered, the next bottleneck is follow-up, booking, reviews and getting paid. Built around the way your team works.',
      quote: 'We’ll decide where AI helps, where a person belongs, and what to measure.',
      caption: 'Answering the phone is step one. It is not the whole job.\n\nOnce the phone is covered, the next bottleneck shows up: follow-up, booking, reviews, getting paid. HireAIVoice opens the door, and HonorElevate connects what comes next, built around the way your team already works.\n\nOne builder. One system. Measured on what actually happened.' + CLOSE + '\n\n#smallbusiness #automation #ai #operations' },
    { id: 'six-twelve-pitch', kicker: 'Roofers', emoji: '🏠',
      head: 'You’re on a 6/12 pitch. Don’t answer that.',
      sub: 'Stay on the roof. The AI answers the overflow call, gets the address and the leak details, and hands your team a clear next step.',
      chat: [['Caller', 'We’ve got a leak over the garage. Can you come look?'], ['AI', 'I can help with that. What’s the address, and when is a good time?']],
      caption: 'Nobody should be answering the phone on a 6/12 pitch.\n\nHireAIVoice covers the overflow and after-hours calls while your crew is up top. It introduces itself as AI, gets the address and the leak details, and hands your team a clear next step.\n\nBoots on the roof. Phone covered.' + CLOSE + '\n\n#roofing #roofer #contractor #smallbusiness' },
    { id: 'eight-pm-no-heat', kicker: 'HVAC', emoji: '🔥',
      head: '8 PM. No heat. They’re calling down the list.',
      sub: 'Be the one that answers. After-hours calls get a real conversation, your emergency rules and a booking option.',
      chat: [['Caller', 'The heater won’t turn on and it’s getting cold in here.'], ['AI', 'I’m the AI assistant. Let’s get your details and find the next available time.']],
      caption: '8 PM. The heat is out. The homeowner is calling down the list.\n\nThe company that answers is the one in the running. HireAIVoice answers after-hours calls, follows your approved emergency rules, captures the details, and can offer an available service time.' + CLOSE + '\n\n#hvac #heating #afterhours #smallbusiness' },
    { id: 'ai-on-purpose', kicker: 'No pretending', emoji: '🤖',
      head: 'It says it’s an AI. On purpose.',
      sub: 'No fake receptionist. It introduces itself as AI, then gets to work: answers, captures the request, books it and follows up.',
      chat: [['AI', 'Thanks for calling. I’m an AI assistant for the business. How can I help?'], ['Caller', 'Oh. Okay. Do you have anything Thursday?']],
      caption: 'Our AI tells every caller it’s an AI. In the first breath. On purpose.\n\nNo fake receptionist, no pretending. Then it does the job: a real conversation, the request captured, the appointment booked to your calendar, and the follow-up handled.' + CLOSE + '\n\n#ai #smallbusiness #customerservice' },
    { id: 'gas-smell-rule', kicker: 'Your rules', emoji: '⚠️',
      head: 'Caller smells gas? It does not book a tune-up.',
      sub: 'You set the emergency rules. Yours can tell the caller to get out and call 911 or the gas company, then alert you right away.',
      caption: 'Some calls are not appointments.\n\nYou approve the emergency rules before anything goes live. A gas smell? Your rule can tell the caller to get out of the house and call 911 or the gas company, then alert you right away.\n\nIt is not an emergency service. It follows the rules you set, and it knows when a call is not a booking.' + CLOSE + '\n\n#hvac #plumbing #safety #smallbusiness' },
    { id: 'gloves-on', kicker: 'Nail salons', emoji: '💅',
      head: '“Please don’t touch that phone and then my feet.”',
      quoteBy: 'Every pedicure client, silently',
      sub: 'Gloves on, client in the chair. The AI takes the call, answers the questions you approve and books the next appointment.',
      caption: 'Every client in your chair is thinking it: please don’t pick up that phone and then go back to my feet.\n\nKeep your gloves on. HireAIVoice takes the call, answers the questions you approve, and books the next appointment to your calendar.' + CLOSE + '\n\n#nailsalon #nailtech #pedicure #salonowner' },
    { id: 'mid-foil', kicker: 'Hair salons', emoji: '💇',
      head: 'Mid-foil is not the time to pick up the phone.',
      sub: 'Your hands stay in the color. The AI answers, captures who’s calling and what they want, and books it to your calendar.',
      caption: 'You’re mid-foil. The phone rings. Your client looks at you. You look at the phone.\n\nStay in the color. HireAIVoice answers, finds out who’s calling and what they want, and books it to your calendar.' + CLOSE + '\n\n#hairsalon #colorist #stylist #salonowner' },
    { id: 'ten-forty-seven', kicker: 'Lash studios', emoji: '📱',
      head: '10:47 PM. She just saw your lash set on Instagram.',
      sub: 'She calls now, not tomorrow. The AI answers after hours, talks her through it and books the appointment.',
      chat: [['Caller', 'Hi, do you have anything for a full set next week?'], ['AI', 'I’m the studio’s AI assistant. Let’s find you a time.']],
      caption: '10:47 PM. She’s scrolling. She sees your lash set. She calls.\n\nYou’re asleep. HireAIVoice isn’t. It answers after hours, talks her through it, and books the appointment to your calendar while she still wants it.' + CLOSE + '\n\n#lashes #lashartist #beautybusiness #salonowner' },
    { id: 'try-to-break-it', kicker: 'The demo', emoji: '📞',
      head: 'Try to break it.',
      sub: 'Call the demo. Tell it what your business does. Ask about a service, a price, an appointment. Ask for a person.',
      quote: 'Show me where the calls go today.',
      caption: 'Don’t take our word for it. Try to break it.\n\nCall the HireAIVoice demo. Tell it what your business does. Ask about a service, a price, or an appointment. Ask for a person and listen to the next step.\n\nHear it before you buy it.' + CLOSE + '\n\n#ai #smallbusiness #demo' },
    { id: 'front-door', kicker: 'What comes next', emoji: '🗝️',
      head: 'The phone is the front door.',
      sub: 'Once the phone is covered, the next bottleneck is follow-up, booking, reviews, getting paid. Connor builds what comes next.',
      quote: 'I build HireAIVoice and HonorElevate to help owners handle the work around the work.',
      caption: 'HireAIVoice fixes one problem very well: the missed call. It answers, holds a real conversation, captures the job and books it.\n\nAnd it opens a door. Once the phone is covered, we work on the next bottleneck: follow-up, reviews, getting paid, keeping customers. That is the HonorElevate path.' + CLOSE + '\n\n#smallbusiness #automation #ai' },
    { id: 'keep-your-number', kicker: 'Setup', emoji: '☎️',
      head: 'Keep your number. Your team still answers first.',
      sub: 'The AI covers the after-hours and overflow calls your team can’t get to.',
      caption: 'You don’t change your number. You don’t replace your team.\n\nYour team answers first. HireAIVoice covers the after-hours and overflow calls they can’t get to, then hands them a clear next step. We check your carrier’s forwarding options before setup.' + CLOSE + '\n\n#smallbusiness #customerservice #ai' },
    { id: 'next-job', kicker: 'Missed calls', emoji: '🧰',
      head: 'That missed call might have been your next job.',
      sub: 'HireAIVoice answers it, holds a real conversation, captures the request, books it and follows up.',
      quote: 'Bring me the process that keeps breaking.',
      chat: [['Caller', 'Hey, are you taking new customers this month?'], ['AI', 'I’m an AI assistant for the team. Yes, let’s get you on the calendar.']],
      caption: 'That missed call might have been a new job. Or a repeat customer. You won’t know if nobody picks up.\n\nHireAIVoice answers it, holds a real conversation, captures the request, books it to your calendar and follows up. Starter is $397/month.' + CLOSE + '\n\n#smallbusiness #contractor #missedcalls' }
  ];


  /* ---------- palette: navy base, gold authority, orange action ----------
     Contrast (WCAG): white on navy 17.48, gold on navy 9.24, body #C5D0DE on
     navy 11.20, #DCE4EE on band 11.29, navy text on orange 5.25, orange
     button against navy 5.25. Checked in the QA run. */
  var C = {
    navy: '#0B1A2E', navy2: '#102440', band: '#132A47', white: '#FFFFFF',
    body: '#C5D0DE', soft: '#DCE4EE', label: '#B8C4D4',
    gold: '#E9B44C', orange: '#F25C05', live: '#2FBF71', phone: '#1D3557'
  };

  var portrait = null;
  var ready = new Promise(function (resolve) {
    var img = new Image();
    img.onload = function () { portrait = img; resolve(img); };
    img.onerror = function () { resolve(null); };
    img.src = PORTRAIT_SRC;
  });

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function easeOut(x) { x = clamp(x); return 1 - Math.pow(1 - x, 3); }
  function prog(t, start, dur) { return easeOut((t - start) / dur); }

  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function font(size, weight, italic) { return (italic ? 'italic ' : '') + (weight || 800) + ' ' + Math.round(size) + 'px ' + SANS; }
  function spacing(ctx, px) { if (ctx.letterSpacing !== undefined) ctx.letterSpacing = px + 'px'; }

  function wrap(ctx, text, maxW) {
    var words = text.split(/\s+/), lines = [], cur = '';
    for (var i = 0; i < words.length; i++) {
      var test = cur ? cur + ' ' + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = words[i]; }
      else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
  }
  function fit(ctx, text, maxW, maxH, maxSize, minSize, weight, lh, italic) {
    for (var s = maxSize; s >= minSize; s -= 2) {
      ctx.font = font(s, weight, italic);
      var lines = wrap(ctx, text, maxW), widest = 0;
      lines.forEach(function (l) { widest = Math.max(widest, ctx.measureText(l).width); });
      if (lines.length * s * lh <= maxH && widest <= maxW) return { size: s, lines: lines, lh: lh, weight: weight, italic: italic, h: lines.length * s * lh };
    }
    ctx.font = font(minSize, weight, italic);
    var l2 = wrap(ctx, text, maxW);
    return { size: minSize, lines: l2, lh: lh, weight: weight, italic: italic, h: l2.length * minSize * lh };
  }
  // credibility items stay whole; lines break between items only
  function credLines(ctx, size, maxW) {
    ctx.font = font(size, 650);
    var lines = [], cur = '';
    CRED.forEach(function (item) {
      var test = cur ? cur + '  ·  ' + item : item;
      if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = item; } else cur = test;
    });
    if (cur) lines.push(cur);
    return lines;
  }

  /* ---------- layout ---------- */
  function textBlock(ctx, tile, x, top, bottom, w, hd, sb) {
    var room = bottom - top - (tile.quoteBy ? hd.quoteGap : 0) - hd.gap;
    var head = fit(ctx, tile.head, w, room * 0.62, hd.max, hd.min, 800, 1.08);
    var sub = fit(ctx, tile.sub, w, room - head.h, sb.max, sb.min, 500, 1.38);
    var total = head.h + hd.gap + (tile.quoteBy ? hd.quoteGap : 0) + sub.h;
    var y = top + Math.max(0, Math.round((bottom - top - total) / 2));
    head.x = x; head.y = y; y += head.h + hd.gap * 0.6;
    var quote = null;
    if (tile.quoteBy) { quote = { x: x, y: y + hd.quoteGap * 0.55, size: Math.round(sb.max * 0.8) }; y += hd.quoteGap; }
    sub.x = x; sub.y = y + hd.gap * 0.4;
    return { head: head, sub: sub, quote: quote };
  }

  function layout(ctx, tile, fmt) {
    var W = fmt.w, H = fmt.h, L = { W: W, H: H }, tb;
    if (fmt === FORMATS.story) {
      var pad = 80, tw = W - pad * 2;
      L.pad = pad; L.brand = { x: pad, y: 124, size: 50 };
      L.cred = { y: 1468, h: 132, size: 30, w: tw };
      L.ask = { x: W / 2, y: 1672, size: 40, align: 'center' };
      L.cta = { x: pad, y: 1700, w: tw, h: 116, size: 46 };
      L.url = { x: W / 2, y: 1874, size: 38, align: 'center' };
      if (tile.quote) {
        L.expert = true;
        L.portrait = { cx: W / 2, cy: 455, d: 330 };
        L.built = { x: W / 2, y: 700, size: 46, align: 'center' };
        L.quote = fit(ctx, '“' + tile.quote + '”', 860, 160, 44, 30, 600, 1.3, true);
        L.quote.x = W / 2; L.quote.y = 738; L.quote.align = 'center';
        var qEnd = L.quote.y + L.quote.h;
        L.kicker = { x: pad, y: qEnd + 76, size: 32 };
        tb = textBlock(ctx, tile, pad, qEnd + 100, L.cred.y - 36, tw, { max: 90, min: 54, gap: 26, quoteGap: 56 }, { max: 40, min: 28 });
      } else {
        L.portrait = { cx: W - pad - 80, cy: 138, d: 160 };
        L.built = { x: W - pad, y: 262, size: 26, align: 'right' };
        L.phone = { cx: W / 2, cy: 520, size: 220 };
        L.kicker = { x: pad, y: 836, size: 34 };
        tb = textBlock(ctx, tile, pad, 862, L.cred.y - 36, tw, { max: 98, min: 56, gap: 28, quoteGap: 60 }, { max: 42, min: 30 });
      }
    } else if (fmt === FORMATS.square) {
      var p = 72, w2 = W - p * 2;
      L.pad = p; L.brand = { x: p, y: 100, size: 44 };
      L.portrait = { cx: W - p - 78, cy: 142, d: 156 };
      L.built = { x: W - p, y: 262, size: 22, align: 'right' };
      L.kicker = { x: p, y: 306, size: 26 };
      L.cred = { y: 744, h: 96, size: 24, w: w2 };
      L.ask = { x: p, y: 902, size: 30, align: 'left' };
      L.cta = { x: p, y: 926, w: 620, h: 94, size: 34 };
      L.url = { x: W - p, y: 986, size: 32, align: 'right' };
      tb = textBlock(ctx, tile, p, 326, 724, w2, { max: 82, min: 46, gap: 22, quoteGap: 44 }, { max: 34, min: 24 });
    } else {
      var q = 56, w3 = 700;
      L.pad = q; L.brand = { x: q, y: 70, size: 32 };
      L.portrait = { cx: 1012, cy: 214, d: 210 };
      L.built = { x: 1012, y: 372, size: 23, align: 'center' };
      L.kicker = { x: q, y: 134, size: 20 };
      L.ask = { x: q, y: 486, size: 25, align: 'left' };
      L.cta = { x: q, y: 504, w: 540, h: 74, size: 29 };
      L.url = { x: 1012, y: 552, size: 27, align: 'center' };
      tb = textBlock(ctx, tile, q, 152, 446, w3, { max: 58, min: 36, gap: 14, quoteGap: 32 }, { max: 25, min: 19 });
    }
    L.head = tb.head; L.sub = tb.sub; L.quoteBy = tb.quote;
    return L;
  }

  /* ---------- drawing ---------- */
  function drawBg(ctx, L, fmtKey) {
    var W = L.W, H = L.H;
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, C.navy2); g.addColorStop(1, C.navy);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // warm glow behind the portrait
    var P = L.portrait, rg = ctx.createRadialGradient(P.cx, P.cy, P.d * 0.2, P.cx, P.cy, P.d * 1.6);
    rg.addColorStop(0, 'rgba(233,180,76,0.22)'); rg.addColorStop(1, 'rgba(233,180,76,0)');
    ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = C.gold; ctx.fillRect(0, 0, W, fmtKey === 'link' ? 8 : 12);
  }

  function drawBrand(ctx, B, a) {
    ctx.globalAlpha = a; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = C.white; ctx.font = font(B.size, 800);
    ctx.fillText('HireAIVoice', B.x, B.y);
    var w = ctx.measureText('HireAIVoice').width;
    ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(B.x + w + B.size * 0.28, B.y - B.size * 0.12, B.size * 0.12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.label; ctx.font = font(B.size * 0.3, 650); spacing(ctx, Math.round(B.size * 0.04));
    ctx.fillText('BY HONORELEVATE', B.x, B.y + B.size * 0.56); spacing(ctx, 0);
    ctx.globalAlpha = 1;
  }

  // Connor's real photo, unaltered, cropped to a circle with a gold ring.
  // A small phone badge on the ring rings, then flips to "AI" when answered.
  function drawPortrait(ctx, L, tile, t, withBadge) {
    var P = L.portrait, r = P.d / 2, a = prog(t, 0.1, 0.6), sc = 0.92 + 0.08 * a;
    ctx.save(); ctx.globalAlpha = a;
    ctx.translate(P.cx, P.cy); ctx.scale(sc, sc);
    ctx.fillStyle = C.band; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();
    if (portrait) {
      ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.clip();
      ctx.drawImage(portrait, -r, -r, P.d, P.d); ctx.restore();
    }
    ctx.strokeStyle = C.gold; ctx.lineWidth = Math.max(4, P.d * 0.035);
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
    ctx.globalAlpha = a * 0.45; ctx.lineWidth = Math.max(1.5, P.d * 0.008);
    ctx.beginPath(); ctx.arc(0, 0, r + P.d * 0.055, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();

    if (withBadge) {
      var answered = t >= ANSWER_AT, br = Math.max(24, P.d * 0.17);
      var bx = P.cx + r * 0.72, by = P.cy + r * 0.72;
      ctx.save(); ctx.globalAlpha = a;
      if (!answered) {
        for (var k = 0; k < 2; k++) {
          var ph = ((t + k * 0.6) % 1.2) / 1.2;
          ctx.strokeStyle = C.gold; ctx.globalAlpha = a * (1 - ph) * 0.8; ctx.lineWidth = Math.max(2, br * 0.12);
          ctx.beginPath(); ctx.arc(bx, by, br * (1 + ph * 0.9), 0, Math.PI * 2); ctx.stroke();
        }
        ctx.globalAlpha = a;
      }
      ctx.translate(bx, by);
      if (!answered && (t % 0.8) < 0.5) ctx.rotate(Math.sin(t * 60) * 0.12);
      ctx.fillStyle = answered ? C.live : C.white;
      ctx.strokeStyle = C.navy; ctx.lineWidth = Math.max(3, br * 0.14);
      ctx.beginPath(); ctx.arc(0, 0, br, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      if (answered) { ctx.fillStyle = C.navy; ctx.font = font(br * 0.85, 800); ctx.fillText('AI', 0, br * 0.05); }
      else { ctx.font = br * 1.0 + 'px ' + EMOJI; ctx.fillText('📞', 0, br * 0.06); }
      ctx.restore();
    }

    var B = L.built, bp = prog(t, 0.35, 0.5);
    ctx.globalAlpha = bp; ctx.fillStyle = C.white; ctx.font = font(B.size, 750);
    ctx.textAlign = B.align; ctx.textBaseline = 'alphabetic';
    ctx.fillText(BUILT, B.x, B.y);
    ctx.globalAlpha = 1;
  }

  // Story layout only: the big handset that rings, then the AI picks up.
  function drawPhone(ctx, P, tile, t) {
    var s = P.size, cx = P.cx, cy = P.cy, answered = t >= ANSWER_AT, pa = prog(t, 0, 0.5);
    ctx.save(); ctx.globalAlpha = pa;
    ctx.fillStyle = C.band; ctx.beginPath(); ctx.arc(cx, cy, s * 0.95, 0, Math.PI * 2); ctx.fill();
    if (!answered) {
      for (var k = 0; k < 3; k++) {
        var ph = ((t + k * 0.4) % 1.2) / 1.2;
        ctx.strokeStyle = C.gold; ctx.globalAlpha = pa * (1 - ph) * 0.75; ctx.lineWidth = s * 0.03;
        ctx.beginPath(); ctx.arc(cx, cy, s * (0.6 + ph * 0.55), 0, Math.PI * 2); ctx.stroke();
      }
    } else {
      var ap = prog(t, ANSWER_AT, 0.6);
      ctx.strokeStyle = C.live; ctx.globalAlpha = pa * (1 - ap) * 0.8; ctx.lineWidth = s * 0.035;
      ctx.beginPath(); ctx.arc(cx, cy, s * (0.6 + ap * 0.6), 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = C.gold; ctx.globalAlpha = pa * 0.9; ctx.lineWidth = s * 0.018;
      ctx.beginPath(); ctx.arc(cx, cy, s * 0.82, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.globalAlpha = pa;
    ctx.translate(cx, cy);
    if (!answered && (t % 0.8) < 0.5) ctx.rotate(Math.sin(t * 60) * 0.07);
    var bw = s * 0.62, bh = s * 1.1;
    ctx.fillStyle = '#050D18'; rr(ctx, -bw / 2, -bh / 2, bw, bh, s * 0.1); ctx.fill();
    ctx.strokeStyle = 'rgba(233,180,76,0.6)'; ctx.lineWidth = s * 0.012; ctx.stroke();
    ctx.fillStyle = answered ? C.live : '#F4F6FA';
    rr(ctx, -bw / 2 + s * 0.04, -bh / 2 + s * 0.1, bw - s * 0.08, bh - s * 0.2, s * 0.05); ctx.fill();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (answered) {
      ctx.fillStyle = C.navy; ctx.font = font(s * 0.26, 800); ctx.fillText('AI', 0, -s * 0.12);
      ctx.font = font(s * 0.075, 750); ctx.fillText('ON THE CALL', 0, s * 0.06);
      for (var i = 0; i < 5; i++) {
        var hh = s * (0.04 + 0.06 * Math.abs(Math.sin(t * 7 + i * 1.3)));
        ctx.fillRect(-s * 0.15 + i * s * 0.07 - s * 0.018, s * 0.2 - hh / 2, s * 0.036, hh);
      }
    } else {
      ctx.fillStyle = C.navy; ctx.font = font(s * 0.085, 750); ctx.fillText('INCOMING', 0, -s * 0.2);
      ctx.fillStyle = '#8A5A00'; ctx.font = font(s * 0.075, 700); ctx.fillText('ringing…', 0, -s * 0.08);
      ctx.font = s * 0.22 + 'px ' + EMOJI; ctx.fillText(tile.emoji, 0, s * 0.16);
    }
    ctx.restore();

    var pillY = cy + s * 0.99, label = answered ? 'ANSWERED BY AI' : 'MISSED CALL?';
    ctx.save(); ctx.globalAlpha = pa;
    ctx.font = font(s * 0.1, 800);
    var pw = ctx.measureText(label).width + s * 0.18, ph2 = s * 0.19;
    ctx.fillStyle = answered ? C.live : C.navy; ctx.strokeStyle = answered ? C.live : C.gold; ctx.lineWidth = s * 0.012;
    rr(ctx, cx - pw / 2, pillY - ph2 / 2, pw, ph2, ph2 / 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = answered ? C.navy : C.gold; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(label, cx, pillY + s * 0.005);
    ctx.restore();
  }

  function drawLines(ctx, blk, color, t, start, step) {
    ctx.fillStyle = color; ctx.font = font(blk.size, blk.weight, blk.italic);
    ctx.textAlign = blk.align || 'left'; ctx.textBaseline = 'alphabetic';
    blk.lines.forEach(function (line, i) {
      var p = prog(t, start + i * step, 0.5);
      ctx.globalAlpha = p;
      ctx.fillText(line, blk.x, blk.y + blk.size * 0.88 + i * blk.size * blk.lh + (1 - p) * blk.size * 0.5);
    });
    ctx.globalAlpha = 1;
  }

  function drawCred(ctx, L, t, start) {
    var c = L.cred, p = prog(t, start, 0.5);
    ctx.save(); ctx.globalAlpha = p;
    ctx.fillStyle = C.band; ctx.fillRect(0, c.y, L.W, c.h);
    ctx.fillStyle = C.gold; ctx.fillRect(0, c.y, L.W, 3);
    var lines = credLines(ctx, c.size, c.w), lh = c.size * 1.4;
    var y0 = c.y + c.h / 2 - (lines.length * lh) / 2 + c.size * 0.95;
    ctx.fillStyle = C.soft; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.font = font(c.size, 650);
    lines.forEach(function (l, i) { ctx.fillText(l, L.W / 2, y0 + i * lh); });
    ctx.restore();
  }

  function drawAsk(ctx, L, t, start) {
    var A = L.ask, ap = prog(t, start, 0.45);
    ctx.globalAlpha = ap; ctx.fillStyle = C.white; ctx.font = font(A.size, 800);
    ctx.textAlign = A.align; ctx.textBaseline = 'alphabetic';
    ctx.fillText(ASK, A.x, A.y - 14 * (L.W / 1080) + (1 - ap) * 10);
    ctx.globalAlpha = 1;

    var c = L.cta, p = prog(t, start + 0.3, 0.5);
    ctx.save(); ctx.globalAlpha = p;
    var grow = 0.94 + 0.06 * p;
    ctx.translate(c.x + c.w / 2, c.y + c.h / 2); ctx.scale(grow, grow); ctx.translate(-(c.x + c.w / 2), -(c.y + c.h / 2));
    ctx.fillStyle = C.orange; rr(ctx, c.x, c.y, c.w, c.h, 12); ctx.fill();
    var fs = c.size; ctx.font = font(fs, 800);
    while (ctx.measureText('📞 ' + CTA).width > c.w - 40 && fs > 16) { fs -= 1; ctx.font = font(fs, 800); }
    var iconW = fs * 1.3, tw = ctx.measureText(CTA).width, x0 = c.x + c.w / 2 - (tw + iconW) / 2;
    ctx.fillStyle = C.navy; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    ctx.font = fs * 0.9 + 'px ' + EMOJI; ctx.fillText('📞', x0, c.y + c.h / 2 + fs * 0.04);
    ctx.font = font(fs, 800); ctx.fillText(CTA, x0 + iconW, c.y + c.h / 2 + fs * 0.04);
    ctx.restore();

    var u = L.url, up = prog(t, start + 0.6, 0.5);
    ctx.globalAlpha = up; ctx.fillStyle = C.gold; ctx.font = font(u.size, 800);
    ctx.textAlign = u.align; ctx.textBaseline = 'alphabetic';
    ctx.fillText(URL_SHOW, u.x, u.y);
    ctx.globalAlpha = 1;
  }

  // t is seconds into the clip; t >= SECONDS is the settled still used for PNG.
  function draw(ctx, tile, fmtKey, t, L) {
    var fmt = FORMATS[fmtKey];
    L = L || layout(ctx, tile, fmt);
    ctx.save();
    drawBg(ctx, L, fmtKey);
    drawBrand(ctx, L.brand, prog(t, 0, 0.5));
    if (L.phone) drawPhone(ctx, L.phone, tile, t);
    drawPortrait(ctx, L, tile, t, !L.phone);

    var hs = 0.55;
    if (L.quote) { drawLines(ctx, L.quote, C.gold, t, 0.5, 0.22); hs = 0.6 + L.quote.lines.length * 0.22; }

    var kp = prog(t, hs - 0.25, 0.4);
    ctx.globalAlpha = kp; ctx.fillStyle = C.gold; ctx.font = font(L.kicker.size, 800);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; spacing(ctx, Math.round(L.kicker.size * 0.12));
    ctx.fillText(tile.kicker.toUpperCase(), L.kicker.x, L.kicker.y); spacing(ctx, 0);
    ctx.globalAlpha = 1;

    drawLines(ctx, L.head, C.white, t, hs, 0.26);
    var afterHead = hs + L.head.lines.length * 0.26;
    if (L.quoteBy) {
      var qp = prog(t, afterHead, 0.4);
      ctx.globalAlpha = qp; ctx.fillStyle = C.gold; ctx.font = font(L.quoteBy.size, 600, true); ctx.textAlign = 'left';
      ctx.fillText(tile.quoteBy, L.quoteBy.x, L.quoteBy.y);
      ctx.globalAlpha = 1;
    }
    var subStart = Math.max(afterHead + 0.1, ANSWER_AT);
    drawLines(ctx, L.sub, C.body, t, subStart, 0.12);
    if (L.cred) drawCred(ctx, L, t, 3.2);
    drawAsk(ctx, L, t, fmtKey === 'link' ? 3.4 : 3.7);
    ctx.restore();
    return L;
  }

  window.HAVTiles = { TILES: TILES, FORMATS: FORMATS, SECONDS: SECONDS, FPS: FPS, draw: draw, layout: layout, ready: ready, PALETTE: C };
})();
