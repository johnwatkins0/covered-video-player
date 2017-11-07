# covered-video-player

An HTML5 video player with any HTML superimposed as a play button.

[Example](https://johnwatkins0.github.io/covered-video-player/)

## Install

```
npm install covered-video-player
```
OR
```
yarn add covered-video-player
```

## Usage

Example:
```Javascript
import CoveredVideoPlayer from 'covered-video-player';

new CoveredVideoPlayer({ // Props.
	selector: '#video-container'
	src: [
		{
			url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
			type: 'video/mp4',
		},
	],
	cover: `<div class="cover">
		<h1>This is the cover.</h1>
		<h2>Play</h2>
	</div>`,
});
```

### props

Key | Type | Description | Required/Default
--- | --- | --- | ---
selector | string | A selector to pass to querySelector. | **required**
src | array | An array of objects used to build HTML `source` elements. Required keys for each object are `url` and `type`. | **required**
controls | bool | Show controls on the video? | default true
loop | bool | Make the video loop when played? | default false
muted | bool | Mute the video? | default true
cover | string | A string representation of HTML to use as the video cover. | default The innerHTML of the element selected by `selector`
fallbackCover | string | A string representation of HTML to use if rendering fails. | default ''
coverClass | string | A CSS class to apply to the cover. | default CoveredVideoPlayer__cover
videoContainerClass | string | A CSS class to apply to the div holding the video. | default CoveredVideoPlayer__video
