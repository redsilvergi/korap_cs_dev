import { useState } from "react";
import "./TopBar.css";
import Modal from "./Modal";
import { CgFileDocument } from "react-icons/cg";
import guide from "../img/guide2.PNG";

const TopBar = () => {
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
      <img src={guide} alt="guide1" height="700%" />
    </Modal>
  );

  ///////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="topbar_ct">
        <div className="top_column">
          <a href="./">
            <div>KoRAP</div>
          </a>
          <div>사고위험지도</div>
          <div>일반국도현황</div>
        </div>

        <div onClick={handleModOpen} className="guide">
          <div className="dscrp">데이터 설명서&nbsp;</div>
          <CgFileDocument className="dscrp_ic" />
        </div>
        {/* <div className="guide2">데이터 설명서</div> */}
      </div>
      {showModal && modal}
    </div>
  );
};

export default TopBar;
