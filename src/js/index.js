class CoveredVideoPlayer {
  constructor(props) {
    this.setUp(props);

    this.appendSourceToVideoElement = this.appendSourceToVideoElement.bind(this);
    this.handleVideoClick = this.handleVideoClick.bind(this);

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
    height,
    width,
    onPlay,
    onPause,
    minWindowWidth,
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
      this.height = typeof height === 'undefined' ? null : height;
      this.width = typeof width === 'undefined' ? null : width;
      this.onPlay = typeof onPlay === 'undefined' ? () => null : onPlay;
      this.onPause = typeof onPause === 'undefined' ? () => null : onPause;
      this.minWindowWidth = typeof minWindowWidth === 'undefined' ? 0 : Number(minWindowWidth);
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
				padding: 0;
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
				display: block;
      }
    `;

    document.querySelector('head').appendChild(styles);
  }

  shouldRender() {
    return (
      window.innerWidth > this.minWindowWidth &&
      'HTMLVideoElement' in window &&
      'CSS' in window &&
      'supports' in CSS &&
      CSS.supports('pointer-events', 'none') &&
      this.root &&
      this.src.length
    );
  }

  handleVideoClick(event) {
    event.preventDefault(); // Some browsers have default video.pause() behavior.

    if (this.videoElement.paused === true) {
      this.videoElement.play();
    } else {
      this.videoElement.pause();
    }
  }

  addEventListeners() {
    this.videoElement.addEventListener('click', this.handleVideoClick);
    this.videoElement.addEventListener('touchstart', this.handleVideoClick);
    this.coverElement.addEventListener('keypress', this.handleVideoClick);

    this.videoElement.addEventListener('play', () => {
      this.root.classList.add('playing');
      this.onPlay();
    });

    this.videoElement.addEventListener('pause', () => {
      this.root.classList.remove('playing');
      this.onPause();
    });

    this.videoElement.addEventListener('canplay', () => {
      this.root.innerHTML = '';
      this.root.appendChild(this.videoContainer);
      this.root.appendChild(this.coverElement);
    });

    if (this.loop !== true) {
      this.videoElement.addEventListener('ended', () => {
        this.root.classList.remove('playing');
        this.onPause();
      });
    }
  }

  appendSourceToVideoElement(src) {
    try {
      const sourceElement = document.createElement('SOURCE');
      sourceElement.setAttribute('src', src.url);
      sourceElement.setAttribute('type', src.type);
      this.videoElement.appendChild(sourceElement);
    } catch (e) {
      // Do nothing.
    }
  }

  maybeRenderFallback() {
    if (this.root && (this.fallbackCover.length || this.cover.length)) {
      this.root.classList.add('fallback');
      this.root.innerHTML = this.fallbackCover || this.cover;
      this.root.removeAttribute('id');
    }
  }

  createVideoElement() {
    this.videoElement = document.createElement('VIDEO');

    if (this.controls) {
      this.videoElement.setAttribute('controls', true);
    }

    if (this.loop) {
      this.videoElement.setAttribute('loop', true);
    }

    if (this.muted) {
      this.videoElement.setAttribute('muted', true);
    }

    if (this.height) {
      this.videoElement.setAttribute('height', this.height);
    }
    if (this.width) {
      this.videoElement.setAttribute('width', this.width);
    }
    this.src.forEach(this.appendSourceToVideoElement);
  }

  createCoverElement() {
    this.coverElement = document.createElement('BUTTON');
    this.coverElement.innerHTML = this.cover;
    this.coverElement.setAttribute('class', `${this.coverClass}`);
  }

  createVideoContainer() {
    this.videoContainer = document.createElement('DIV');
    this.videoContainer.appendChild(this.videoElement);
    this.videoContainer.setAttribute('class', `${this.videoContainerClass}`);
  }

  render() {
    this.createVideoElement();
    this.createCoverElement();
    this.createVideoContainer();
  }
}

export default CoveredVideoPlayer;
