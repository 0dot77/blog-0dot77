import { visit } from "unist-util-visit";
import type { Root, PhrasingContent } from "mdast";

const MARK_RE = /==(.+?)==/g;

export default function remarkMark() {
  return (tree: Root) => {
    visit(tree, "text", (node, index, parent) => {
      if (index === undefined || !parent) return;

      const matches = [...node.value.matchAll(MARK_RE)];
      if (matches.length === 0) return;

      const children: PhrasingContent[] = [];
      let last = 0;

      for (const m of matches) {
        const start = m.index!;
        if (start > last) {
          children.push({ type: "text", value: node.value.slice(last, start) });
        }
        children.push({
          type: "html",
          value: `<mark>${m[1]}</mark>`,
        } as unknown as PhrasingContent);
        last = start + m[0].length;
      }

      if (last < node.value.length) {
        children.push({ type: "text", value: node.value.slice(last) });
      }

      parent.children.splice(index, 1, ...children);
    });
  };
}
