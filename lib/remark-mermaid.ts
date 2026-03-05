type MdastNode = {
  type: string;
  lang?: string;
  value?: string;
  children?: MdastNode[];
  [key: string]: unknown;
};

/**
 * Remark plugin: convert ```mermaid fences into <DynamicMermaid chart="..." />
 * at the MDAST level — before rehype-highlight runs, so it never sees mermaid.
 */
export function remarkMermaid() {
  return (tree: MdastNode) => {
    walkTree(tree);
  };
}

function walkTree(node: MdastNode) {
  if (!node.children) {
    return;
  }
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.type === "code" && child.lang === "mermaid" && child.value) {
      // Replace with MDX JSX flow element <DynamicMermaid chart="..." />
      node.children[i] = {
        type: "mdxJsxFlowElement",
        name: "DynamicMermaid",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "chart",
            value: child.value,
          },
        ],
        children: [],
      };
    } else {
      walkTree(child);
    }
  }
}
