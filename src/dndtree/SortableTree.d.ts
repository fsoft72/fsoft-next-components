/// <reference types="react" />
import { PointerSensorOptions } from '@dnd-kit/core';
import type { TreeItemComponentType, TreeItems } from './types';
export declare type SortableTreeProps<TData, TElement extends HTMLElement> = {
    items: TreeItems<TData>;
    TreeItemComponent: TreeItemComponentType<TData, TElement>;
    indentationWidth?: number;
    indicator?: boolean;
    pointerSensorOptions?: PointerSensorOptions;
    disableSorting?: boolean;
    maxDepth?: number;
    onItemsChanged(items: TreeItems<TData>): void;
    onBeforeDrop?(active: TData, over: TData, newDepth: number): boolean;
};
export declare function SortableTree<TreeItemData, TElement extends HTMLElement = HTMLDivElement>({ items, indicator, indentationWidth, pointerSensorOptions, disableSorting, maxDepth, TreeItemComponent, onItemsChanged, onBeforeDrop, ...rest }: SortableTreeProps<TreeItemData, TElement>): JSX.Element;
