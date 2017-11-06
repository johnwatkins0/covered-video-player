class CoveredVideoPlayer {
  constructor(props) {
    this.setUp(props);

    this.appendSourceToVideoElement = this.appendSourceToVideoElement.bind(this);

    this.run();
  }

  run() {
    if (this.shouldRender()) {
      this.putStylesInHead();
      this.render();
      this.addEventListeners();
    } else {
      this.maybeRenderFallback();
    }
  }

  setUp({
    selector,
    src,
    controls,
    loop,
    cover,
    coverClass,
    videoContainerClass,
    muted,
    fallbackCover,
  }) {
    try {
      this.selector = selector;
      this.root = document.querySelector(selector);
      this.cover = cover || this.root.innerHTML;
      this.fallbackCover = fallbackCover || '';
      this.coverClass = coverClass || 'CoveredVideoPlayer__cover';
      this.videoContainerClass = videoContainerClass || 'CoveredVideoPlayer__video';
      this.src = src;
      this.controls = typeof controls === 'undefined' ? true : controls;
      this.loop = typeof loop === 'undefined' ? false : loop;
      this.muted = typeof muted === 'undefined' ? true : muted;
    } catch (e) {
      this.maybeRenderFallback();
    }
  }

  putStylesInHead() {
    const styles = document.createElement('STYLE');

    styles.innerHTML = `
      ${this.selector} {
        position: relative;
      }

      .${this.coverClass} {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        transition: opacity .4s;
        background: none;
        border: none;
        display: block;
        width: 100%;
        pointer-events: none;
      }

      ${this.selector}.playing .${this.coverClass} {
        display: none;
      }

      @supports (opacity: 0) {
        ${this.selector}.playing .${this.coverClass} {
          display: block;
          opacity: 0;
        }
      }

      .${this.videoContainerClass} video {
        width: 100%;
        height: auto;
        position: relative;
        z-index: 1;
        cursor: pointer;
      }
    `;

    document.querySelector('head').append(styles);
  }

  shouldRender() {
    return (
      'HTMLVideoElement' in window &&
      'CSS' in window &&
      'supports' in CSS &&
      CSS.supports('pointer-events', 'none') &&
      this.root &&
      this.src.length
    );
  }

  addEventListeners() {
    this.videoElement.addEventListener('click', () => {
      if (this.videoElement.paused) {
        this.videoElement.play();
      } else {
        this.videoElement.pause();
      }
    });

    this.videoElement.addEventListener('play', () => {
      this.root.classList.add('playing');
    });

    this.videoElement.addEventListener('pause', () => {
      this.root.classList.remove('playing');
    });

    if (this.loop) {
      this.videoElement.addEventListener('ended', () => {
        this.root.classList.remove('playing');
      });
    }
  }

  appendSourceToVideoElement(src) {
    try {
      const sourceElement = document.createElement('SOURCE');
      sourceElement.setAttribute('src', src.url);
      sourceElement.setAttribute('type', src.type);
      this.videoElement.append(sourceElement);
    } catch (e) {
      this.maybeRenderFallback();
    }
  }

  maybeRenderFallback() {
    if (this.root && (this.fallbackCover || this.cover)) {
      this.root.classList.add('fallback');
      this.root.innerHTML = this.fallbackCover || this.cover;
    }
  }

  createVideoElement() {
    this.videoElement = document.createElement('VIDEO');
    this.videoElement.setAttribute('controls', this.controls);
    this.videoElement.setAttribute('loop', this.loop);
    this.videoElement.setAttribute('muted', this.muted);
    [...this.src].forEach(this.appendSourceToVideoElement);
  }

  createCoverElement() {
    this.coverElement = document.createElement('BUTTON');
    this.coverElement.innerHTML = this.cover;
    this.coverElement.setAttribute('class', 'CoveredVideoPlayer__cover');
  }

  createVideoContainer() {
    this.videoContainer = document.createElement('DIV');
    this.videoContainer.append(this.videoElement);
    this.videoContainer.setAttribute('class', 'CoveredVideoPlayer__video');
  }

  render() {
    this.createVideoElement();
    this.createCoverElement();
    this.createVideoContainer();

    this.root.innerHTML = '';
    this.root.append(this.coverElement);
    this.root.append(this.videoContainer);
  }
}

export default CoveredVideoPlayer;
