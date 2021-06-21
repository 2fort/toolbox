import * as core from './core';

const timeConstant = 325;

const kinetic = {
  offset: 0,
  velocity: 0,
  frame: 0,
  timestamp: 0,
  ticker: 0,
  amplitude: 0,
  target: 0,
};

function getInitialValues({
  width, height, naturalWidth, naturalHeight, left, top, scale,
}) {
  return {
    scale,
    box: {
      top,
      left,
      right: left + width,
      bottom: top + height,
    },
    width,
    height,
    naturalWidth,
    naturalHeight,
  };
}

export default class ImageInteraction {
  constructor(image, container, cb) {
    this.img = image;
    this.container = container;
    this.cb = cb;

    this.initial = {
      scale: 0,
      box: {},
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
    };

    this.current = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      scale: 0,
    };

    this.cursor = { left: 0, top: 0 };
    this.mouseMove = false;

    this.pan = false;
    this.pinch = false;
    this.swipe = false;

    this.lastTouchEnd = 0;
    this.same = false;
    this.ticker = 0;
    this.timestamp = 0;
    this.distance = 0;
    this.distanceMove = 0;
    this.targetLeft = 0;
    this.kineticX = { ...kinetic };
    this.kineticY = { ...kinetic };
    this.containerBox = {
      clientX: 0,
      clientY: 0,
      containerWidth: 0,
      containerHeight: 0,
    }; // update this on every window change or block size change (resize observer?)

    this.init(this.img);

    this.handleWheel = this.handleWheel.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.track = this.track.bind(this);
    this.scroll = this.scroll.bind(this);
    this.autoScroll = this.autoScroll.bind(this);
    this.doubleTap = this.doubleTap.bind(this);
    this.handlePinch = this.handlePinch.bind(this);
    this.smoothReturn = this.smoothReturn.bind(this);

    this.img.addEventListener('wheel', this.handleWheel);
    this.img.addEventListener('mousedown', this.handleMouseDown);
    this.img.addEventListener('dblclick', this.handleDoubleClick);
    this.img.addEventListener('touchstart', this.handleTouchStart);
    this.img.addEventListener('touchmove', this.handleTouchMove);
    this.img.addEventListener('touchend', this.handleTouchEnd);

