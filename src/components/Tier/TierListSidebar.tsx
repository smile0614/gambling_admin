import React, { useState } from "react";
import cn from "classnames";

interface Node {
  id: string;
  name: string;
  role: number;
  children?: Node[];
}

const TierListView = ({
  data,
  selected,
  setSelected,
}: {
  data: Node[];
  selected: string;
  setSelected: (val: string) => void;
}) => {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  const handleToggle = (nodeId: string) => {
    setSelected(nodeId);
    setExpandedNodes((prevExpanded) =>
      prevExpanded.includes(nodeId)
        ? prevExpanded.filter((id) => id !== nodeId)
        : [...prevExpanded, nodeId],
    );
  };

  const isNodeExpanded = (nodeId: string) => {
    return expandedNodes.includes(nodeId);
  };

  const renderTree = (nodes: Node[]) => {
    return nodes.map((node) => (
      <li key={node.id} className="">
        <div
          className={cn(
            `group relative flex cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2 text-[18px] font-medium duration-300 ease-in-out items-center`,
            {
              "font-semibold": isNodeExpanded(node.id) && node.children,
              "text-black dark:text-white": selected === node.id,
              // "text-[limegreen]": node.role === 3,
              // "text-[orange]": node.role === 4,
              // "text-[deepskyblue]": node.role === 5,
            },
          )}
          onClick={() => setSelected(node.id)}
        >
          {node.children && node.children.length > 0 && (
            <div
              className="absolute left-2 top-1/2 -translate-y-1/2 fill-current text-lg"
              onClick={() => handleToggle(node.id)}
            >
              {isNodeExpanded(node.id) ? "-" : "+"}
            </div>
            
          )}
          <span className="pl-6">{node.name}</span>
        </div>
        {node.children &&
          node.children.length > 0 &&
          isNodeExpanded(node.id) && (
            <ul className="mb-2.5 mt-2 flex flex-col pl-8">
              {renderTree(node.children)}
            </ul>
          )}
      </li>
    ));
  };

  return (
    <aside
      className={`sticky left-0 top-0 z-9 flex h-screen w-full flex-col overflow-y-hidden rounded-md border border-stroke bg-white shadow-default duration-300 dark:border-strokedark dark:bg-boxdark lg:translate-x-0`}
    >
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="px-4 py-4 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">{renderTree(data)}</ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default TierListView;
