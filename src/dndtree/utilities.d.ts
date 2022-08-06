import type { FlattenedItem, TreeItem, TreeItems } from './types';
import { UniqueIdentifier } from '@dnd-kit/core';
export declare function getProjection<T>(items: FlattenedItem<T>[], activeId: UniqueIdentifier | null, overId: UniqueIdentifier | null, dragOffset: number, indentationWidth: number): {
    depth: number;
    maxDepth: number;
    minDepth: number;
    parentId: UniqueIdentifier;
    parent: FlattenedItem<T>;
    isLast: boolean;
};
export declare function flattenTree<T>(items: TreeItems<T>): FlattenedItem<T>[];
export declare function buildTree<T>(flattenedItems: FlattenedItem<T>[]): TreeItems<T>;
export declare function findItem<T>(items: TreeItem<T>[], itemId: UniqueIdentifier): TreeItem<T>;
export declare function findItemDeep<T>(items: TreeItems<T>, itemId: UniqueIdentifier): TreeItem<T> | undefined;
export declare function removeItem<T>(items: TreeItems<T>, id: string): any[];
export declare function setProperty<TData, T extends keyof TreeItem<TData>>(items: TreeItems<TData>, id: string, property: T, setter: (value: TreeItem<TData>[T]) => TreeItem<TData>[T]): TreeItem<TData>[];
export declare function getChildCount<T>(items: TreeItems<T>, id: UniqueIdentifier): number;
export declare function removeChildrenOf<T>(items: FlattenedItem<T>[], ids: UniqueIdentifier[]): FlattenedItem<T>[];
