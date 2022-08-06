/// <reference types="react" />
interface VideoBackgroundProps {
    src: string;
    title?: string;
    start?: number;
    width?: string;
    height?: string;
}
declare const VideoBackground: ({ title, width, height, src, start }: VideoBackgroundProps) => JSX.Element;
export default VideoBackground;
