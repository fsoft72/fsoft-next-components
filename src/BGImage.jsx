"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var BGImage = function (_a) {
    var src = _a.src;
    return <image_1.default style={{ zIndex: -1, userSelect: 'none' }} src={src} layout="fill" objectFit="cover" objectPosition="center" alt=""/>;
};
exports["default"] = BGImage;
