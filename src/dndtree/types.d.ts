import type { MutableRefObject, RefAttributes } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
export declare type TreeItem<T> = {
    children?: TreeItem<T>[];
    id: UniqueIdentifier;
    collapsed?: boolean;
    canHaveChildren?: boolean;
} & T;
export declare type TreeItems<T extends Record<string, any>> = TreeItem<T>[];
export declare type TreeItemComponentProps<T = {}> = {
    item: TreeItem<T>;
    parent: FlattenedItem<T> | null;
    childCount?: number;
    clone?: boolean;
    ghost?: boolean;
    collapsed?: boolean;
    depth: number;
    disableInteraction?: boolean;
    disableSelection?: boolean;
    disableSorting?: boolean;
    isLast: boolean;
    manualDrag?: boolean;
    hideCollapseButton?: boolean;
    disableCollapseOnItemClick?: boolean;
    showDragHandle?: boolean;
    handleProps?: any;
    indicator?: boolean;
    indentationWidth: number;
    style?: React.CSSProperties;
    onCollapse?(): void;
    onRemove?(): void;
    wrapperRef?(node: HTMLLIElement): void;
};
export declare type TreeItemComponentType<T, TElement extends HTMLElement> = React.FC<React.PropsWithChildren<TreeItemComponentProps<T> & RefAttributes<TElement>>>;
export declare type FlattenedItem<T> = {
    parentId: UniqueIdentifier | null;
    depth: number;
    index: number;
    isLast: boolean;
    parent: FlattenedItem<T> | null;
} & TreeItem<T>;
export declare type SensorContext<T> = MutableRefObject<{
    items: FlattenedItem<T>[];
    offset: number;
}>;
