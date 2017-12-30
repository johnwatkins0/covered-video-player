import 'babel-polyfill';
import CoveredVideoPlayer from '../..';

window.addEventListener('load', function() {
  new CoveredVideoPlayer({
    selector: '#video-player',
    src: [
      {
        url:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video/mp4',
      },
    ],
    cover: '<div class="cover"><h1>This is the cover.</h1><h2>Play</h2></div>',
    fallbackCover:
      '<div class="cover"><h1>This is a fallback cover.</h1></div>',
  });
});
