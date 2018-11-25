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

    const sx = (prevPos.width / nextPos.width) || '0';
    const sy = (prevPos.height / nextPos.height) || '0';
    const dx = (prevPos.left - nextPos.left) || '0';
    const dy = (prevPos.top - nextPos.top) || '0';

    element.style.transformOrigin = '0 0';

    this.timeline = element.animate([
        { transform: `matrix(${sx}, 0, 0, ${sy}, ${dx}, ${dy})` },
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
