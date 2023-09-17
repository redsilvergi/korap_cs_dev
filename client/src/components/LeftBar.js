import "./LeftBar.css";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "../components/Dropdwon";
import Accordion from "./Accordion";
import CheckboxForm from "./CheckboxForm";
import useInfo from "../hooks/use-info";
import Modal from "./Modal";
// import PdfViewer from "./PdfViewer";
import { CgFileDocument } from "react-icons/cg";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import guide from "../img/guide.PNG";

const LeftBar = ({ setData, setLD, setIsFilter }) => {
  const {
    info,
    setInfo,
    isSelect,
    setIsSelect,
    setTaasInfo,
    // taasInfo,
    // depth1,
    // depth2,
  } = useInfo();
  //Modal/////////////////////////////////////////////////////////////
  const [showModal, setShowModal] = useState(false);

  const handleModOpen = () => {
    setShowModal(true);
  };

  const handleModClose = () => {
    setShowModal(false);
  };

  const modal = (
    <Modal onClose={handleModClose}>
      <img src={guide} alt="guide1" height="400%" />
    </Modal>
  );

  ///////////////////////////////////////////////////////////////
  useEffect(() => {
    !isSelect &&
      setInfo((prev) => ({
        ...prev,
        roadNo: { ...prev.roadNo, selected: null },
      }));
  }, [isSelect, setInfo]);

  const fetchData = useCallback(async () => {
    setLD(true);
    try {
      const [nroadRes, emiRes, vpRes, ppRes, bpRes] = await Promise.all([
        axios.get("/nr_sorted.geojson"),
        axios.get("/emi_sorted.geojson"),
        axios.get("/vcount_sorted.geojson"),
        axios.get("/pcount_sorted.geojson"),
        axios.get("/bcount_sorted.geojson"),
      ]);

      setData((prev) => ({
        ...prev,
        nroad: nroadRes.data,
        emiroad: emiRes.data,
        vpoint: vpRes.data,
        ppoint: ppRes.data,
        bpoint: bpRes.data,
      }));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLD(false);
      setIsFilter(true);
    }
  }, [setData, setIsFilter, setLD]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const roadOps = [
    [1, "목포-신의주"],
    [2, "신안-부산"],
    [3, "남해-초산"],
    [4, "부안-경주"],
    [5, "통영-중강진"],
    [6, "인천-강릉"],
    [7, "부산-온성"],
    [13, "완도-금산"],
    [14, "거제-포항"],
    [15, "고흥-남원"],
    [17, "여수-광주"],
    [18, "진도-구례"],
    [19, "남해-홍천"],
    [20, "산청-포항"],
    [21, "남원-이천"],
    [22, "정읍-순천"],
    [23, "강진-천안"],
    [24, "신안-울산"],
    [25, "진해-청주"],
    [26, "군산-대구"],
    [27, "완도-군산"],
    [28, "영주-포항"],
    [29, "보성-서산"],
    [30, "부안-대구"],
    [31, "부산-신고산"],
    [32, "태안-대전"],
    [33, "고성-구미"],
    [34, "당진-영덕"],
    [35, "부산-강릉"],
    [36, "보령-울진"],
    [37, "거창-파주"],
    [38, "태안-동해"],
    [39, "부여-의정부"],
    [40, "당진-공주"],
    [42, "인천-동해"],
    [43, "세종-고성"],
    [44, "양평-양양"],
    [45, "서산-가평"],
    [46, "인천-고성"],
    [47, "안산-철원"],
    [48, "강화-서울"],
    [56, "철원-양양"],
    [58, "진해-청도"],
    [59, "광양-양양"],
    [67, "칠곡-군위"],
    [75, "가평-화천"],
    [77, "부산-파주"],
    [79, "의령-창녕"],
    [82, "평택-화성"],
    [87, "포천-철원"],
    [88, "영양-울진"],
  ];

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   console.log(
  //     "UPDATE info taasinfo depth1,2:",
  //     info,
  //     taasInfo,
  //     depth1,
  //     depth2
  //   );
  // }, [info, taasInfo, depth1, depth2]);

  const checklist = [
    {
      name: "차로수별",
      options: ["1차선", "2차선", "4차선", "5-8차선", "9차선이상"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          laneOps: { ...prev.laneOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "교통시설물별",
      options: ["일반도로", "교량", "터널", "고가도로", "지하도로"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          facilOps: { ...prev.facilOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "제한속도별",
      options: ["20", "30", "40", "50", "60", "70", "80", "90이상", "결측"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          speedOps: { ...prev.speedOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "중앙분리대유형별",
      options: ["없음", "벽", "봉", "화단", "안전지대", "금속", "기타"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          barrierOps: { ...prev.barrierOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "신호등개수별",
      options: ["0", "1", "2", "3", "4", "결측"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          lightOps: { ...prev.lightOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "자동차전용도로유무별",
      options: ["비해당", "해당", "결측"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          caronlyOps: { ...prev.caronlyOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "일방통행유무별",
      options: ["비해당", "해당"],
      updateInfo: (sel, chb) =>
        setInfo((prev) => ({
          ...prev,
          onewayOps: { ...prev.onewayOps, selected: sel, checkboxes: chb },
        })),
    },
    {
      name: "TAAS관점",
      options: [
        "사고 안전구간 | 무사고",
        "사고 발생구간 | 중위",
        "사고 위험구간 | 상위 1%",
      ],
      updateInfo: (sel, chb) => setTaasInfo(chb),
    },
  ];

  const roadStatusItems = [
    {
      id: "국도번호별",
      label: "- 국도번호별",
      content: (
        <div>
          <div className="roadNo" onClick={() => setIsSelect(!isSelect)}>
            <div>
              {info.roadNo.selected && info.roadNo.selected.length !== 0
                ? info.roadNo.selected.length > 9
                  ? info.roadNo.selected.slice(0, 9).join(",") + "..."
                  : info.roadNo.selected.join(",")
                : "선택"}
            </div>
            {isSelect ? <GoTriangleUp /> : <GoTriangleDown />}
          </div>
          {isSelect && <Dropdown options={roadOps} />}
        </div>
      ),
    },
    {
      id: "차로수별",
      label: "- 차로수별",
      content: (
        <div className="lane roadItem">
          <CheckboxForm name={"차로수별"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "교통시설물별",
      label: "- 교통 시설물별",
      content: (
        <div className="facil roadItem">
          <CheckboxForm name={"교통시설물별"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "제한속도별",
      label: "- 제한속도별",
      content: (
        <div className="speed roadItem">
          <CheckboxForm name={"제한속도별"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "중앙분리대유형별",
      label: "- 중앙분리대 유형별",
      content: (
        <div className="barrier roadItem">
          <CheckboxForm name={"중앙분리대유형별"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "신호등개수별",
      label: "- 신호등개수별",
      content: (
        <div className="light roadItem">
          <CheckboxForm name={"신호등개수별"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "자동차전용도로유무별",
      label: "- 자동차전용도로 유무별",
      content: (
        <div className="caronly roadItem">
          <CheckboxForm name={"자동차전용도로유무별"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "일방통행유무별",
      label: "- 일방통행 유무별",
      content: (
        <div className="oneway roadItem">
          <CheckboxForm name={"일방통행유무별"} checklist={checklist} />
        </div>
      ),
    },
  ];

  const taasItems = [
    {
      id: "차량관점",
      label: "- 차량 관점",
      content: (
        <div className="roadItem">
          <CheckboxForm name={"TAAS관점"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "보행자관점",
      label: "- 보행자 관점",
      content: (
        <div className="roadItem">
          <CheckboxForm name={"TAAS관점"} checklist={checklist} />
        </div>
      ),
    },
    {
      id: "자전거관점",
      label: "- 자전거 관점",
      content: (
        <div className="roadItem">
          <CheckboxForm name={"TAAS관점"} checklist={checklist} />
        </div>
      ),
    },
  ];
  ///////////////////////////////////////////////////////////////
  const items = [
    {
      id: "도로현황",
      label: "도로현황",
      content: <Accordion items={roadStatusItems} />,
    },
    {
      id: "TMS",
      label: "교통량(TMS)",
      content: <div className="prep">- 준비중</div>,
    },
    {
      id: "TAAS",
      label: "교통사고(TAAS)",
      content: <Accordion items={taasItems} />,
    },
  ];
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="left_column">
        <a href="./">
          <p>일반국도현황</p>
        </a>
        <div onClick={handleModOpen} className="guide">
          <CgFileDocument style={{ color: "white", fontSize: "25px" }} />
        </div>
        <div className="guide2">데이터 설명서</div>
      </div>

      <div className="detail_div">
        <div className="accordion_div">
          <Accordion items={items} />
        </div>

        <div className="footnote">
          <div className="fnt">데이터 출처</div>
          <div>
            · 2019, 국가교통 도로망 GIS 데이터, 국토부/KOTI 2020-2022, GIS
          </div>
          <div>
            · 분석시스템: 교통사고 분석, 교통사고분석시스템(TAAS), 도로교통공단
          </div>
          <div>· 2023, 수치지형도(도로중심선데이터), 국토지리정보원</div>
          <br />
          <div>*시차로 인한 속성정보 누락구간에 유의·활용 바랍니다.</div>

          {showModal && modal}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
