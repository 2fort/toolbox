import * as core from './core';

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
      left: 0, top: 0, width: 0, height: 0, scale: 0,
    };
    this.cursor = { left: 0, top: 0 };
    this.mouseMove = false;

    this.init(this.img);

    this.handleWheel = this.handleWheel.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.img.addEventListener('wheel', this.handleWheel);
    this.img.addEventListener('mousedown', this.handleMouseDown);
    this.img.addEventListener('dblclick', this.handleDoubleClick);

    this.container.addEventListener('mousemove', this.handleMouseMove);
    this.container.addEventListener('mouseup', this.handleMouseUp);
    this.container.addEventListener('mouseleave', this.handleMouseUp);
  }

  init(img) {
    const containerBox = this.container.getBoundingClientRect();
    const params = core.adjust(img.naturalWidth, img.naturalHeight, containerBox.width, containerBox.height, 0);
    this.apply(params);
    this.img.style.visibility = 'visible';

    this.initial = getInitialValues({ ...params, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight });
  }

  destroy() {
    this.img.removeEventListener('wheel', this.handleWheel);
    this.img.removeEventListener('mousedown', this.handleMouseDown);
    this.img.removeEventListener('dblclick', this.handleDoubleClick);

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
    const currentPos = this.container.getBoundingClientRect();
    return {
      clientX: clientX - currentPos.left,
      clientY: clientY - currentPos.top,
      containerWidth: currentPos.width,
      containerHeight: currentPos.height,
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
}
