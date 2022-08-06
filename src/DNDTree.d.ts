/// <reference types="react" />
export declare type DNDTreeItem = {
    id: string;
    label: string;
    isFolder?: boolean;
    children?: DNDTreeItem[];
    level?: number;
    parent?: string | null;
    isDroppable?: boolean;
    isDraggable?: boolean;
};
interface DNDTreeProps {
    tree: DNDTreeItem[];
}
declare const DNDTree: ({ tree }: DNDTreeProps) => JSX.Element;
export default DNDTree;
