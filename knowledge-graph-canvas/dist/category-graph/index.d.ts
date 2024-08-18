import { NetworkDiagramNodeStyle } from "../network-diagram/node/node.type";
import { EventHandler } from "../network-diagram/windowLayer/windowLayer";
import { PixelQuality } from "../network-diagram/index.type";
export type CategoryNode = {
    id: string;
    name: string;
    style?: Partial<NetworkDiagramNodeStyle>;
};
export type Category = CategoryNode & {
    children: Category[];
    nodeList: CategoryNode[];
};
export type CategoryGraphProps = {
    container: HTMLDivElement;
    categoryData: Category;
    eventHandler?: Partial<EventHandler>;
    pixelQuality?: PixelQuality;
};
export declare class CategoryGraph {
    private _diagram;
    constructor({ container, categoryData, eventHandler, pixelQuality, }: CategoryGraphProps);
    cleanUp(): void;
}
