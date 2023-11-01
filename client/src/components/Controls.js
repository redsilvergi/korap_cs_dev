import "./Controls.css";
import React from "react";
import useInfo from "../hooks/use-info";
import { GiExpand } from "react-icons/gi";
import { BiHide } from "react-icons/bi";

const Controls = ({ setView, INITIAL_VIEW_STATE }) => {
  const {
    isFilter,
    setIsFilter,
    view,
    depth1,
    depth2,
    info,
    taasInfo,
    tmsInfo,
  } = useInfo();

  return (
    <div className="toggle_button_div">
      <button
        className="toggle_button"
        onClick={() =>
          setView((prev) => {
            return {
              ...prev,
              zoom: prev.zoom < 20 ? prev.zoom + 1 : prev.zoom,
            };
          })
        }
      >
        +
      </button>
      <button
        className="toggle_button"
        onClick={() =>
          setView((prev) => ({
            ...prev,
            zoom: prev.zoom > 0.87 ? prev.zoom - 1 : prev.zoom,
          }))
        }
      >
        -
      </button>
      <button
        className="toggle_button"
        onClick={() => setView(INITIAL_VIEW_STATE)}
      >
        <GiExpand />
      </button>

      <button className="toggle_button" onClick={() => setIsFilter(!isFilter)}>
        <BiHide />
      </button>
      <button
        className="toggle_button"
        onClick={() =>
          console.log(
            "\nview:",
            view,
            "\ndepth1:",
            "\n",
            depth1,
            "\ndepth2:",
            "\n",
            depth2,
            "\ninfo:",
            info,
            "\ntaasInfo:",
            "\n",
            taasInfo,
            "\ntmsInfo:",
            "\n",
            tmsInfo
          )
        }
      >
        VS
      </button>
    </div>
  );
};

export default Controls;
