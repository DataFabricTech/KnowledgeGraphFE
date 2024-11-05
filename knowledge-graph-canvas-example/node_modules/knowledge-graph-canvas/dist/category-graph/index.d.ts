import { NetworkDiagramNodeStyle } from "../network-diagram/node/node.type";
import { EventHandler } from "../network-diagram/windowLayer/windowLayer";
import { GlobalStyle, PixelQuality } from "../network-diagram/index.type";
import { EdgeStyle } from "../network-diagram/edge/edge.type";
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
    isFitScreenInit?: boolean;
    edgeStyle?: Partial<EdgeStyle>;
    globalStyle?: Partial<GlobalStyle>;
};
export declare class CategoryGraph {
    private _diagram;
    constructor({ container, categoryData, eventHandler, pixelQuality, isFitScreenInit, edgeStyle, globalStyle, }: CategoryGraphProps);
    cleanUp(): void;
}
