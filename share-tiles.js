/* HireAIVoice Share Studio tiles.
   Every tile is drawn straight onto a canvas as a pure function of time, so the
   PNG, the on-page preview and every MP4 frame come from the same code path.
   Claims stay inside what hireaivoice.com already says. No stats, no results. */
(function () {
  'use strict';

  var DEMO = '(661) 219-7299';
  var URL_SHOW = 'hireaivoice.com';
  var URL_FULL = 'https://hireaivoice.com';
  var CTA = 'Call the demo: ' + DEMO;

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

  var CLOSE = '\n\n' + CTA + '\n' + URL_FULL;

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
    { id: 'last-voicemail', kicker: 'Quick question', emoji: '📵',
      head: 'When’s the last time you left a voicemail?',
      sub: 'Your customers are the same. So the AI picks up, talks it through and captures the request while it’s hot.',
      caption: 'Think about the last time you left a voicemail for a business.\n\nYeah. Your customers are the same way.\n\nHireAIVoice picks up the after-hours and overflow calls your team misses, talks it through like a person would, and captures the request while the customer still wants it.' + CLOSE + '\n\n#smallbusiness #voicemail #missedcalls' },
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
      caption: 'Don’t take our word for it. Try to break it.\n\nCall the HireAIVoice demo. Tell it what your business does. Ask about a service, a price, or an appointment. Ask for a person and listen to the next step.\n\nHear it before you buy it.' + CLOSE + '\n\n#ai #smallbusiness #demo' },
    { id: 'front-door', kicker: 'What comes next', emoji: '🗝️',
      head: 'The phone is the front door.',
      sub: 'Once the phone is covered, we fix the next bottleneck: follow-up, reviews, getting paid.',
      caption: 'HireAIVoice fixes one problem very well: the missed call. It answers, holds a real conversation, captures the job and books it.\n\nAnd it opens a door. Once the phone is covered, we work on the next bottleneck: follow-up, reviews, getting paid, keeping customers. That is the HonorElevate path.' + CLOSE + '\n\n#smallbusiness #automation #ai' },
    { id: 'keep-your-number', kicker: 'Setup', emoji: '☎️',
      head: 'Keep your number. Your team still answers first.',
      sub: 'The AI covers the after-hours and overflow calls your team can’t get to.',
      caption: 'You don’t change your number. You don’t replace your team.\n\nYour team answers first. HireAIVoice covers the after-hours and overflow calls they can’t get to, then hands them a clear next step. We check your carrier’s forwarding options before setup.' + CLOSE + '\n\n#smallbusiness #customerservice #ai' },
    { id: 'next-job', kicker: 'Missed calls', emoji: '🧰',
      head: 'That missed call might have been your next job.',
      sub: 'HireAIVoice answers it, holds a real conversation, captures the request, books it and follows up.',
      chat: [['Caller', 'Hey, are you taking new customers this month?'], ['AI', 'I’m an AI assistant for the team. Yes, let’s get you on the calendar.']],
      caption: 'That missed call might have been a new job. Or a repeat customer. You won’t know if nobody picks up.\n\nHireAIVoice answers it, holds a real conversation, captures the request, books it to your calendar and follows up. Starter is $397/month.' + CLOSE + '\n\n#smallbusiness #contractor #missedcalls' }
  ];

  /* ---------- easing and helpers ---------- */
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

  function font(size, weight) { return (weight || 800) + ' ' + Math.round(size) + 'px ' + SANS; }

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

  // Largest size between max and min whose wrapped block fits maxW x maxH.
  function fit(ctx, text, maxW, maxH, maxSize, minSize, weight, lh) {
    for (var s = maxSize; s >= minSize; s -= 2) {
      ctx.font = font(s, weight);
      var lines = wrap(ctx, text, maxW);
      var widest = 0;
      lines.forEach(function (l) { widest = Math.max(widest, ctx.measureText(l).width); });
      if (lines.length * s * lh <= maxH && widest <= maxW) return { size: s, lines: lines, lh: lh, weight: weight, h: lines.length * s * lh };
    }
    ctx.font = font(minSize, weight);
    var l2 = wrap(ctx, text, maxW);
    return { size: minSize, lines: l2, lh: lh, weight: weight, h: l2.length * minSize * lh };
  }

  /* ---------- layout (computed once per tile and format) ---------- */
  function layout(ctx, tile, fmt) {
    var W = fmt.w, H = fmt.h, L = { W: W, H: H };
    if (fmt === FORMATS.story) {
      var pad = 90, tw = W - pad * 2;
      L.pad = pad; L.brand = { x: pad, y: 120, size: 50 };
      L.phone = { cx: W / 2, cy: 440, size: 250 };
      L.cta = { x: pad, y: 1640, w: tw, h: 124, size: 46 };
      L.url = { x: W / 2, y: 1836, size: 40, align: 'center' };
      var top = 790, bottom = L.cta.y - 60;
      var plan = function (withChat) {
        var chatH = 0, ch = null;
        if (withChat) { ch = chatLayout(ctx, tile.chat, pad, 0, tw, 30); chatH = ch.bottom + 40; }
        var quoteH = tile.quoteBy ? 64 : 0;
        var room = bottom - top - 54 - quoteH - chatH - 34;
        var head = fit(ctx, tile.head, tw, room * 0.62, 100, 58, 800, 1.1);
        var sub = fit(ctx, tile.sub, tw, room - head.h, 42, 30, 500, 1.35);
        var total = 54 + head.h + 28 + quoteH + sub.h + chatH;
        return { ch: ch, head: head, sub: sub, quoteH: quoteH, total: total, ok: total <= bottom - top };
      };
      var pl = tile.chat ? plan(true) : null;
      if (!pl || !pl.ok || pl.head.size < 72) pl = plan(false);
      // center the text block between the phone and the call to action
      var y0 = top + Math.max(0, Math.round((bottom - top - pl.total) / 2));
      L.kicker = { x: pad, y: y0 + 30, size: 34 };
      L.head = pl.head; L.head.x = pad; L.head.y = y0 + 54;
      var y = L.head.y + L.head.h + 28;
      if (pl.quoteH) { L.quote = { x: pad, y: y + 30, size: 32 }; y += pl.quoteH; }
      L.sub = pl.sub; L.sub.x = pad; L.sub.y = y;
      y = L.sub.y + L.sub.h + 34;
      if (pl.ch) L.chat = chatLayout(ctx, tile.chat, pad, y, tw, 30);
    } else if (fmt === FORMATS.square) {
      var p = 72, w2 = W - p * 2;
      L.pad = p; L.brand = { x: p, y: 104, size: 44 };
      L.phone = { cx: W - p - 120, cy: 190, size: 150 };
      L.kicker = { x: p, y: 330, size: 28 };
      L.head = fit(ctx, tile.head, w2, 330, 84, 50, 800, 1.1); L.head.x = p; L.head.y = 372;
      var ys = L.head.y + L.head.h + 20;
      if (tile.quoteBy) { L.quote = { x: p, y: ys + 24, size: 28 }; ys += 52; }
      L.sub = fit(ctx, tile.sub, w2, 900 - ys - 40, 36, 26, 500, 1.35); L.sub.x = p; L.sub.y = ys + 6;
      L.cta = { x: p, y: 912, w: 640, h: 100, size: 36 };
      L.url = { x: W - p, y: 976, size: 34, align: 'right' };
    } else {
      var q = 60, w3 = 690;
      L.pad = q; L.brand = { x: q, y: 78, size: 34 };
      L.phone = { cx: 1000, cy: 260, size: 150 };
      L.kicker = { x: q, y: 150, size: 22 };
      L.head = fit(ctx, tile.head, w3, 190, 62, 38, 800, 1.1); L.head.x = q; L.head.y = 178;
      var yl = L.head.y + L.head.h + 14;
      if (tile.quoteBy) { L.quote = { x: q, y: yl + 18, size: 22 }; yl += 36; }
      L.sub = fit(ctx, tile.sub, w3, 486 - yl, 27, 21, 500, 1.35); L.sub.x = q; L.sub.y = yl + 4;
      L.cta = { x: q, y: 510, w: 560, h: 76, size: 30 };
      L.url = { x: 1000, y: 558, size: 28, align: 'center' };
    }
    return L;
  }

  function chatLayout(ctx, chat, x, y, w, size) {
    var out = { items: [], size: size }, cy = y;
    chat.forEach(function (m) {
      var isAI = m[0] === 'AI';
      ctx.font = font(size, 500);
      var maxW = w * 0.78 - 56;
      var lines = wrap(ctx, m[1], maxW);
      var widest = 0;
      lines.forEach(function (l) { widest = Math.max(widest, ctx.measureText(l).width); });
      var bw = Math.max(widest, ctx.measureText(isAI ? 'AI assistant' : 'Caller').width) + 56;
      var bh = 28 + 30 + lines.length * size * 1.3 + 22;
      out.items.push({ ai: isAI, who: isAI ? 'AI assistant' : 'Caller', lines: lines, x: isAI ? x + w - bw : x, y: cy, w: bw, h: bh });
      cy += bh + 18;
    });
    out.labelY = cy + 22;
    out.bottom = cy + 30;
    return out;
  }

  /* ---------- drawing ---------- */
  function drawBrand(ctx, B, a) {
    ctx.globalAlpha = a;
    ctx.fillStyle = C.ink; ctx.font = font(B.size, 800); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillText('HireAIVoice', B.x, B.y);
    var w = ctx.measureText('HireAIVoice').width;
    ctx.fillStyle = C.green; ctx.beginPath(); ctx.arc(B.x + w + B.size * 0.28, B.y - B.size * 0.12, B.size * 0.12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.muted; ctx.font = font(B.size * 0.3, 600);
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = Math.round(B.size * 0.03) + 'px';
    ctx.fillText('BY HONORELEVATE', B.x, B.y + B.size * 0.55);
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '0px';
    ctx.globalAlpha = 1;
  }

  // Hand-built handset with a ringing pulse, then the AI picks up.
  function drawPhone(ctx, P, tile, t) {
    var s = P.size, cx = P.cx, cy = P.cy;
    var answered = t >= ANSWER_AT;
    var pa = prog(t, 0, 0.5);
    ctx.save();
    ctx.globalAlpha = pa;

    // halo
    ctx.fillStyle = answered ? C.greenTint : '#efe8d6';
    ctx.beginPath(); ctx.arc(cx, cy, s * 0.95, 0, Math.PI * 2); ctx.fill();

    // ringing pulse rings
    if (!answered) {
      for (var k = 0; k < 3; k++) {
        var ph = ((t + k * 0.4) % 1.2) / 1.2;
        ctx.strokeStyle = C.amber; ctx.globalAlpha = pa * (1 - ph) * 0.7; ctx.lineWidth = s * 0.03;
        ctx.beginPath(); ctx.arc(cx, cy, s * (0.6 + ph * 0.55), 0, Math.PI * 2); ctx.stroke();
      }
    } else {
      var ap = prog(t, ANSWER_AT, 0.6);
      ctx.strokeStyle = C.green; ctx.globalAlpha = pa * (1 - ap) * 0.8; ctx.lineWidth = s * 0.035;
      ctx.beginPath(); ctx.arc(cx, cy, s * (0.6 + ap * 0.6), 0, Math.PI * 2); ctx.stroke();
      ctx.globalAlpha = pa * 0.9; ctx.lineWidth = s * 0.02;
      ctx.beginPath(); ctx.arc(cx, cy, s * 0.82, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.globalAlpha = pa;

    // handset body, buzzing while it rings
    ctx.translate(cx, cy);
    if (!answered) {
      var burst = (t % 0.8) < 0.5 ? 1 : 0;
      ctx.rotate(burst * Math.sin(t * 60) * 0.07);
    }
    var bw = s * 0.62, bh = s * 1.1;
    ctx.fillStyle = C.ink; rr(ctx, -bw / 2, -bh / 2, bw, bh, s * 0.1); ctx.fill();
    ctx.fillStyle = answered ? C.green : '#fbfaf5';
    rr(ctx, -bw / 2 + s * 0.04, -bh / 2 + s * 0.1, bw - s * 0.08, bh - s * 0.2, s * 0.05); ctx.fill();
    ctx.fillStyle = '#38524a'; rr(ctx, -s * 0.08, -bh / 2 + s * 0.04, s * 0.16, s * 0.03, s * 0.015); ctx.fill();

    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (answered) {
      ctx.fillStyle = C.white; ctx.font = font(s * 0.26, 800); ctx.fillText('AI', 0, -s * 0.12);
      ctx.font = font(s * 0.075, 700); ctx.fillText('ON THE CALL', 0, s * 0.06);
      // talking bars
      for (var i = 0; i < 5; i++) {
        var hh = s * (0.04 + 0.06 * Math.abs(Math.sin(t * 7 + i * 1.3)));
        ctx.fillRect(-s * 0.15 + i * s * 0.07 - s * 0.018, s * 0.2 - hh / 2, s * 0.036, hh);
      }
    } else {
      ctx.fillStyle = C.ink; ctx.font = font(s * 0.085, 700); ctx.fillText('INCOMING', 0, -s * 0.2);
      ctx.fillStyle = C.amber; ctx.font = font(s * 0.075, 700); ctx.fillText('ringing…', 0, -s * 0.08);
      ctx.font = s * 0.22 + 'px ' + EMOJI; ctx.fillText(tile.emoji, 0, s * 0.16);
    }
    ctx.restore();

    // vertical badge (emoji coin) bottom-right of the handset once answered
    if (answered) {
      var bp = prog(t, ANSWER_AT + 0.1, 0.4);
      ctx.save(); ctx.globalAlpha = bp;
      var bx = cx + s * 0.42, by = cy + s * 0.42, br = s * 0.2 * (0.6 + 0.4 * bp);
      ctx.fillStyle = C.white; ctx.strokeStyle = C.line; ctx.lineWidth = s * 0.012;
      ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = br * 1.1 + 'px ' + EMOJI; ctx.fillText(tile.emoji, bx, by + br * 0.05);
      ctx.restore();
    }

    // status pill under the phone
    var pillY = cy + s * 0.95 + s * 0.04;
    var label = answered ? 'ANSWERED BY AI' : 'MISSED CALL?';
    ctx.save();
    ctx.globalAlpha = pa;
    ctx.font = font(s * 0.1, 800);
    var pw = ctx.measureText(label).width + s * 0.16, ph2 = s * 0.18;
    ctx.fillStyle = answered ? C.green : C.white;
    ctx.strokeStyle = answered ? C.green : C.amber; ctx.lineWidth = s * 0.012;
    rr(ctx, cx - pw / 2, pillY - ph2 / 2, pw, ph2, ph2 / 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = answered ? C.white : C.amber; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(label, cx, pillY + s * 0.005);
    ctx.restore();
  }

  function drawLines(ctx, blk, color, t, start, step) {
    ctx.fillStyle = color; ctx.font = font(blk.size, blk.weight); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    blk.lines.forEach(function (line, i) {
      var p = prog(t, start + i * step, 0.5);
      ctx.globalAlpha = p;
      ctx.fillText(line, blk.x, blk.y + blk.size * 0.88 + i * blk.size * blk.lh + (1 - p) * blk.size * 0.5);
    });
    ctx.globalAlpha = 1;
  }

  function drawChat(ctx, ch, t, start) {
    ch.items.forEach(function (m, i) {
      var p = prog(t, start + i * 0.7, 0.45);
      if (p <= 0) return;
      ctx.save(); ctx.globalAlpha = p;
      ctx.translate(0, (1 - p) * 20);
      ctx.fillStyle = m.ai ? C.greenSoft : C.white;
      ctx.strokeStyle = m.ai ? C.green : C.line; ctx.lineWidth = 2;
      rr(ctx, m.x, m.y, m.w, m.h, 22); ctx.fill(); ctx.stroke();
      ctx.fillStyle = m.ai ? C.green : C.muted; ctx.font = font(ch.size * 0.72, 800); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      ctx.fillText(m.who.toUpperCase(), m.x + 28, m.y + 28 + ch.size * 0.6);
      ctx.fillStyle = C.ink; ctx.font = font(ch.size, 500);
      m.lines.forEach(function (l, j) { ctx.fillText(l, m.x + 28, m.y + 28 + 30 + ch.size * 0.95 + j * ch.size * 1.3); });
      ctx.restore();
    });
    var lp = prog(t, start + ch.items.length * 0.7, 0.4);
    ctx.globalAlpha = lp; ctx.fillStyle = C.muted; ctx.font = font(22, 600); ctx.textAlign = 'left';
    ctx.fillText('Illustrative call. Not a customer result.', 90, ch.labelY);
    ctx.globalAlpha = 1;
  }

  function drawCta(ctx, L, t, start) {
    var p = prog(t, start, 0.5), c = L.cta;
    ctx.save(); ctx.globalAlpha = p;
    var grow = 0.94 + 0.06 * p;
    ctx.translate(c.x + c.w / 2, c.y + c.h / 2); ctx.scale(grow, grow); ctx.translate(-(c.x + c.w / 2), -(c.y + c.h / 2));
    ctx.fillStyle = C.green; rr(ctx, c.x, c.y, c.w, c.h, 12); ctx.fill();
    ctx.fillStyle = C.white; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    var fs = c.size; ctx.font = font(fs, 800);
    while (ctx.measureText('📞 ' + CTA).width > c.w - 40 && fs > 18) { fs -= 1; ctx.font = font(fs, 800); }
    var label = CTA, iconW = fs * 1.3;
    var tw = ctx.measureText(label).width;
    var x0 = c.x + c.w / 2 - (tw + iconW) / 2;
    ctx.font = fs * 0.9 + 'px ' + EMOJI; ctx.textAlign = 'left'; ctx.fillText('📞', x0, c.y + c.h / 2 + fs * 0.04);
    ctx.font = font(fs, 800); ctx.fillText(label, x0 + iconW, c.y + c.h / 2 + fs * 0.04);
    ctx.restore();

    var up = prog(t, start + 0.3, 0.5), u = L.url;
    ctx.globalAlpha = up; ctx.fillStyle = C.ink; ctx.font = font(u.size, 800); ctx.textAlign = u.align; ctx.textBaseline = 'alphabetic';
    ctx.fillText(URL_SHOW, u.x, u.y);
    ctx.globalAlpha = 1;
  }

  // t is seconds into the clip; t >= SECONDS is the settled still used for PNG.
  function draw(ctx, tile, fmtKey, t, L) {
    var fmt = FORMATS[fmtKey];
    L = L || layout(ctx, tile, fmt);
    var W = fmt.w, H = fmt.h;
    ctx.save();
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    // quiet structure: green top rule and a white text panel edge
    ctx.fillStyle = C.green; ctx.fillRect(0, 0, W, fmtKey === 'link' ? 10 : 14);
    ctx.fillStyle = C.line; ctx.fillRect(0, H - 4, W, 4);

    drawBrand(ctx, L.brand, prog(t, 0, 0.5));
    drawPhone(ctx, L.phone, tile, t);

    var kp = prog(t, 0.3, 0.4);
    ctx.globalAlpha = kp; ctx.fillStyle = C.green; ctx.font = font(L.kicker.size, 800); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = Math.round(L.kicker.size * 0.12) + 'px';
    ctx.fillText(tile.kicker.toUpperCase(), L.kicker.x, L.kicker.y);
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '0px';
    ctx.globalAlpha = 1;

    drawLines(ctx, L.head, C.ink, t, 0.55, 0.28);
    var afterHead = 0.55 + L.head.lines.length * 0.28;
    if (L.quote) {
      var qp = prog(t, afterHead, 0.4);
      ctx.globalAlpha = qp; ctx.fillStyle = C.muted; ctx.font = 'italic ' + font(L.quote.size, 600); ctx.textAlign = 'left';
      ctx.fillText(tile.quoteBy, L.quote.x, L.quote.y);
      ctx.globalAlpha = 1;
    }
    var subStart = Math.max(afterHead + 0.1, ANSWER_AT);
    drawLines(ctx, L.sub, C.muted, t, subStart, 0.12);
    if (L.chat) drawChat(ctx, L.chat, t, subStart + 0.5);
    drawCta(ctx, L, t, fmtKey === 'story' ? 4.3 : 3.6);
    ctx.restore();
    return L;
  }

  window.HAVTiles = { TILES: TILES, FORMATS: FORMATS, SECONDS: SECONDS, FPS: FPS, draw: draw, layout: layout };
})();
