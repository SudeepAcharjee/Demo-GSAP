import "./chunk-CEQRFMJQ.js";

// node_modules/@studio-freight/lenis/dist/lenis.modern.mjs
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var i3 = arguments[e3];
      for (var s3 in i3)
        Object.prototype.hasOwnProperty.call(i3, s3) && (t2[s3] = i3[s3]);
    }
    return t2;
  }, t.apply(this, arguments);
}
function e(t2, e3, i3) {
  return Math.max(t2, Math.min(e3, i3));
}
var i = class {
  advance(t2) {
    var i3;
    if (!this.isRunning)
      return;
    let s3 = false;
    if (this.lerp)
      this.value = (o3 = this.value, n3 = this.to, (1 - (l3 = 1 - Math.exp(-60 * this.lerp * t2))) * o3 + l3 * n3), Math.round(this.value) === this.to && (this.value = this.to, s3 = true);
    else {
      this.currentTime += t2;
      const i4 = e(0, this.currentTime / this.duration, 1);
      s3 = i4 >= 1;
      const o4 = s3 ? 1 : this.easing(i4);
      this.value = this.from + (this.to - this.from) * o4;
    }
    var o3, n3, l3;
    null == (i3 = this.onUpdate) || i3.call(this, this.value, s3), s3 && this.stop();
  }
  stop() {
    this.isRunning = false;
  }
  fromTo(t2, e3, { lerp: i3 = 0.1, duration: s3 = 1, easing: o3 = (t3) => t3, onStart: n3, onUpdate: l3 }) {
    this.from = this.value = t2, this.to = e3, this.lerp = i3, this.duration = s3, this.easing = o3, this.currentTime = 0, this.isRunning = true, null == n3 || n3(), this.onUpdate = l3;
  }
};
var s = class {
  constructor({ wrapper: t2, content: e3, autoResize: i3 = true } = {}) {
    if (this.resize = () => {
      this.onWrapperResize(), this.onContentResize();
    }, this.onWrapperResize = () => {
      this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    }, this.onContentResize = () => {
      this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth;
    }, this.wrapper = t2, this.content = e3, i3) {
      const t3 = /* @__PURE__ */ function(t4, e4) {
        let i4;
        return function() {
          let e5 = arguments, s3 = this;
          clearTimeout(i4), i4 = setTimeout(function() {
            t4.apply(s3, e5);
          }, 250);
        };
      }(this.resize);
      this.wrapper !== window && (this.wrapperResizeObserver = new ResizeObserver(t3), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(t3), this.contentResizeObserver.observe(this.content);
    }
    this.resize();
  }
  destroy() {
    var t2, e3;
    null == (t2 = this.wrapperResizeObserver) || t2.disconnect(), null == (e3 = this.contentResizeObserver) || e3.disconnect();
  }
  get limit() {
    return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
  }
};
var o = class {
  constructor() {
    this.events = {};
  }
  emit(t2, ...e3) {
    let i3 = this.events[t2] || [];
    for (let t3 = 0, s3 = i3.length; t3 < s3; t3++)
      i3[t3](...e3);
  }
  on(t2, e3) {
    var i3;
    return (null == (i3 = this.events[t2]) ? void 0 : i3.push(e3)) || (this.events[t2] = [e3]), () => {
      var i4;
      this.events[t2] = null == (i4 = this.events[t2]) ? void 0 : i4.filter((t3) => e3 !== t3);
    };
  }
  off(t2, e3) {
    var i3;
    this.events[t2] = null == (i3 = this.events[t2]) ? void 0 : i3.filter((t3) => e3 !== t3);
  }
  destroy() {
    this.events = {};
  }
};
var n = class {
  constructor(t2, { wheelMultiplier: i3 = 1, touchMultiplier: s3 = 2, normalizeWheel: n3 = false }) {
    this.onTouchStart = (t3) => {
      const { clientX: e3, clientY: i4 } = t3.targetTouches ? t3.targetTouches[0] : t3;
      this.touchStart.x = e3, this.touchStart.y = i4, this.lastDelta = { x: 0, y: 0 };
    }, this.onTouchMove = (t3) => {
      const { clientX: e3, clientY: i4 } = t3.targetTouches ? t3.targetTouches[0] : t3, s4 = -(e3 - this.touchStart.x) * this.touchMultiplier, o3 = -(i4 - this.touchStart.y) * this.touchMultiplier;
      this.touchStart.x = e3, this.touchStart.y = i4, this.lastDelta = { x: s4, y: o3 }, this.emitter.emit("scroll", { deltaX: s4, deltaY: o3, event: t3 });
    }, this.onTouchEnd = (t3) => {
      this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t3 });
    }, this.onWheel = (t3) => {
      let { deltaX: i4, deltaY: s4 } = t3;
      this.normalizeWheel && (i4 = e(-100, i4, 100), s4 = e(-100, s4, 100)), i4 *= this.wheelMultiplier, s4 *= this.wheelMultiplier, this.emitter.emit("scroll", { deltaX: i4, deltaY: s4, event: t3 });
    }, this.element = t2, this.wheelMultiplier = i3, this.touchMultiplier = s3, this.normalizeWheel = n3, this.touchStart = { x: null, y: null }, this.emitter = new o(), this.element.addEventListener("wheel", this.onWheel, { passive: false }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: false });
  }
  on(t2, e3) {
    return this.emitter.on(t2, e3);
  }
  destroy() {
    this.emitter.destroy(), this.element.removeEventListener("wheel", this.onWheel, { passive: false }), this.element.removeEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.removeEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.removeEventListener("touchend", this.onTouchEnd, { passive: false });
  }
};
var l = class {
  constructor({ wrapper: e3 = window, content: l3 = document.documentElement, wheelEventsTarget: r2 = e3, eventsTarget: h2 = r2, smoothWheel: a2 = true, smoothTouch: c2 = false, syncTouch: u = false, syncTouchLerp: p = 0.1, __iosNoInertiaSyncTouchLerp: d = 0.4, touchInertiaMultiplier: m = 35, duration: v, easing: g = (t2) => Math.min(1, 1.001 - Math.pow(2, -10 * t2)), lerp: S = !v && 0.1, infinite: w = false, orientation: f = "vertical", gestureOrientation: y = "vertical", touchMultiplier: T = 1, wheelMultiplier: z = 1, normalizeWheel: _ = false, autoResize: M = true } = {}) {
    this.onVirtualScroll = ({ deltaX: e4, deltaY: i3, event: s3 }) => {
      if (s3.ctrlKey)
        return;
      const o3 = s3.type.includes("touch"), n3 = s3.type.includes("wheel");
      if ("both" === this.options.gestureOrientation && 0 === e4 && 0 === i3 || "vertical" === this.options.gestureOrientation && 0 === i3 || "horizontal" === this.options.gestureOrientation && 0 === e4 || o3 && "vertical" === this.options.gestureOrientation && 0 === this.scroll && !this.options.infinite && i3 <= 0)
        return;
      let l4 = s3.composedPath();
      if (l4 = l4.slice(0, l4.indexOf(this.rootElement)), l4.find((t2) => {
        var e5;
        return (null == t2.hasAttribute ? void 0 : t2.hasAttribute("data-lenis-prevent")) || o3 && (null == t2.hasAttribute ? void 0 : t2.hasAttribute("data-lenis-prevent-touch")) || n3 && (null == t2.hasAttribute ? void 0 : t2.hasAttribute("data-lenis-prevent-wheel")) || (null == (e5 = t2.classList) ? void 0 : e5.contains("lenis"));
      }))
        return;
      if (this.isStopped || this.isLocked)
        return void s3.preventDefault();
      if (this.isSmooth = (this.options.smoothTouch || this.options.syncTouch) && o3 || this.options.smoothWheel && n3, !this.isSmooth)
        return this.isScrolling = false, void this.animate.stop();
      s3.preventDefault();
      let r3 = i3;
      "both" === this.options.gestureOrientation ? r3 = Math.abs(i3) > Math.abs(e4) ? i3 : e4 : "horizontal" === this.options.gestureOrientation && (r3 = e4);
      const h3 = o3 && this.options.syncTouch, a3 = o3 && "touchend" === s3.type && Math.abs(r3) > 1;
      a3 && (r3 = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + r3, t({ programmatic: false }, h3 && { lerp: a3 ? this.syncTouchLerp : this.options.__iosNoInertiaSyncTouchLerp }));
    }, this.onNativeScroll = () => {
      if (!this.__preventNextScrollEvent && !this.isScrolling) {
        const t2 = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.direction = Math.sign(this.animatedScroll - t2), this.emit();
      }
    }, window.lenisVersion = "1.0.29", e3 !== document.documentElement && e3 !== document.body || (e3 = window), this.options = { wrapper: e3, content: l3, wheelEventsTarget: r2, eventsTarget: h2, smoothWheel: a2, smoothTouch: c2, syncTouch: u, syncTouchLerp: p, __iosNoInertiaSyncTouchLerp: d, touchInertiaMultiplier: m, duration: v, easing: g, lerp: S, infinite: w, gestureOrientation: y, orientation: f, touchMultiplier: T, wheelMultiplier: z, normalizeWheel: _, autoResize: M }, this.animate = new i(), this.emitter = new o(), this.dimensions = new s({ wrapper: e3, content: l3, autoResize: M }), this.toggleClass("lenis", true), this.velocity = 0, this.isLocked = false, this.isStopped = false, this.isSmooth = u || a2 || c2, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, { passive: false }), this.virtualScroll = new n(h2, { touchMultiplier: T, wheelMultiplier: z, normalizeWheel: _ }), this.virtualScroll.on("scroll", this.onVirtualScroll);
  }
  destroy() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, { passive: false }), this.virtualScroll.destroy(), this.dimensions.destroy(), this.toggleClass("lenis", false), this.toggleClass("lenis-smooth", false), this.toggleClass("lenis-scrolling", false), this.toggleClass("lenis-stopped", false), this.toggleClass("lenis-locked", false);
  }
  on(t2, e3) {
    return this.emitter.on(t2, e3);
  }
  off(t2, e3) {
    return this.emitter.off(t2, e3);
  }
  setScroll(t2) {
    this.isHorizontal ? this.rootElement.scrollLeft = t2 : this.rootElement.scrollTop = t2;
  }
  resize() {
    this.dimensions.resize();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  reset() {
    this.isLocked = false, this.isScrolling = false, this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.animate.stop();
  }
  start() {
    this.isStopped = false, this.reset();
  }
  stop() {
    this.isStopped = true, this.animate.stop(), this.reset();
  }
  raf(t2) {
    const e3 = t2 - (this.time || t2);
    this.time = t2, this.animate.advance(1e-3 * e3);
  }
  scrollTo(t2, { offset: i3 = 0, immediate: s3 = false, lock: o3 = false, duration: n3 = this.options.duration, easing: l3 = this.options.easing, lerp: r2 = !n3 && this.options.lerp, onComplete: h2 = null, force: a2 = false, programmatic: c2 = true } = {}) {
    if (!this.isStopped && !this.isLocked || a2) {
      if (["top", "left", "start"].includes(t2))
        t2 = 0;
      else if (["bottom", "right", "end"].includes(t2))
        t2 = this.limit;
      else {
        var u;
        let e3;
        if ("string" == typeof t2 ? e3 = document.querySelector(t2) : null != (u = t2) && u.nodeType && (e3 = t2), e3) {
          if (this.options.wrapper !== window) {
            const t3 = this.options.wrapper.getBoundingClientRect();
            i3 -= this.isHorizontal ? t3.left : t3.top;
          }
          const s4 = e3.getBoundingClientRect();
          t2 = (this.isHorizontal ? s4.left : s4.top) + this.animatedScroll;
        }
      }
      if ("number" == typeof t2) {
        if (t2 += i3, t2 = Math.round(t2), this.options.infinite ? c2 && (this.targetScroll = this.animatedScroll = this.scroll) : t2 = e(0, t2, this.limit), s3)
          return this.animatedScroll = this.targetScroll = t2, this.setScroll(this.scroll), this.reset(), void (null == h2 || h2(this));
        if (!c2) {
          if (t2 === this.targetScroll)
            return;
          this.targetScroll = t2;
        }
        this.animate.fromTo(this.animatedScroll, t2, { duration: n3, easing: l3, lerp: r2, onStart: () => {
          o3 && (this.isLocked = true), this.isScrolling = true;
        }, onUpdate: (t3, e3) => {
          this.isScrolling = true, this.velocity = t3 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t3, this.setScroll(this.scroll), c2 && (this.targetScroll = t3), e3 || this.emit(), e3 && (this.reset(), this.emit(), null == h2 || h2(this), this.__preventNextScrollEvent = true, requestAnimationFrame(() => {
            delete this.__preventNextScrollEvent;
          }));
        } });
      }
    }
  }
  get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }
  get limit() {
    return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  get isHorizontal() {
    return "horizontal" === this.options.orientation;
  }
  get actualScroll() {
    return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
  }
  get scroll() {
    return this.options.infinite ? (this.animatedScroll % (t2 = this.limit) + t2) % t2 : this.animatedScroll;
    var t2;
  }
  get progress() {
    return 0 === this.limit ? 1 : this.scroll / this.limit;
  }
  get isSmooth() {
    return this.__isSmooth;
  }
  set isSmooth(t2) {
    this.__isSmooth !== t2 && (this.__isSmooth = t2, this.toggleClass("lenis-smooth", t2));
  }
  get isScrolling() {
    return this.__isScrolling;
  }
  set isScrolling(t2) {
    this.__isScrolling !== t2 && (this.__isScrolling = t2, this.toggleClass("lenis-scrolling", t2));
  }
  get isStopped() {
    return this.__isStopped;
  }
  set isStopped(t2) {
    this.__isStopped !== t2 && (this.__isStopped = t2, this.toggleClass("lenis-stopped", t2));
  }
  get isLocked() {
    return this.__isLocked;
  }
  set isLocked(t2) {
    this.__isLocked !== t2 && (this.__isLocked = t2, this.toggleClass("lenis-locked", t2));
  }
  get className() {
    let t2 = "lenis";
    return this.isStopped && (t2 += " lenis-stopped"), this.isLocked && (t2 += " lenis-locked"), this.isScrolling && (t2 += " lenis-scrolling"), this.isSmooth && (t2 += " lenis-smooth"), t2;
  }
  toggleClass(t2, e3) {
    this.rootElement.classList.toggle(t2, e3), this.emitter.emit("className change", this);
  }
};

