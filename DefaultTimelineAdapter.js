export default class TimelineAdapter {
  constructor(options) {
    this.options = options;
    this.timeline = null;
  }

  cacheData(element) {
    return element.getBoundingClientRect();
  }

  animate(element, prevPos) {
    if (this.timeline) {
      // clean up old animation
      this.timeline.removeEventListener('finish', this.finishCallback);
      this.timeline.cancel();
    }

    const nextPos = this.cacheData(element);

    element.style.transformOrigin = 'top left';

    this.timeline = element.animate([
        { transform: `translate(${prevPos.left - nextPos.left}px, ${prevPos.top - nextPos.top}px) scale(${prevPos.width / nextPos.width}, ${prevPos.height / nextPos.height})` },
        { transform: `none` },
      ], this.options);

    const adapter = this;
    this.finishCallback = function() {
      if (this === adapter.timeline) adapter.timeline = null;
    }
    this.timeline.addEventListener('finish', this.finishCallback);

    return this;
  }

  pause() {
    if (this.timeline) {
      this.timeline.pause();
    }

    return this;
  }
}
