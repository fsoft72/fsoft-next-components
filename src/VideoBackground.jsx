"use strict";
exports.__esModule = true;
var VideoBackground = function (_a) {
    var title = _a.title, width = _a.width, height = _a.height, src = _a.src, start = _a.start;
    start = start || 0;
    width = width || '100%';
    height = height || '100%';
    title = title || '';
    return (<div className="video-background">
		<iframe width="1920" height="1080" src={"https://www.youtube-nocookie.com/embed/".concat(src, "?autoplay=1&controls=0&mute=1&loop=1&modestbranding=1&showinfo=0&start=").concat(start, "&enablejsapi=1&&widgetid=3")} title={title} frameBorder="0" allow="autoplay; encrypted-media;"/>
	</div>);
};
exports["default"] = VideoBackground;
