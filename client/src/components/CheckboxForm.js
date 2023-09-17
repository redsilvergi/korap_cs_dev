import "./CheckboxForm.css";
import React, { useCallback, useEffect, useState, useRef } from "react";
import useInfo from "../hooks/use-info";

import { BsDashSquareFill } from "react-icons/bs";

const CheckboxForm = ({ name, checklist }) => {
  const objRef = useRef(checklist.filter((item) => item.name === name)[0]);
  const obj = objRef.current;
  const list = obj.options;
  const { depth1, depth2 } = useInfo();

  const [checkboxes, setCheckboxes] = useState(() => {
    const initialCheckboxes = {};
    for (let i = 1; i <= list.length; i++) {
      initialCheckboxes[`checkbox${i}`] = false;
    }
    return initialCheckboxes;
  });

  const updateF = useCallback(() => {
    const sortedItems = Object.values(checkboxes).reduce((acc, val, i) => {
      if (val) {
        acc.push([...list][i]);
      }
      return acc;
    }, []);
    obj.updateInfo(sortedItems, Object.values(checkboxes));
  }, [checkboxes, obj, list]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  useEffect(() => {
    updateF();
  }, [updateF]);

  const taasItem = [
    [
      <div className="titm">
        <div className="emi1">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;EMI = 0.00</div>
        </div>
      </div>,
      <div className="titm">
        <div className="emi2">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;0.00 &lt; EMI ≤ 2.26</div>
        </div>
        <div className="emi3">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;2.26 &lt; EMI ≤ 4.78</div>
        </div>
        <div className="emi4">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;4.78 &lt; EMI ≤ 9.82</div>
        </div>
        <div className="emi5">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;9.82 &lt; EMI ≤ 21.24</div>
        </div>
        <div className="emi6">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;21.24 &lt; EMI ≤ 36.74</div>
        </div>
        <div className="emi7">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;36.74 &lt; EMI ≤ 63.66</div>
        </div>
        <div className="emi8">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;63.66 &lt; EMI ≤ 115.36</div>
        </div>
        <div className="emi9">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;115.36 &lt; EMI ≤ 261.86</div>
        </div>
      </div>,
      <div>
        <div className="titm">
          <div className="emi10">
            <BsDashSquareFill className="icon" />
            <div>&nbsp;261.86 &lt; EMI ≤ 1573.98</div>
          </div>
        </div>
        <div className="emi_des">
          *EMI(Equivalent Minor Injuries)란 <br />
          &nbsp; 최소인명피해환산계수의 약자입니다.
        </div>
      </div>,
    ],
    [
      <div className="titm">
        <div className="emi1">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;EMI = 0.00</div>
        </div>
      </div>,
      <div className="titm">
        <div className="emi2">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;0.00 &lt; EMI ≤ 2.26</div>
        </div>
        <div className="emi3">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;2.26 &lt; EMI ≤ 7.30</div>
        </div>
        <div className="emi4">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;7.30 &lt; EMI ≤ 20.50</div>
        </div>
        <div className="emi5">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;20.50 &lt; EMI ≤ 33.96</div>
        </div>
        <div className="emi6">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;33.96 &lt; EMI ≤ 48.94</div>
        </div>
        <div className="emi7">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;48.94 &lt; EMI ≤ 74.60</div>
        </div>
        <div className="emi8">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;74.60 &lt; EMI ≤ 121.66</div>
        </div>
        <div className="emi9">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;121.66 &lt; EMI ≤ 253.88</div>
        </div>
      </div>,
      <div>
        <div className="titm">
          <div className="emi10">
            <BsDashSquareFill className="icon" />
            <div>&nbsp;253.88 &lt; EMI ≤ 599.42</div>
          </div>
        </div>
        <div className="emi_des">
          *EMI(Equivalent Minor Injuries)란 <br />
          &nbsp; 최소인명피해환산계수의 약자입니다.
        </div>
      </div>,
    ],
    [
      <div className="titm">
        <div className="emi1">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;EMI = 0.00</div>
        </div>
      </div>,
      <div className="titm">
        <div className="emi2">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;0.00 &lt; EMI ≤ 2.00</div>
        </div>
        <div className="emi3">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;2.26 &lt; EMI ≤ 2.26</div>
        </div>
        <div className="emi4">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;4.78 &lt; EMI ≤ 4.78</div>
        </div>
        <div className="emi5">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;9.82 &lt; EMI ≤ 14.46</div>
        </div>
        <div className="emi6">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;21.24 &lt; EMI ≤ 19.50</div>
        </div>
        <div className="emi7">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;36.74 &lt; EMI ≤ 31.70</div>
        </div>
        <div className="emi8">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;63.66 &lt; EMI ≤ 43.64</div>
        </div>
        <div className="emi9">
          <BsDashSquareFill className="icon" />
          <div>&nbsp;115.36 &lt; EMI ≤ 72.46</div>
        </div>
      </div>,
      <div>
        <div className="titm">
          <div className="emi10">
            <BsDashSquareFill className="icon" />
            <div>&nbsp;72.46 &lt; EMI ≤ 185.56</div>
          </div>
        </div>
        <div className="emi_des">
          *EMI(Equivalent Minor Injuries)란 <br />
          &nbsp; 최소인명피해환산계수의 약자입니다.
        </div>
      </div>,
    ],
  ];

  return (
    <form>
      {list.map((item, index) => (
        <div key={`checkbox${index + 1}`}>
          <label className="chk_lb">
            <input
              className="custom_cb"
              type="checkbox"
              name={`checkbox${index + 1}`}
              checked={checkboxes[`checkbox${index + 1}`]}
              onChange={handleCheckboxChange}
            />
            {index !== list.length - 1 ? (
              <div className="chk_item_div">{item}</div>
            ) : depth1 === "도로현황" ? (
              <div className="chk_item_div" style={{ marginBottom: "15px" }}>
                {item}
              </div>
            ) : (
              <div className="chk_item_div">{item}</div>
            )}
          </label>
          {depth1 === "TAAS"
            ? depth2 === "차량관점"
              ? taasItem[0][index]
              : depth2 === "보행자관점"
              ? taasItem[1][index]
              : depth2 === "자전거관점"
              ? taasItem[2][index]
              : null
            : null}
        </div>
      ))}
    </form>
  );
};

export default CheckboxForm;
