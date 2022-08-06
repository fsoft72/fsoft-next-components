import { HTMLAttributes } from 'react';
import type { FlattenedItem, TreeItem, TreeItemComponentType } from './types';
import { UniqueIdentifier } from '@dnd-kit/core';
export interface TreeItemProps<T> extends HTMLAttributes<HTMLLIElement> {
    childCount?: number;
    clone?: boolean;
    collapsed?: boolean;
    depth: number;
    disableInteraction?: boolean;
    disableSelection?: boolean;
    ghost?: boolean;
    handleProps?: any;
    indicator?: boolean;
    indentationWidth: number;
    item: TreeItem<T>;
    isLast: boolean;
    parent: FlattenedItem<T> | null;
    onCollapse?(id: UniqueIdentifier): void;
    onRemove?(id: UniqueIdentifier): void;
    wrapperRef?(node: HTMLLIElement): void;
}
declare type SortableTreeItemProps<T, TElement extends HTMLElement> = TreeItemProps<T> & {
    id: string;
    TreeItemComponent: TreeItemComponentType<T, TElement>;
    disableSorting?: boolean;
};
export declare const SortableTreeItem: <T, TElement extends HTMLElement>({ id, depth, isLast, TreeItemComponent, parent, disableSorting, ...props }: SortableTreeItemProps<T, TElement>) => JSX.Element;
export {};
