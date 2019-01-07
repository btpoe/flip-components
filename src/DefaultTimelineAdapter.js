export default class TimelineAdapter {
  constructor(options) {
    this.options = options;
    this.timeline = null;
  }

  cacheData(element) {
    const styles = getComputedStyle(element);

    return {
      rect: element.getBoundingClientRect(),
      transform: styles.getPropertyValue('transform'),
      transformOrigin: styles.getPropertyValue('transform-origin'),
      opacity: styles.getPropertyValue('opacity'),
    };
  }

  animate(element, cache) {
    if (this.timeline) {
      // clean up old animation
      this.timeline.removeEventListener('finish', this.finishCallback);
      this.timeline.cancel();
    }

    const {
      rect: prevRect,
      opacity: prevOpacity
    } = cache;

    const {
      rect: nextRect,
      transform,
      transformOrigin,
      opacity,
    } = this.cacheData(element);

    const sx = (prevRect.width / nextRect.width) || '0';
    const sy = (prevRect.height / nextRect.height) || '0';
    const dx = (prevRect.left - nextRect.left) || '0';
    const dy = (prevRect.top - nextRect.top) || '0';

    const mod = transform !== 'none' ? transform : '';

    this.timeline = element.animate([
      {
        transform: `matrix(${sx}, 0, 0, ${sy}, ${dx}, ${dy}) ${mod}`,
        transformOrigin: '0 0 0',
        opacity: prevOpacity,
      },
      {
        transform: `matrix(1, 0, 0, 1, 0, 0) ${mod}`,
        transformOrigin,
        opacity,
      },
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
