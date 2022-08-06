import Image from 'next/image';

interface BGImageProps {
	src: string;
}

const BGImage = ( { src }: BGImageProps ) => {
	return <Image
		style={{ zIndex: -1, userSelect: 'none' }}
		src={src}
		layout="fill"
		objectFit="cover"
		objectPosition="center"
		alt=""
	/>;
};

export default BGImage;