import "./LBacc.css";
import React, { useEffect } from "react";
// import Dropdown from "../components/Dropdwon";
import Accordion from "./Accordion";
// import CheckboxForm from "./CheckboxForm";
import useInfo from "../hooks/use-info";
// import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

const LBacc = () => {
  const { setInfo, isSelect } = useInfo();

  useEffect(() => {
    !isSelect &&
      setInfo((prev) => ({
        ...prev,
        roadNo: { ...prev.roadNo, selected: null },
      }));
  }, [isSelect, setInfo]);

  ///////////////////////////////////////////////////////////////
  //   const checklist = [
  //     {
  //       name: "차로수별",
  //       options: ["1차선", "2차선", "4차선", "5-8차선", "9차선이상"],
  //       updateInfo: (sel, chb) =>
  //         setInfo((prev) => ({
  //           ...prev,
  //           laneOps: { ...prev.laneOps, selected: sel, checkboxes: chb },
  //         })),
  //     },
  //     {
  //         name: "위험도",
  //         options: ["매우 높음", "높음", "보통", "낮음", "매우 낮음"],
  //         updateInfo: (sel, chb) =>
  //           setInfo((prev) => ({
  //             ...prev,
  //             laneOps: { ...prev.laneOps, selected: sel, checkboxes: chb },
  //           })),
  //       },
  //   ];

  //   const roadOps = [
  //     [1, "목포-신의주"],
  //     [2, "신안-부산"],
  //   ];

  //   const roadStatusItems = [
  //     {
  //       id: "국도번호별",
  //       label: "- 국도번호별",
  //       content: (
  //         <div>
  //           <div className="roadNo" onClick={() => setIsSelect(!isSelect)}>
  //             <div>
  //               {info.roadNo.selected && info.roadNo.selected.length !== 0
  //                 ? info.roadNo.selected.length > 9
  //                   ? info.roadNo.selected.slice(0, 9).join(",") + "..."
  //                   : info.roadNo.selected.join(",")
  //                 : "선택"}
  //             </div>
  //             {isSelect ? <GoTriangleUp /> : <GoTriangleDown />}
  //           </div>
  //           {isSelect && <Dropdown options={roadOps} />}
  //         </div>
  //       ),
  //     },
  //     {
  //       id: "차로수별",
  //       label: "- 차로수별",
  //       content: (
  //         <div className="lane roadItem">
  //           <CheckboxForm name={"차로수별"} checklist={checklist} />
  //         </div>
  //       ),
  //     },
  //   ];

  //   const tmsItems = [
  //     {
  //       id: "교통량구간",
  //       label: "- 예측 교통량",
  //       content: (
  //         <div className="roadItem">
  //           <CheckboxForm name={"AADT관점"} checklist={checklist} />
  //         </div>
  //       ),
  //     },
  //     {
  //       id: "교통량지점",
  //       label: "- 교통량 측정 지점",
  //       content: (
  //         <div className="roadItem">
  //           <CheckboxForm name={"AADTDOT관점"} checklist={checklist} />
  //         </div>
  //       ),
  //     },
  //   ];
  ///////////////////////////////////////////////////////////////
  const items = [
    {
      id: "도로사고",
      label: "도로구간 사고위험도",
      content: (
        <div>
          <div>도로컨텐츠</div>
          {/* <CheckboxForm name={"도로위험도"} /> */}
        </div>
      ),
    },
    {
      id: "교차사고",
      label: "교차로 사고위험도",
      content: (
        <div>
          <div>교차로컨텐츠</div>
          {/* <CheckboxForm name={"교차로위험도"} /> */}
        </div>
      ),
    },
  ];
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="detail_div">
        <div className="accordion_div">
          <Accordion items={items} />
        </div>
      </div>
    </div>
  );
};

export default LBacc;
