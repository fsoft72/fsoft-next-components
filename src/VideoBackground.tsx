interface VideoBackgroundProps {
	src: string;

	title?: string;

	start?: number;
	width?: string;
	height?: string;
}

const VideoBackground = ( { title, width, height, src, start }: VideoBackgroundProps ) => {
	start = start || 0;
	width = width || '100%';
	height = height || '100%';
	title = title || '';

	return ( <div className="video-background">
		<iframe
			width="1920"
			height="1080"
			src={`https://www.youtube-nocookie.com/embed/${ src }?autoplay=1&controls=0&mute=1&loop=1&modestbranding=1&showinfo=0&start=${ start }&enablejsapi=1&&widgetid=3`}
			title={title}
			frameBorder="0"
			allow="autoplay; encrypted-media;" />
	</div> );
};

export default VideoBackground;