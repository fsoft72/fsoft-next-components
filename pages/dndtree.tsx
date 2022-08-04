import DNDTree, { DNDTreeItem } from '../fsoft-components/DNDTree';

const tree: DNDTreeItem[] = [
	{
		id: 'A',
		label: 'A',
		isFolder: true,
		children: [
			{
				id: 'A1',
				label: 'A1',
				isFolder: false,
			},
			{
				id: 'A2',
				label: 'A2',
				isFolder: false,
			},
		],
	},
	{
		id: 'B',
		label: 'B',
		isFolder: true,
		children: [
			{
				id: 'B1',
				label: 'B1',
				isFolder: false,
			},
			{
				id: 'B2',
				label: 'B2',
				isFolder: false,
			}
		],
	},
];

const DNDTreeExamplePage = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', position: 'relative' }}>
			<h1 style={{ fontSize: '250%' }}>DNDTree Example</h1>
			<DNDTree
				tree={tree}
			/>
		</div>
	);
};

export default DNDTreeExamplePage;