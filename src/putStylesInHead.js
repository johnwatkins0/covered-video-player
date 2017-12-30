export const putStylesInHead = ({
  selector,
  coverClass,
  videoContainerClass,
}) => {
  const styles = document.createElement('STYLE');

  styles.innerHTML = `
    ${selector} {
      position: relative;
      min-height: 320px;
      overflow: hidden;
    }

    .${coverClass} {
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
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ${selector}.playing .${coverClass} {
      display: none;
    }

    @supports (opacity: 0) {
      ${selector}.playing .${coverClass} {
        display: block;
        opacity: 0;
      }
    }

    .${videoContainerClass} {
      min-height: 320px;
      background: black;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .${videoContainerClass} video {
      width: 100%;
      height: auto;
      position: relative;
      z-index: 1;
      cursor: pointer;
      display: block;
    }
  `;

  document.querySelector('head').appendChild(styles);
};
