import PropTypes from 'prop-types';

import { putStylesInHead } from './putStylesInHead';

class CoveredVideoPlayer {
  handleVideoClick = this.handleVideoClick.bind(this);
  handleVideoStart = this.handleVideoStart.bind(this);
  handleVideoStop = this.handleVideoStop.bind(this);

  static propTypes = {
    selector: PropTypes.string.isRequired,
    src: PropTypes.array.isRequired,
    root: PropTypes.objectOf(PropTypes.any),
    cover: PropTypes.string,
    fallbackCover: PropTypes.string,
    coverClass: PropTypes.string,
    videoContainerClass: PropTypes.string,
    controls: PropTypes.bool,
    loop: PropTypes.bool,
    muted: PropTypes.bool,
    height: PropTypes.string,
    width: PropTypes.string,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    minWindowWidth: PropTypes.number,
  };

  static defaultProps = {
    fallbackCover: '',
    coverClass: 'CoveredVideoPlayer__cover',
    videoContainerClass: 'CoveredVideoPlayer__video',
    controls: true,
    loop: false,
    muted: false,
    minWindowWidth: 0,
    onPlay: () => null,
    onPause: () => null,
  };

  /**
   * Should the element be rendered?
   * @param {Object} root The root element.
   * @param {number} minWindowWidth The minimum width prop set by the user.
   * @param {array} src The array of video src.
   * @return {bool} Whether the element should render.
   */
  static shouldRun = ({ root, minWindowWidth, src }) =>
    window.innerWidth > minWindowWidth &&
    'HTMLVideoElement' in window &&
    'CSS' in window &&
    'supports' in CSS &&
    CSS.supports('pointer-events', 'none') &&
    root &&
    src.length;

  /**
   * Adds a source element to a video element.
   * @param {Object} src A video source object.
   * @param {Object} videoElement
   */
  static appendSourceToVideo = ({ src, videoElement }) => {
    const sourceElement = document.createElement('SOURCE');
    sourceElement.setAttribute('src', src.url);
    sourceElement.setAttribute('type', src.type);
    videoElement.appendChild(sourceElement);
  };

  /**
   * Adds attributes to a video element.
   * @param {Object} props
   * @param {Object} videoElement
   */
  static addVideoAttributes = ({ props, videoElement }) => {
    ['controls', 'loop', 'muted'].forEach(attribute => {
      if (attribute in props) {
        videoElement.setAttribute(props[attribute], true);
      }
    });

    ['height', 'width'].forEach(attribute => {
      if (attribute in props) {
        videoElement.setAttribute(attribute, props[attribute]);
      }
    });
  };

  /**
   * Creates a video element for user settings.
   * @param {Object} props
   * @return {Object} The video element.
   */
  static createVideoElement = props => {
    const videoElement = document.createElement('VIDEO');
    CoveredVideoPlayer.addVideoAttributes({ props, videoElement });
    props.src.forEach(source =>
      CoveredVideoPlayer.appendSourceToVideo({ src: source, videoElement }),
    );

    return videoElement;
  };

  /**
   * Creates the element overlapping the video, which acts as a button.
   * @param {string} cover The cover HTML.
   * @param {string} coverClass A cover CSS class.
   * @return {Object} The created element.
   */
  static createCoverElement = ({ cover, coverClass }) => {
    const coverElement = document.createElement('BUTTON');
    coverElement.innerHTML = cover;
    coverElement.setAttribute('class', coverClass);

    return coverElement;
  };

  /**
   * Creates a container element.
   * @param {Object} videoElement The already-created video element.
   * @param {string} videoContainerClass A CSS class to go on the video container.
   * @return {Object} The created element.
   */
  static createVideoContainer = (videoElement, { videoContainerClass }) => {
    const videoContainer = document.createElement('DIV');
    videoContainer.appendChild(videoElement);
    videoContainer.setAttribute('class', videoContainerClass);

    return videoContainer;
  };

  /**
   * Render a fallback element if a cover exists.
   * @param {Object} root The root element.
   * @param {string} fallbackCover HTML.
   * @param {string} cover HTML.
   */
  static maybeRenderFallback = ({ root, fallbackCover, cover }) => {
    if (root && (fallbackCover.length || cover.length)) {
      root.classList.add('fallback');
      root.innerHTML = fallbackCover.length ? fallbackCover : cover;
      root.removeAttribute('id');
    }
  };

  /**
   * Initiates the class object.
   * @param {Object} props The user-passed props.
   */
  constructor(props) {
    this.props = Object.assign({}, props);
    this.init();
  }

  /**
   * Performs setup.
   */
  init() {
    PropTypes.checkPropTypes(
      CoveredVideoPlayer.propTypes,
      this.props,
      'prop',
      'CoveredVideoPlayer',
    );

    this.addDefaultProps();
    this.maybeStart();
  }

  /**
   * Starts the script or calls the fallback function.
   */
  maybeStart() {
    if (CoveredVideoPlayer.shouldRun(this.props)) {
      this.run();
    } else {
      CoveredVideoPlayer.maybeRenderFallback(this.props);
    }
  }

  /**
   * Adds necessary props not passed by the user.
   */
  addDefaultProps() {
    this.props = Object.assign({}, CoveredVideoPlayer.defaultProps, this.props);
    this.props.root = document.querySelector(this.props.selector);
    this.props.cover = this.props.cover || this.props.root.innerHTML;
  }

  /**
   * Calls main functions to render the element.
   */
  run() {
    putStylesInHead(this.props);
    this.render();
    this.addEventListeners();
  }

  /**
   * Handles a user click on the video.
   * @param {Object} event The click event.
   */
  handleVideoClick(event) {
    event.preventDefault(); // Some browsers have default video.pause() behavior.

    if (this.videoElement.paused === true) {
      this.videoElement.play();
    } else {
      this.videoElement.pause();
    }
  }

  /**
   * Performs actions on video start.
   */
  handleVideoStart() {
    this.props.root.classList.add('playing');
    this.props.onPlay();
  }

  /**
   * Performs actions on video stop.
   */
  handleVideoStop() {
    this.props.root.classList.remove('playing');
    this.props.onPause();
  }

  /**
   * Adds click-related listeners to the video and cover.
   */
  addClickListeners() {
    this.videoElement.addEventListener('click', this.handleVideoClick);
    this.videoElement.addEventListener('touchstart', this.handleVideoClick);
    this.coverElement.addEventListener('keypress', this.handleVideoClick);
  }

  /**
   * Adds listeners related to the video's playing and pausing.
   */
  addVideoListeners() {
    this.videoElement.addEventListener('play', this.handleVideoStart);
    this.videoElement.addEventListener('pause', this.handleVideoStop);

    if (this.props.loop !== true) {
      this.videoElement.addEventListener('ended', this.handleVideoStop);
    }
  }

  /**
   * Calls functions that add listeners.
   */
  addEventListeners() {
    this.addClickListeners();
    this.addVideoListeners();
  }

  /**
   * Performs the main steps to create elements and put them in the DOM.
   */
  render() {
    this.videoElement = CoveredVideoPlayer.createVideoElement(this.props);
    this.coverElement = CoveredVideoPlayer.createCoverElement(this.props);
    const videoContainer = CoveredVideoPlayer.createVideoContainer(
      this.videoElement,
      this.props,
    );

    this.props.root.innerHTML = '';
    this.props.root.appendChild(videoContainer);
    this.props.root.appendChild(this.coverElement);
  }
}

export default CoveredVideoPlayer;
