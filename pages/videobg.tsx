import VideoBackground from '../fsoft-components/VideoBackground';

const VideoBackgroundExamplePage = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', position: 'relative' }}>
			<h1 style={{ fontSize: '250%' }}>Video Background Example</h1>
			<div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
				<VideoBackground src="D_vOqkEgmY0" />
			</div>
		</div>
	);
};

export default VideoBackgroundExamplePage;