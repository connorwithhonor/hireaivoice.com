/* HireAIVoice enhancement layer. Every effect is additive: if this file never runs,
   the page is fully readable and every link works. */
(function () {
  var DEMO = "+16612197299";
  var d = document, root = d.documentElement;
  root.className += " js";

  function ready(fn){ d.readyState !== "loading" ? fn() : d.addEventListener("DOMContentLoaded", fn); }

  ready(function () {
    /* ---- reveal on scroll ---- */
    var targets = d.querySelectorAll("section > .w > *, .chart, .step, .price, .faq");
    if (!("IntersectionObserver" in window)) return init();
    [].forEach.call(targets, function (el) { el.classList.add("rv"); });

    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
        if (e.target.classList.contains("chart")) drawCharts(e.target);
        countUp(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    [].forEach.call(targets, function (el) { io.observe(el); });

    /* safety net: anything still hidden after 2.5s gets shown */
    setTimeout(function () {
      [].forEach.call(d.querySelectorAll(".rv:not(.in)"), function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
      });
    }, 2500);

    init();
  });

  /* ---- number count-up ---- */
  function countUp(scope) {
    [].forEach.call(scope.querySelectorAll("[data-count]"), function (el) {
      if (el.dataset.done) return; el.dataset.done = "1";
      var to = parseFloat(el.dataset.count), pre = el.dataset.pre || "", post = el.dataset.post || "";
      var t0 = null, dur = 900;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = pre + to + post; return; }
      requestAnimationFrame(function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + Math.round(to * e).toLocaleString() + post;
        if (p < 1) requestAnimationFrame(step);
      });
    });
  }

  /* ---- set stroke length so the curve can draw itself ---- */
  function drawCharts(scope) {
    [].forEach.call(scope.querySelectorAll(".curve"), function (p) {
      try { var L = p.getTotalLength(); p.style.setProperty("--len", L); } catch (e) {}
    });
  }
  ready(function () {
    [].forEach.call(d.querySelectorAll(".chart"), function (c) { drawCharts(c); });
  });

  /* Voice demos use the telephone links. No browser voice widget is loaded. */
  function init(){}

})();