// node_modules/locomotive-scroll/dist/locomotive-scroll.modern.mjs
function s2() {
  return s2 = Object.assign ? Object.assign.bind() : function(t2) {
    for (var s3 = 1; s3 < arguments.length; s3++) {
      var e3 = arguments[s3];
      for (var i3 in e3)
        Object.prototype.hasOwnProperty.call(e3, i3) && (t2[i3] = e3[i3]);
    }
    return t2;
  }, s2.apply(this, arguments);
}
var e2 = class {
  constructor({ scrollElements: t2, rootMargin: s3 = "-1px -1px -1px -1px", IORaf: e3 }) {
    this.scrollElements = void 0, this.rootMargin = void 0, this.IORaf = void 0, this.observer = void 0, this.scrollElements = t2, this.rootMargin = s3, this.IORaf = e3, this._init();
  }
  _init() {
    this.observer = new IntersectionObserver((t2) => {
      t2.forEach((t3) => {
        const s3 = this.scrollElements.find((s4) => s4.$el === t3.target);
        t3.isIntersecting ? (s3 && (s3.isAlreadyIntersected = true), this._setInview(t3)) : s3 && s3.isAlreadyIntersected && this._setOutOfView(t3);
      });
    }, { rootMargin: this.rootMargin });
    for (const t2 of this.scrollElements)
      this.observe(t2.$el);
  }
  destroy() {
    this.observer.disconnect();
  }
  observe(t2) {
    t2 && this.observer.observe(t2);
  }
  unobserve(t2) {
    t2 && this.observer.unobserve(t2);
  }
  _setInview(t2) {
    const s3 = this.scrollElements.find((s4) => s4.$el === t2.target);
    this.IORaf && (null == s3 || s3.setInteractivityOn()), !this.IORaf && (null == s3 || s3.setInview());
  }
  _setOutOfView(t2) {
    const s3 = this.scrollElements.find((s4) => s4.$el === t2.target);
    this.IORaf && (null == s3 || s3.setInteractivityOff()), !this.IORaf && (null == s3 || s3.setOutOfView()), null != s3 && s3.attributes.scrollRepeat || this.IORaf || this.unobserve(t2.target);
  }
};
function i2(t2, s3, e3, i3, r2) {
  return e3 + ((r2 - t2) / (s3 - t2) * (i3 - e3) || 0);
}
function r(t2, s3) {
  return t2.reduce((t3, e3) => Math.abs(e3 - s3) < Math.abs(t3 - s3) ? e3 : t3);
}
var l2 = class {
  constructor({ $el: t2, id: s3, modularInstance: e3, subscribeElementUpdateFn: i3, unsubscribeElementUpdateFn: r2, needRaf: l3, scrollOrientation: n3 }) {
    var o3, a2, c2, h2, d;
    this.$el = void 0, this.id = void 0, this.needRaf = void 0, this.attributes = void 0, this.scrollOrientation = void 0, this.isAlreadyIntersected = void 0, this.intersection = void 0, this.metrics = void 0, this.currentScroll = void 0, this.translateValue = void 0, this.progress = void 0, this.lastProgress = void 0, this.modularInstance = void 0, this.progressModularModules = void 0, this.isInview = void 0, this.isInteractive = void 0, this.isInFold = void 0, this.isFirstResize = void 0, this.subscribeElementUpdateFn = void 0, this.unsubscribeElementUpdateFn = void 0, this.$el = t2, this.id = s3, this.needRaf = l3, this.scrollOrientation = n3, this.modularInstance = e3, this.subscribeElementUpdateFn = i3, this.unsubscribeElementUpdateFn = r2, this.attributes = { scrollClass: null != (o3 = this.$el.dataset.scrollClass) ? o3 : "is-inview", scrollOffset: null != (a2 = this.$el.dataset.scrollOffset) ? a2 : "0,0", scrollPosition: null != (c2 = this.$el.dataset.scrollPosition) ? c2 : "start,end", scrollModuleProgress: null != this.$el.dataset.scrollModuleProgress, scrollCssProgress: null != this.$el.dataset.scrollCssProgress, scrollEventProgress: null != (h2 = this.$el.dataset.scrollEventProgress) ? h2 : null, scrollSpeed: null != this.$el.dataset.scrollSpeed ? parseFloat(this.$el.dataset.scrollSpeed) : null, scrollRepeat: null != this.$el.dataset.scrollRepeat, scrollCall: null != (d = this.$el.dataset.scrollCall) ? d : null, scrollCallSelf: null != this.$el.dataset.scrollCallSelf, scrollIgnoreFold: null != this.$el.dataset.scrollIgnoreFold, scrollEnableTouchSpeed: null != this.$el.dataset.scrollEnableTouchSpeed }, this.intersection = { start: 0, end: 0 }, this.metrics = { offsetStart: 0, offsetEnd: 0, bcr: {} }, this.currentScroll = "vertical" === this.scrollOrientation ? window.scrollY : window.scrollX, this.translateValue = 0, this.progress = 0, this.lastProgress = null, this.progressModularModules = [], this.isInview = false, this.isInteractive = false, this.isAlreadyIntersected = false, this.isInFold = false, this.isFirstResize = true, this._init();
  }
  _init() {
    this.needRaf && (this.modularInstance && this.attributes.scrollModuleProgress && this._getProgressModularModules(), this._resize());
  }
  onResize({ currentScroll: t2 }) {
    this.currentScroll = t2, this._resize();
  }
  onRender({ currentScroll: t2, smooth: s3 }) {
    const e3 = "vertical" === this.scrollOrientation ? window.innerHeight : window.innerWidth;
    if (this.currentScroll = t2, this._computeProgress(), this.attributes.scrollSpeed && !isNaN(this.attributes.scrollSpeed))
      if (this.attributes.scrollEnableTouchSpeed || s3) {
        if (this.isInFold) {
          const t3 = Math.max(0, this.progress);
          this.translateValue = t3 * e3 * this.attributes.scrollSpeed * -1;
        } else {
          const t3 = i2(0, 1, -1, 1, this.progress);
          this.translateValue = t3 * e3 * this.attributes.scrollSpeed * -1;
        }
        this.$el.style.transform = "vertical" === this.scrollOrientation ? `translate3d(0, ${this.translateValue}px, 0)` : `translate3d(${this.translateValue}px, 0, 0)`;
      } else
        this.translateValue && (this.$el.style.transform = "translate3d(0, 0, 0)"), this.translateValue = 0;
  }
  setInview() {
    if (this.isInview)
      return;
    this.isInview = true, this.$el.classList.add(this.attributes.scrollClass);
    const t2 = this._getScrollCallFrom();
    this.attributes.scrollCall && this._dispatchCall("enter", t2);
  }
  setOutOfView() {
    if (!this.isInview || !this.attributes.scrollRepeat)
      return;
    this.isInview = false, this.$el.classList.remove(this.attributes.scrollClass);
    const t2 = this._getScrollCallFrom();
    this.attributes.scrollCall && this._dispatchCall("leave", t2);
  }
  setInteractivityOn() {
    this.isInteractive || (this.isInteractive = true, this.subscribeElementUpdateFn(this));
  }
  setInteractivityOff() {
    this.isInteractive && (this.isInteractive = false, this.unsubscribeElementUpdateFn(this), null != this.lastProgress && this._computeProgress(r([0, 1], this.lastProgress)));
  }
  _resize() {
    this.metrics.bcr = this.$el.getBoundingClientRect(), this._computeMetrics(), this._computeIntersection(), this.isFirstResize && (this.isFirstResize = false, this.isInFold && this.setInview());
  }
  _computeMetrics() {
    const { top: t2, left: s3, height: e3, width: i3 } = this.metrics.bcr, r2 = "vertical" === this.scrollOrientation ? window.innerHeight : window.innerWidth, l3 = "vertical" === this.scrollOrientation ? e3 : i3;
    this.metrics.offsetStart = this.currentScroll + ("vertical" === this.scrollOrientation ? t2 : s3) - this.translateValue, this.metrics.offsetEnd = this.metrics.offsetStart + l3, this.isInFold = this.metrics.offsetStart < r2 && !this.attributes.scrollIgnoreFold;
  }
  _computeIntersection() {
    const t2 = "vertical" === this.scrollOrientation ? window.innerHeight : window.innerWidth, s3 = "vertical" === this.scrollOrientation ? this.metrics.bcr.height : this.metrics.bcr.width, e3 = this.attributes.scrollOffset.split(","), i3 = null != e3[0] ? e3[0].trim() : "0", r2 = null != e3[1] ? e3[1].trim() : "0", l3 = this.attributes.scrollPosition.split(",");
    let n3 = null != l3[0] ? l3[0].trim() : "start";
    const o3 = null != l3[1] ? l3[1].trim() : "end", a2 = i3.includes("%") ? t2 * parseInt(i3.replace("%", "").trim()) * 0.01 : parseInt(i3), c2 = r2.includes("%") ? t2 * parseInt(r2.replace("%", "").trim()) * 0.01 : parseInt(r2);
    switch (this.isInFold && (n3 = "fold"), n3) {
      case "start":
      default:
        this.intersection.start = this.metrics.offsetStart - t2 + a2;
        break;
      case "middle":
        this.intersection.start = this.metrics.offsetStart - t2 + a2 + 0.5 * s3;
        break;
      case "end":
        this.intersection.start = this.metrics.offsetStart - t2 + a2 + s3;
        break;
      case "fold":
        this.intersection.start = 0;
    }
    switch (o3) {
      case "start":
        this.intersection.end = this.metrics.offsetStart - c2;
        break;
      case "middle":
        this.intersection.end = this.metrics.offsetStart - c2 + 0.5 * s3;
        break;
      default:
        this.intersection.end = this.metrics.offsetStart - c2 + s3;
    }
    if (this.intersection.end <= this.intersection.start)
      switch (o3) {
        case "start":
        default:
          this.intersection.end = this.intersection.start + 1;
          break;
        case "middle":
          this.intersection.end = this.intersection.start + 0.5 * s3;
          break;
        case "end":
          this.intersection.end = this.intersection.start + s3;
      }
  }
  _computeProgress(t2) {
    const s3 = null != t2 ? t2 : (e3 = i2(this.intersection.start, this.intersection.end, 0, 1, this.currentScroll)) < 0 ? 0 : e3 > 1 ? 1 : e3;
    var e3;
    if (this.progress = s3, s3 != this.lastProgress) {
      if (this.lastProgress = s3, this.attributes.scrollCssProgress && this._setCssProgress(s3), this.attributes.scrollEventProgress && this._setCustomEventProgress(s3), this.attributes.scrollModuleProgress)
        for (const t3 of this.progressModularModules)
          this.modularInstance && this.modularInstance.call("onScrollProgress", s3, t3.moduleName, t3.moduleId);
      s3 > 0 && s3 < 1 && this.setInview(), 0 === s3 && this.setOutOfView(), 1 === s3 && this.setOutOfView();
    }
  }
  _setCssProgress(t2 = 0) {
    this.$el.style.setProperty("--progress", t2.toString());
  }
  _setCustomEventProgress(t2 = 0) {
    const s3 = this.attributes.scrollEventProgress;
    if (!s3)
      return;
    const e3 = new CustomEvent(s3, { detail: { target: this.$el, progress: t2 } });
    window.dispatchEvent(e3);
  }
  _getProgressModularModules() {
    if (!this.modularInstance)
      return;
    const t2 = Object.keys(this.$el.dataset).filter((t3) => t3.includes("module")), s3 = Object.entries(this.modularInstance.modules);
    if (t2.length)
      for (const e3 of t2) {
        const t3 = this.$el.dataset[e3];
        if (!t3)
          return;
        for (const e4 of s3) {
          const [s4, i3] = e4;
          t3 in i3 && this.progressModularModules.push({ moduleName: s4, moduleId: t3 });
        }
      }
  }
  _getScrollCallFrom() {
    const t2 = r([this.intersection.start, this.intersection.end], this.currentScroll);
    return this.intersection.start === t2 ? "start" : "end";
  }
  _dispatchCall(t2, s3) {
    var e3, i3;
    const r2 = null == (e3 = this.attributes.scrollCall) ? void 0 : e3.split(","), l3 = null == (i3 = this.attributes) ? void 0 : i3.scrollCallSelf;
    if (r2 && r2.length > 1) {
      var n3;
      const [e4, i4, o3] = r2;
      let a2;
      a2 = l3 ? this.$el.dataset[`module${i4.trim()}`] : o3, this.modularInstance && this.modularInstance.call(e4.trim(), { target: this.$el, way: t2, from: s3 }, i4.trim(), null == (n3 = a2) ? void 0 : n3.trim());
    } else if (r2) {
      const [e4] = r2, i4 = new CustomEvent(e4, { detail: { target: this.$el, way: t2, from: s3 } });
      window.dispatchEvent(i4);
    }
  }
};
var n2 = ["scrollOffset", "scrollPosition", "scrollModuleProgress", "scrollCssProgress", "scrollEventProgress", "scrollSpeed"];
var o2 = class {
  constructor({ $el: t2, modularInstance: s3, triggerRootMargin: e3, rafRootMargin: i3, scrollOrientation: r2 }) {
    this.$scrollContainer = void 0, this.modularInstance = void 0, this.triggerRootMargin = void 0, this.rafRootMargin = void 0, this.scrollElements = void 0, this.triggeredScrollElements = void 0, this.RAFScrollElements = void 0, this.scrollElementsToUpdate = void 0, this.IOTriggerInstance = void 0, this.IORafInstance = void 0, this.scrollOrientation = void 0, t2 ? (this.$scrollContainer = t2, this.modularInstance = s3, this.scrollOrientation = r2, this.triggerRootMargin = null != e3 ? e3 : "-1px -1px -1px -1px", this.rafRootMargin = null != i3 ? i3 : "100% 100% 100% 100%", this.scrollElements = [], this.triggeredScrollElements = [], this.RAFScrollElements = [], this.scrollElementsToUpdate = [], this._init()) : console.error("Please provide a DOM Element as scrollContainer");
  }
  _init() {
    const t2 = this.$scrollContainer.querySelectorAll("[data-scroll]"), s3 = Array.from(t2);
    this._subscribeScrollElements(s3), this.IOTriggerInstance = new e2({ scrollElements: [...this.triggeredScrollElements], rootMargin: this.triggerRootMargin, IORaf: false }), this.IORafInstance = new e2({ scrollElements: [...this.RAFScrollElements], rootMargin: this.rafRootMargin, IORaf: true });
  }
  destroy() {
    this.IOTriggerInstance.destroy(), this.IORafInstance.destroy(), this._unsubscribeAllScrollElements();
  }
  onResize({ currentScroll: t2 }) {
    for (const s3 of this.RAFScrollElements)
      s3.onResize({ currentScroll: t2 });
  }
  onRender({ currentScroll: t2, smooth: s3 }) {
    for (const e3 of this.scrollElementsToUpdate)
      e3.onRender({ currentScroll: t2, smooth: s3 });
  }
  removeScrollElements(t2) {
    const s3 = t2.querySelectorAll("[data-scroll]");
    if (s3.length) {
      for (let t3 = 0; t3 < this.triggeredScrollElements.length; t3++) {
        const e3 = this.triggeredScrollElements[t3];
        Array.from(s3).indexOf(e3.$el) > -1 && (this.IOTriggerInstance.unobserve(e3.$el), this.triggeredScrollElements.splice(t3, 1));
      }
      for (let t3 = 0; t3 < this.RAFScrollElements.length; t3++) {
        const e3 = this.RAFScrollElements[t3];
        Array.from(s3).indexOf(e3.$el) > -1 && (this.IORafInstance.unobserve(e3.$el), this.RAFScrollElements.splice(t3, 1));
      }
      s3.forEach((t3) => {
        const s4 = this.scrollElementsToUpdate.find((s5) => s5.$el === t3), e3 = this.scrollElements.find((s5) => s5.$el === t3);
        s4 && this._unsubscribeElementUpdate(s4), e3 && (this.scrollElements = this.scrollElements.filter((t4) => t4.id != e3.id));
      });
    }
  }
  addScrollElements(t2) {
    const s3 = t2.querySelectorAll("[data-scroll]"), e3 = [];
    this.scrollElements.forEach((t3) => {
      e3.push(t3.id);
    });
    const i3 = Math.max(...e3) + 1, r2 = Array.from(s3);
    this._subscribeScrollElements(r2, i3, true);
  }
  _subscribeScrollElements(t2, s3 = 0, e3 = false) {
    for (let i3 = 0; i3 < t2.length; i3++) {
      const r2 = t2[i3], n3 = this._checkRafNeeded(r2), o3 = new l2({ $el: r2, id: s3 + i3, scrollOrientation: this.scrollOrientation, modularInstance: this.modularInstance, subscribeElementUpdateFn: this._subscribeElementUpdate.bind(this), unsubscribeElementUpdateFn: this._unsubscribeElementUpdate.bind(this), needRaf: n3 });
      this.scrollElements.push(o3), n3 ? (this.RAFScrollElements.push(o3), e3 && (this.IORafInstance.scrollElements.push(o3), this.IORafInstance.observe(o3.$el))) : (this.triggeredScrollElements.push(o3), e3 && (this.IOTriggerInstance.scrollElements.push(o3), this.IOTriggerInstance.observe(o3.$el)));
    }
  }
  _unsubscribeAllScrollElements() {
    this.scrollElements = [], this.RAFScrollElements = [], this.triggeredScrollElements = [], this.scrollElementsToUpdate = [];
  }
  _subscribeElementUpdate(t2) {
    this.scrollElementsToUpdate.push(t2);
  }
  _unsubscribeElementUpdate(t2) {
    this.scrollElementsToUpdate = this.scrollElementsToUpdate.filter((s3) => s3.id != t2.id);
  }
  _checkRafNeeded(t2) {
    let s3 = [...n2];
    const e3 = (t3) => {
      s3 = s3.filter((s4) => s4 != t3);
    };
    if (t2.dataset.scrollOffset) {
      if ("0,0" != t2.dataset.scrollOffset.split(",").map((t3) => t3.replace("%", "").trim()).join(","))
        return true;
      e3("scrollOffset");
    } else
      e3("scrollOffset");
    if (t2.dataset.scrollPosition) {
      if ("top,bottom" != t2.dataset.scrollPosition.trim())
        return true;
      e3("scrollPosition");
    } else
      e3("scrollPosition");
    if (t2.dataset.scrollSpeed && !isNaN(parseFloat(t2.dataset.scrollSpeed)))
      return true;
    e3("scrollSpeed");
    for (const e4 of s3)
      if (e4 in t2.dataset)
        return true;
    return false;
  }
};
var a = class {
  constructor({ resizeElements: t2, resizeCallback: s3 = () => {
  } }) {
    this.$resizeElements = void 0, this.isFirstObserve = void 0, this.observer = void 0, this.resizeCallback = void 0, this.$resizeElements = t2, this.resizeCallback = s3, this.isFirstObserve = true, this._init();
  }
  _init() {
    this.observer = new ResizeObserver((t2) => {
      var s3;
      !this.isFirstObserve && (null == (s3 = this.resizeCallback) || s3.call(this)), this.isFirstObserve = false;
    });
    for (const t2 of this.$resizeElements)
      this.observer.observe(t2);
  }
  destroy() {
    this.observer.disconnect();
  }
};
var c = { wrapper: window, content: document.documentElement, eventsTarget: window, lerp: 0.1, duration: 0.75, orientation: "vertical", gestureOrientation: "vertical", smoothWheel: true, smoothTouch: false, syncTouch: false, syncTouchLerp: 0.1, touchInertiaMultiplier: 35, wheelMultiplier: 1, touchMultiplier: 2, normalizeWheel: false, autoResize: true, easing: (t2) => Math.min(1, 1.001 - Math.pow(2, -10 * t2)) };
var h = class {
  constructor({ lenisOptions: t2 = {}, modularInstance: e3, triggerRootMargin: i3, rafRootMargin: r2, autoResize: l3 = true, autoStart: n3 = true, scrollCallback: o3 = () => {
  }, initCustomTicker: a2, destroyCustomTicker: h2 } = {}) {
    this.rafPlaying = void 0, this.lenisInstance = void 0, this.coreInstance = void 0, this.lenisOptions = void 0, this.modularInstance = void 0, this.triggerRootMargin = void 0, this.rafRootMargin = void 0, this.rafInstance = void 0, this.autoResize = void 0, this.autoStart = void 0, this.ROInstance = void 0, this.initCustomTicker = void 0, this.destroyCustomTicker = void 0, this._onRenderBind = void 0, this._onResizeBind = void 0, this._onScrollToBind = void 0, this.lenisOptions = s2({}, c, t2), Object.assign(this, { lenisOptions: t2, modularInstance: e3, triggerRootMargin: i3, rafRootMargin: r2, autoResize: l3, autoStart: n3, scrollCallback: o3, initCustomTicker: a2, destroyCustomTicker: h2 }), this._onRenderBind = this._onRender.bind(this), this._onScrollToBind = this._onScrollTo.bind(this), this._onResizeBind = this._onResize.bind(this), this.rafPlaying = false, this._init();
  }
  _init() {
    var s3;
    this.lenisInstance = new l({ wrapper: this.lenisOptions.wrapper, content: this.lenisOptions.content, eventsTarget: this.lenisOptions.eventsTarget, lerp: this.lenisOptions.lerp, duration: this.lenisOptions.duration, orientation: this.lenisOptions.orientation, gestureOrientation: this.lenisOptions.gestureOrientation, smoothWheel: this.lenisOptions.smoothWheel, smoothTouch: this.lenisOptions.smoothTouch, syncTouch: this.lenisOptions.syncTouch, syncTouchLerp: this.lenisOptions.syncTouchLerp, touchInertiaMultiplier: this.lenisOptions.touchInertiaMultiplier, wheelMultiplier: this.lenisOptions.wheelMultiplier, touchMultiplier: this.lenisOptions.touchMultiplier, normalizeWheel: this.lenisOptions.normalizeWheel, easing: this.lenisOptions.easing }), null == (s3 = this.lenisInstance) || s3.on("scroll", this.scrollCallback), document.documentElement.setAttribute("data-scroll-orientation", this.lenisInstance.options.orientation), requestAnimationFrame(() => {
      this.coreInstance = new o2({ $el: this.lenisInstance.rootElement, modularInstance: this.modularInstance, triggerRootMargin: this.triggerRootMargin, rafRootMargin: this.rafRootMargin, scrollOrientation: this.lenisInstance.options.orientation }), this._bindEvents(), this.initCustomTicker && !this.destroyCustomTicker ? console.warn("initCustomTicker callback is declared, but destroyCustomTicker is not. Please pay attention. It could cause trouble.") : !this.initCustomTicker && this.destroyCustomTicker && console.warn("destroyCustomTicker callback is declared, but initCustomTicker is not. Please pay attention. It could cause trouble."), this.autoStart && this.start();
    });
  }
  destroy() {
    var t2;
    this.stop(), this._unbindEvents(), this.lenisInstance.destroy(), null == (t2 = this.coreInstance) || t2.destroy(), requestAnimationFrame(() => {
      var t3;
      null == (t3 = this.coreInstance) || t3.destroy();
    });
  }
  _bindEvents() {
    this._bindScrollToEvents(), this.autoResize && ("ResizeObserver" in window ? this.ROInstance = new a({ resizeElements: [document.body], resizeCallback: this._onResizeBind }) : window.addEventListener("resize", this._onResizeBind));
  }
  _unbindEvents() {
    this._unbindScrollToEvents(), this.autoResize && ("ResizeObserver" in window ? this.ROInstance && this.ROInstance.destroy() : window.removeEventListener("resize", this._onResizeBind));
  }
  _bindScrollToEvents(t2) {
    const s3 = t2 || this.lenisInstance.rootElement, e3 = null == s3 ? void 0 : s3.querySelectorAll("[data-scroll-to]");
    (null == e3 ? void 0 : e3.length) && e3.forEach((t3) => {
      t3.addEventListener("click", this._onScrollToBind, false);
    });
  }
  _unbindScrollToEvents(t2) {
    const s3 = t2 || this.lenisInstance.rootElement, e3 = null == s3 ? void 0 : s3.querySelectorAll("[data-scroll-to]");
    (null == e3 ? void 0 : e3.length) && e3.forEach((t3) => {
      t3.removeEventListener("click", this._onScrollToBind, false);
    });
  }
  _onResize() {
    requestAnimationFrame(() => {
      var t2;
      null == (t2 = this.coreInstance) || t2.onResize({ currentScroll: this.lenisInstance.scroll });
    });
  }
  _onRender() {
    var t2, s3;
    null == (t2 = this.lenisInstance) || t2.raf(Date.now()), null == (s3 = this.coreInstance) || s3.onRender({ currentScroll: this.lenisInstance.scroll, smooth: this.lenisInstance.isSmooth });
  }
  _onScrollTo(t2) {
    var s3;
    t2.preventDefault();
    const e3 = null != (s3 = t2.currentTarget) ? s3 : null;
    if (!e3)
      return;
    const i3 = e3.getAttribute("data-scroll-to-href") || e3.getAttribute("href"), r2 = e3.getAttribute("data-scroll-to-offset") || 0, l3 = e3.getAttribute("data-scroll-to-duration") || this.lenisOptions.duration || c.duration;
    i3 && this.scrollTo(i3, { offset: "string" == typeof r2 ? parseInt(r2) : r2, duration: "string" == typeof l3 ? parseInt(l3) : l3 });
  }
  start() {
    var t2;
    this.rafPlaying || (null == (t2 = this.lenisInstance) || t2.start(), this.rafPlaying = true, this.initCustomTicker ? this.initCustomTicker(this._onRenderBind) : this._raf());
  }
  stop() {
    var t2;
    this.rafPlaying && (null == (t2 = this.lenisInstance) || t2.stop(), this.rafPlaying = false, this.destroyCustomTicker ? this.destroyCustomTicker(this._onRenderBind) : this.rafInstance && cancelAnimationFrame(this.rafInstance));
  }
  removeScrollElements(t2) {
    var s3;
    t2 ? (this._unbindScrollToEvents(t2), null == (s3 = this.coreInstance) || s3.removeScrollElements(t2)) : console.error("Please provide a DOM Element as $oldContainer");
  }
  addScrollElements(t2) {
    var s3;
    t2 ? (null == (s3 = this.coreInstance) || s3.addScrollElements(t2), requestAnimationFrame(() => {
      this._bindScrollToEvents(t2);
    })) : console.error("Please provide a DOM Element as $newContainer");
  }
  resize() {
    this._onResizeBind();
  }
  scrollTo(t2, s3) {
    var e3;
    null == (e3 = this.lenisInstance) || e3.scrollTo(t2, { offset: null == s3 ? void 0 : s3.offset, lerp: null == s3 ? void 0 : s3.lerp, duration: null == s3 ? void 0 : s3.duration, immediate: null == s3 ? void 0 : s3.immediate, lock: null == s3 ? void 0 : s3.lock, force: null == s3 ? void 0 : s3.force, easing: null == s3 ? void 0 : s3.easing, onComplete: null == s3 ? void 0 : s3.onComplete });
  }
  _raf() {
    this._onRenderBind(), this.rafInstance = requestAnimationFrame(() => this._raf());
  }
};
export {
  h as default
};
//# sourceMappingURL=locomotive-scroll.js.map
