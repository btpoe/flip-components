import anime from 'animejs';
import DefaultTimelineAdapter from './DefaultTimelineAdapter';

export default class TimelineAdapter extends DefaultTimelineAdapter {
  static defaultConfig = {
    duration: 300,
    easing: 'easeInOutQuad',
  };

  animate(element, cache) {
    if (!(element instanceof Element) || !cache) return;

    const { rect: prevRect, opacity: prevOpacity } = cache;

    if (this.timeline) {
      this.timeline.seek(1);
      this.timeline.remove(element);
    }

    const { rect: nextRect } = this.cacheData(element);

    const sx = prevRect.width / nextRect.width || '0';
    const sy = prevRect.height / nextRect.height || '0';

    const dx =
      prevRect.left + prevRect.width / 2 - (nextRect.left + nextRect.width / 2);
    const dy =
      prevRect.top + prevRect.height / 2 - (nextRect.top + nextRect.height / 2);

    this.timeline = anime({
      targets: element,
      translateX: dx,
      translateY: dy,
      scaleX: sx,
      scaleY: sy,
      opacity: prevOpacity,
      direction: 'reverse',
      ...this.options,
    });

    return this;
  }
}
