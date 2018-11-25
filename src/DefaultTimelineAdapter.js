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

    element.style.transformOrigin = '0 0';

    this.timeline = element.animate([
        { transform: `matrix(${prevPos.width / nextPos.width}, 0, 0, ${prevPos.height / nextPos.height}, ${prevPos.left - nextPos.left}, ${prevPos.top - nextPos.top})` },
        { transform: getComputedStyle(element).getPropertyValue('transform') },
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