    this.container.addEventListener('mousemove', this.handleMouseMove);
    this.container.addEventListener('mouseup', this.handleMouseUp);
    this.container.addEventListener('mouseleave', this.handleMouseUp);
  }

  init(img) {
    this.containerBox = this.container.getBoundingClientRect();
    const params = core.adjust(img.naturalWidth, img.naturalHeight, this.containerBox.width, this.containerBox.height, 0);
    this.apply(params);
    this.img.style.visibility = 'visible';

    this.initial = getInitialValues({ ...params, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight });
  }

  destroy() {
    this.img.removeEventListener('wheel', this.handleWheel);
    this.img.removeEventListener('mousedown', this.handleMouseDown);
    this.img.removeEventListener('dblclick', this.handleDoubleClick);
    this.img.removeEventListener('touchstart', this.handleTouchStart);
    this.img.removeEventListener('touchmove', this.handleTouchMove);
    this.img.removeEventListener('touchend', this.handleTouchEnd);

    this.container.removeEventListener('mousemove', this.handleMouseMove);
    this.container.removeEventListener('mouseup', this.handleMouseUp);
    this.container.removeEventListener('mouseleave', this.handleMouseUp);
  }

  apply(params) {
    Object.assign(this.current, params);

    this.img.style.transform = `translate3d(${this.current.left}px, ${this.current.top}px, 0) `
      + `scale3d(${this.current.scale}, ${this.current.scale}, 1)`;

    if (this.cb) {
      this.cb(this.current.scale);
    }
  }

  translate({ clientX, clientY }) {
    return {
      clientX: clientX - this.containerBox.left,
      clientY: clientY - this.containerBox.top,
      containerWidth: this.containerBox.width,
      containerHeight: this.containerBox.height,
    };
  }

  // mouse
  handleWheel(e) {
    if ((this.current.scale === 1 && e.deltaY < 0) || (this.current.scale === this.initial.scale && e.deltaY > 0)) {
      return;
    }

    e.preventDefault();

    const pos = this.translate(e);
    this.apply(core.zoom({ deltaY: e.deltaY, ...pos }, this.initial, this.current));
  }

  handleDoubleClick(e) {
    const pos = this.translate(e);
    const options = this.current.scale === 1 ? { min: true } : { max: true };
    this.apply(core.zoom({ deltaY: e.deltaY, ...pos }, this.initial, this.current, options));
  }

  handleMouseDown(e) {
    const pos = this.translate(e);

    this.cursor.left = pos.clientX;
    this.cursor.top = pos.clientY;

    this.img.ondragstart = () => false;

    if (this.current.scale === this.initial.scale) {
      return;
    }

    this.img.style.cursor = 'move';
    this.mouseMove = true;
  }

  handleMouseMove(e) {
    if (!this.mouseMove) return;

    const pos = this.translate(e);

    const rangeX = pos.clientX - this.cursor.left;
    const rangeY = pos.clientY - this.cursor.top;

    const left = rangeX < 0
      ? core.moveLeft(rangeX, this.current.left, this.current.width, pos.containerWidth)
      : core.moveRight(rangeX, this.current.left, this.current.width, pos.containerWidth);

    const top = rangeY < 0
      ? core.moveTop(rangeY, this.current.top, this.current.height, pos.containerHeight, 0) // fix offset!
      : core.moveBottom(rangeY, this.current.top, this.current.height, pos.containerHeight, 0); // fix offset!

    this.apply({ left, top });

    this.cursor.left = pos.clientX;
    this.cursor.top = pos.clientY;
  }

  handleMouseUp() {
    if (this.mouseMove) {
      this.mouseMove = false;
      this.img.style.cursor = 'default';
    }
  }

  track() {
    const now = Date.now();
    const elapsed = now - this.timestamp;
    this.timestamp = now;

    const deltaX = this.kineticX.offset - this.kineticX.frame;
    const deltaY = this.kineticY.offset - this.kineticY.frame;

    this.kineticX.frame = this.kineticX.offset;
    this.kineticY.frame = this.kineticY.offset;

    const vX = (1000 * deltaX) / (1 + elapsed);
    const vY = (1000 * deltaY) / (1 + elapsed);

    this.kineticX.velocity = (0.8 * vX) + (0.2 * this.kineticX.velocity);
    this.kineticY.velocity = (0.8 * vY) + (0.2 * this.kineticY.velocity);
  }

  scroll(x, y) {
    const rangeX = this.kineticX.offset - x;
    const rangeY = this.kineticY.offset - y;

    this.kineticX.offset = x;
    this.kineticY.offset = y;

    const left = rangeX < 0
      ? core.moveLeft(rangeX, this.current.left, this.current.width, this.containerBox.width)
      : core.moveRight(rangeX, this.current.left, this.current.width, this.containerBox.width);

    if (left === this.current.left) {
      this.kineticX.amplitude = 0;
    }

    const top = rangeY < 0
      ? core.moveTop(rangeY, this.current.top, this.current.height, this.containerBox.height, 0)
      : core.moveBottom(rangeY, this.current.top, this.current.height, this.containerBox.height, 0);

    if (top === this.current.top) {
      this.kineticY.amplitude = 0;
    }

    this.apply({ left, top });
  }

  autoScroll() {
    if (this.kineticX.amplitude || this.kineticY.amplitude) {
      const elapsed = Date.now() - this.timestamp;
      const deltaX = -this.kineticX.amplitude * Math.exp(-elapsed / timeConstant);
      const deltaY = -this.kineticY.amplitude * Math.exp(-elapsed / timeConstant);

      if (deltaX > 0.5 || deltaX < -0.5 || deltaY > 0.5 || deltaY < -0.5) {
        this.scroll(this.kineticX.target + deltaX, this.kineticY.target + deltaY);
        requestAnimationFrame(this.autoScroll);
      } else {
        this.scroll(this.kineticX.target, this.kineticY.target);
      }
    }
  }

  doubleTap() {
    const coordinates = this.translate({ clientX: this.cursor.left, clientY: this.cursor.top });

    const params = (() => {
      if (this.current.scale === 1) {
        return core.zoom(coordinates, this.initial, this.current, { min: true });
      }

      return core.zoom(coordinates, this.initial, this.current, { max: true });
    })();

    this.apply(params);
  }

  handleTouchStart(e) {
    e.preventDefault();

    if (e.touches.length === 1 && this.current.scale !== this.initial.scale) {
      this.pan = true;

      this.kineticX.velocity = 0;
      this.kineticY.velocity = 0;

      this.kineticX.amplitude = 0;
      this.kineticY.amplitude = 0;

      this.kineticX.frame = this.kineticX.offset;
      this.kineticY.frame = this.kineticY.offset;

      this.timestamp = Date.now();

      clearInterval(this.ticker);

      this.ticker = setInterval(this.track, 50);
    } else if (e.touches.length === 1 && this.current.scale === this.initial.scale) {
      this.swipe = true;
      this.targetLeft = this.initial.box.left;
    } else if (e.touches.length === 2) {
      this.pan = false;
      this.swipe = false;
      this.pinch = true;
    }

    if (
      e.touches.length === 1 &&
      Math.abs(this.cursor.left - e.touches[0].clientX < 25) &&
      Math.abs(this.cursor.top - e.touches[0].clientY < 25)
    ) {
      this.same = true;
    } else {
      this.same = false;
    }

    this.cursor.left = e.touches[0].clientX;
    this.cursor.top = e.touches[0].clientY;
  }

  handlePinch(touches) {
    const touch1 = touches[0];
    const touch2 = touches[1];

    const minX = Math.min(touch1.clientX, touch2.clientX);
    const minY = Math.min(touch1.clientY, touch2.clientY);

    const clientX = Math.round(minX + (Math.abs(touches[0].clientX - touches[1].clientX) / 2));
    const clientY = Math.round(minY + (Math.abs(touches[0].clientY - touches[1].clientY) / 2));

    const newDistance = Math.sqrt(
      (Math.round(touch1.clientX - touch2.clientX) ** 2) + (Math.round(touch1.clientY - touch2.clientY) ** 2),
    );

    if (!this.distance || Math.abs(newDistance - this.distance) < 2) {
      this.distance = newDistance;
      return;
    }

    const deltaY = newDistance > this.distance ? -1 : 1;

    this.distanceMove = newDistance - this.distance;
    this.distance = newDistance;

    if ((this.current.scale === 100.00 && deltaY < 0) || (this.current.scale === this.initial.scale && deltaY > 0)) {
      return;
    }

    const e = { clientX, clientY, deltaY };

    this.apply(core.zoom(e, this.initial, this.current, { zoom: this.current.scale + (this.distanceMove / 200) }));
  }

  handleTouchMove(e) {
    e.preventDefault();
    const imgPosition = 2;
    const totalImg = 3;

    if (this.pan) {
      const deltaX = this.cursor.left - e.touches[0].clientX;
      const deltaY = this.cursor.top - e.touches[0].clientY;

      if (deltaY > 2 || deltaY < -2 || deltaX > 2 || deltaX < -2) {
        this.cursor.left = e.touches[0].clientX;
        this.cursor.top = e.touches[0].clientY;
        this.scroll(this.kineticX.offset + deltaX, this.kineticY.offset + deltaY);
      }

      return;
    }

    if (this.swipe) {
      let left;

      if (e.touches[0].clientX - this.cursor.left < 0) {
        if (imgPosition === totalImg) {
          return;
        }

        left = this.current.left + (e.touches[0].clientX - this.cursor.left);
        this.apply({ left });

        if (Math.abs(left - this.targetLeft) >= 75) {
          this.swipe = false;
          // navActions.nextImg();
          // TODO: attach swipe actions on init
          return;
        }

        this.cursor.left = e.touches[0].clientX;
      } else if (e.touches[0].clientX - this.cursor.left > 0) {
        if (imgPosition === 1) {
          return;
        }

        left = this.current.left - (this.cursor.left - e.touches[0].clientX);
        this.apply({ left });

        if (Math.abs(left - this.targetLeft) >= 75) {
          this.swipe = false;
          // navActions.prevImg();
          return;
        }
      }

      this.cursor.left = e.touches[0].clientX;
      return;
    }

    if (this.pinch) {
      this.handlePinch(e.touches);
    }
  }

  smoothReturn() {
    if (this.current.scale !== this.initial.scale) return;

    const nextLeft = (() => {
      let left = 0;
      if (this.current.left < this.targetLeft) {
        left = this.current.left + 8;
        if (left > this.targetLeft) {
          return this.targetLeft;
        }
      } else {
        left = this.current.left - 8;
        if (left < this.targetLeft) {
          return this.targetLeft;
        }
      }
      return left;
    })();

    this.apply({ left: nextLeft });

    if (nextLeft !== this.targetLeft) {
      requestAnimationFrame(this.smoothReturn);
    }
  }

  handleTouchEnd(e) {
    e.preventDefault();

    if (this.pan) {
      this.pan = false;
      clearInterval(this.ticker);

      if (
        this.kineticX.velocity > 10 || this.kineticX.velocity < -10 ||
        this.kineticY.velocity > 10 || this.kineticY.velocity < -10
      ) {
        this.kineticX.amplitude = 0.8 * this.kineticX.velocity;
        this.kineticY.amplitude = 0.8 * this.kineticY.velocity;

        this.kineticX.target = Math.round(this.kineticX.offset + this.kineticX.amplitude);
        this.kineticY.target = Math.round(this.kineticY.offset + this.kineticY.amplitude);

        this.timestamp = Date.now();
        requestAnimationFrame(this.autoScroll);
      }
    }

    if (this.swipe) {
      this.swipe = false;
      requestAnimationFrame(this.smoothReturn);
    }

    if (this.pinch) {
      this.pinch = false;
      this.distance = 0;
      this.distanceMove = 0;
    }

    if (this.lastTouchEnd && this.lastTouchEnd + 300 > e.timeStamp && this.same) {
      this.doubleTap();
    }

    this.lastTouchEnd = e.timeStamp;
  }
}
