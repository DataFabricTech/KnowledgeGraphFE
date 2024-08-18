import { NetworkDiagram } from "../network-diagram";
const QUALITATIVE_PALETTE = [
    "#636EFA",
    "#EF553B",
    "#00CC96",
    "#AB63FA",
    "#FFA15A",
    "#19D3F3",
    "#FF6692",
    "#B6E880",
];
const convert = (category) => {
    const nodes = [];
    const edges = [];
    _convert(category, nodes, edges, 0);
    return { nodes, edges };
};
const _convert = (category, nodes, edges, level, parentId, color) => {
    const currentColor = color || QUALITATIVE_PALETTE[0];
    const node = {
        id: category.id,
        labels: [{ text: category.name }],
        style: {
            backgroundColor: currentColor,
            outlineColor: currentColor,
            ...category.style,
        },
        width: 200 - level * 24,
        height: 200 - level * 24,
    };
    nodes.push(node);
    if (parentId) {
        const edge = {
            id: `${parentId}_${node.id}`,
            targets: [node.id],
            sources: [parentId],
        };
        edges.push(edge);
    }
    category.nodeList.forEach((node) => {
        nodes.push({
            id: node.id,
            labels: [{ text: node.name }],
            style: {
                backgroundColor: currentColor,
                outlineColor: currentColor,
                ...node.style,
            },
            width: 120,
            height: 120,
        });
        edges.push({
            id: `${category.id}_${node.id}`,
            targets: [node.id],
            sources: [category.id],
        });
    });
    category.children.forEach((item, i) => {
        let nextColor = currentColor;
        if (!color) {
            nextColor = QUALITATIVE_PALETTE[(i + 1) % QUALITATIVE_PALETTE.length];
        }
        _convert(item, nodes, edges, level + 1, category.id, nextColor);
    });
};
export class CategoryGraph {
    constructor({ container, categoryData, eventHandler, pixelQuality, }) {
        const { nodes, edges } = convert(categoryData);
        this._diagram = new NetworkDiagram({
            container,
            eventHandler,
            nodes,
            edges,
            pixelQuality,
            edgeLength: 300,
        });
    }
    cleanUp() {
        this._diagram.cleanUp();
    }
}
