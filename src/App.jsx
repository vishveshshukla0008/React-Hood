import React, { useState } from "react";
import json from "./data.json";
import { FaChevronCircleRight } from "react-icons/fa"; // band
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { AiOutlineFileAdd } from "react-icons/ai";
import { MdDeleteForever, MdOutlineCreateNewFolder } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";

const List = ({ list, setData, count = 0 }) => {
  const [open, setOpen] = useState({});
  const [inputOpen, setInputOpen] = useState({});

  function addNewItem(children, nodeName) {
    const { isFolder, name } = inputOpen[nodeName];

    const newItem = {
      id: 100,
      isFolder,
      name,
      children: [],
    };

    setData((prev) => {
      const updateChildren = (nodes) =>
        nodes.map((node) => {
          if (node.name === nodeName) {
            return {
              ...node,
              children: [...(node.children || []), newItem],
            };
          }

          return {
            ...node,
            children: node.children
              ? updateChildren(node.children)
              : node.children,
          };
        });

      return updateChildren(prev);
    });

    setInputOpen({});
  }

  console.log(list);

  // console.log(json);
  return (
    <div className={`container ${count === 0 ? "pl-4" : "pl-5"}`}>
      {list?.map((node) => (
        <div key={node.id}>
          {/* Only this row is a hover group */}
          <div className="cursor-pointer group/node flex items-center">
            {node.isFolder &&
              (open[node.name] ? (
                <IoIosArrowDropdownCircle
                  onClick={() =>
                    setOpen((prev) => ({
                      ...prev,
                      [node.name]: !prev[node.name],
                    }))
                  }
                  className="inline text-sm me-1 cursor-pointer"
                />
              ) : (
                <FaChevronCircleRight
                  onClick={() =>
                    setOpen((prev) => ({
                      ...prev,
                      [node.name]: true,
                    }))
                  }
                  className="inline text-xs me-1 cursor-pointer"
                />
              ))}

            <span>{node.name}</span>

            {/* Controls only show for hovered node */}
            <div className="controls ps-3 opacity-0 group-hover/node:opacity-100 transition-opacity">
              {node.isFolder && (
                <AiOutlineFileAdd
                  onClick={() =>
                    setInputOpen({ [node.name]: { isFolder: false, name: "" } })
                  }
                  className="inline text-xl me-1 text-blue-400"
                />
              )}

              {node.isFolder && (
                <MdOutlineCreateNewFolder
                  onClick={() =>
                    setInputOpen({ [node.name]: { isFolder: true, name: "" } })
                  }
                  className="inline text-xl me-1 text-green-300"
                />
              )}

              <MdDeleteForever className="inline text-xl text-red-400" />
            </div>
          </div>
          {inputOpen[node.name] && (
            <div className="input">
              <input
                onBlur={() => addNewItem(node?.children, node?.name)}
                className="bg-mist-500 px-3 rounded-md"
                type="text"
                onChange={(e) =>
                  setInputOpen((prev) => ({
                    ...prev,
                    [node.name]: { ...prev[node.name], name: e.target.value },
                  }))
                }
                placeholder={`${inputOpen[node.name].isFolder ? "folder" : "file"} name`}
              />
            </div>
          )}
          {/* Children are outside the hover group */}
          {open[node.name] && node.children && (
            <List list={node.children} count={count + 1} />
          )}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [data, setData] = useState(json);
  return (
    <div className="h-screen w-full bg-mist-900 text-white">
      <div className="explorer w-65 h-full bg-black">
        <div className="font-semibold text-lg p-3 border-b border-mist-900">
          Explorer
        </div>
        <List list={data} setData={setData} />
      </div>
    </div>
  );
};

export default App;
