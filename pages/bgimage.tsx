import BGImage from '../fsoft-components/BGImage';

const BGImageExamplePage = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100vh', position: 'relative' }}>
			<BGImage src="/bg/vbg01.jpg" />

			<div style={{ border: '1px solid yellow', position: 'relative', width: '49%', height: '100%' }}>
				<h1>Hello World</h1>
				<BGImage src="/bg/bg01.jpg" />
			</div>

			<div style={{ position: 'relative', height: '40%', width: '100%' }}>
				<BGImage src="/bg/bg02.jpg" />
				<h2>Cruel World</h2>
			</div>
		</div>
	);
};

export default BGImageExamplePage;