import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Map } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
// import { MVTLayer } from "@deck.gl/geo-layers";
import "mapbox-gl/dist/mapbox-gl.css"; //remove console log error
import "./LandingPage.css";
import dissolvedRoad from "../National_Road_Dissolved3.json";
import intPoint from "../National_Road_Interchange_Final_geojson.json";
import LeftBar from "../components/LeftBar";
import useTooltip from "../hooks/use-tooltip";
import { GiExpand } from "react-icons/gi";
import useInfo from "../hooks/use-info";
import useEmiColor from "../hooks/use_emicolor";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsaHlkcDc4MzB4MGgzZHJwZjdqamFwODYifQ.m22renmKPUA4rupVepEgAg";

const INITIAL_VIEW_STATE = {
  longitude: 126.8,
  latitude: 36.1,
  zoom: 6.420000000000002,
  bearing: 0,
  pitch: 0,
};

function LandingPage() {
  const [LD, setLD] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [view, setView] = useState(INITIAL_VIEW_STATE);
  const [data, setData] = useState({ nroad: null, emiroad: null });
  const [length, setLength] = useState(null);
  const { getTooltip } = useTooltip();
  const { info, taasInfo, depth1, depth2 } = useInfo();
  const { getEmiVColor, getEmiPColor, getEmiBColor, getRoadColor } =
    useEmiColor();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [basemap, setBasemap] = useState(
    "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz"
  );

  const handleMap = () => {
    const maps = [
      "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz",
      "mapbox://styles/redsilver522/cll63rilr00aj01q08hjfa03s",
      "mapbox://styles/redsilver522/cll6424pf00al01q0c5kz3w07",
    ];

    const currentIndex = maps.indexOf(basemap);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % maps.length;
      setBasemap(maps[nextIndex]);
      return;
    }
    setBasemap(basemap);
    return;
  };

  //LAYERS
  const layer0 = new GeoJsonLayer({
    id: "oneroad",
    data: dissolvedRoad,
    lineWidthMaxPixels: 3,
    getLineColor: [0, 0, 0, 150],
    getLineWidth: 500,
    visible: view.zoom >= 6 && depth1 !== "TAAS",
  });

  const layer1 = useMemo(() => {
    if (!data.nroad) return null;

    return new GeoJsonLayer({
      id: "nationalRoad",
      data: data.nroad,
      lineWidthMaxPixels: 10,
      lineWidthMinPixels: 4,
      getLineWidth: 2000,
      getLineColor: (d) => {
        return getRoadColor(d, info);
      },
      pickable: true,
      autoHighlight: true,
      visible: isFilter && view.zoom >= 6 && depth1 === "도로현황",
      // onClick: (i, e) => console.log(i, e),
      updateTriggers: {
        getLineColor: info,
      },
    });
  }, [data.nroad, depth1, isFilter, view.zoom, info, getRoadColor]);

  const layer2 = useMemo(() => {
    if (!data.emiroad) return null;

    return new GeoJsonLayer({
      id: "emiRoad",
      data: data.emiroad,
      lineWidthMaxPixels: 10,
      lineWidthMinPixels: depth2 !== null ? 4 : 1,
      getLineWidth: depth2 !== null ? 2000 : 1,
      getLineColor: (d) => {
        switch (depth2) {
          case "차량관점":
            return getEmiVColor(d.properties.emi_v, taasInfo);
          case "보행자관점":
            return getEmiPColor(d.properties.emi_p, taasInfo);
          case "자전거관점":
            return getEmiBColor(d.properties.emi_b, taasInfo);
          default:
            return [230, 0, 60];
        }
      },
      pickable: true,
      autoHighlight: true,
      visible: isFilter && view.zoom >= 6 && depth1 === "TAAS",
      // onClick: (i, e) => console.log(i, e),
      updateTriggers: {
        getLineColor: taasInfo,
      },
    });
  }, [
    data.emiroad,
    depth1,
    depth2,
    taasInfo,
    getEmiVColor,
    getEmiPColor,
    getEmiBColor,
    isFilter,
    view.zoom,
  ]);

  const layer3 =
    depth1 === "도로현황" &&
    new GeoJsonLayer({
      id: "int",
      data: intPoint,
      stroked: true,
      filled: true,
      pointType: "circle",
      lineWidthScale: 20,
      lineWidthMaxPixels: 2,
      pointRadiusMaxPixels: 7,
      getFillColor: [229, 252, 246],
      getLineColor: [230, 0, 60],
      getPointRadius: 100,
      visible: view.zoom >= 9.7,
    });

  /////////////////////////////////////////////////////
  const onHover = (info) => {
    if (info.object) {
      setHoveredItem({
        id: info.object.properties.id,
      });
    } else {
      setHoveredItem(null);
    }
  };

  const getDynamicPointRadius = useCallback(
    (d) => {
      if (hoveredItem && d.properties.id === hoveredItem.id) {
        return 200; // 1000
      }
      return 1; // 4
    },
    [hoveredItem]
  );
  /////////////////////////////////////////////////////
  const layer4 = useMemo(() => {
    if (!data.vpoint) return null;

    return new GeoJsonLayer({
      id: "vpoint",
      data: data.vpoint,
      lineWidthScale: 20,
      lineWidthMaxPixels: 2,
      pointRadiusMinPixels: 3,
      pointRadiusMaxPixels: 10,
      getFillColor: [255, 255, 255, 255 * 0.7],
      getLineColor: [0, 0, 0, 255 * 0.25],
      pickable: true,
      autoHighlight: true,
      getPointRadius: getDynamicPointRadius,
      onHover: onHover,
      visible: isFilter && view.zoom >= 9.7 && depth2 === "차량관점",
      onClick: (i, e) => console.log(i, e),
      updateTriggers: {
        getPointRadius: hoveredItem,
      },
    });
  }, [
    data.vpoint,
    depth2,
    isFilter,
    view.zoom,
    hoveredItem,
    getDynamicPointRadius,
  ]);

  const layer5 = useMemo(() => {
    if (!data.ppoint) return null;

    return new GeoJsonLayer({
      id: "ppoint",
      data: data.ppoint,
      lineWidthScale: 20,
      lineWidthMaxPixels: 2,
      pointRadiusMinPixels: 3,
      pointRadiusMaxPixels: 10,
      getFillColor: [255, 255, 255, 255 * 0.7],
      getLineColor: [0, 0, 0, 255 * 0.25],
      pickable: true,
      autoHighlight: true,
      getPointRadius: getDynamicPointRadius,
      onHover: onHover,
      visible: isFilter && view.zoom >= 9.7 && depth2 === "보행자관점",
      // onClick: (i, e) => console.log(i, e),
      updateTriggers: {
        getPointRadius: hoveredItem,
      },
    });
  }, [
    data.ppoint,
    depth2,
    isFilter,
    view.zoom,
    hoveredItem,
    getDynamicPointRadius,
  ]);

  const layer6 = useMemo(() => {
    if (!data.bpoint) return null;

    return new GeoJsonLayer({
      id: "bpoint",
      data: data.bpoint,
      lineWidthScale: 20,
      lineWidthMaxPixels: 2,
      pointRadiusMinPixels: 3,
      pointRadiusMaxPixels: 10,
      getFillColor: [255, 255, 255, 255 * 0.7],
      getLineColor: [0, 0, 0, 255 * 0.25],
      pickable: true,
      autoHighlight: true,
      getPointRadius: getDynamicPointRadius,
      onHover: onHover,
      visible: isFilter && view.zoom >= 9.7 && depth2 === "자전거관점",
      // onClick: (i, e) => console.log(i, e),
      updateTriggers: {
        getPointRadius: hoveredItem,
      },
    });
  }, [
    data.bpoint,
    depth2,
    isFilter,
    view.zoom,
    hoveredItem,
    getDynamicPointRadius,
  ]);
  const layers = [layer0, layer1, layer2, layer3, layer4, layer5, layer6];

  useEffect(() => {
    if (data.nroad && info && depth1 === "도로현황") {
      const {
        roadNo,
        laneOps,
        facilOps,
        speedOps,
        barrierOps,
        lightOps,
        caronlyOps,
        onewayOps,
      } = info;
      const filterConditions = [];
      if (roadNo.selected) {
        filterConditions.push((feature) =>
          roadNo.selected.includes(parseInt(feature.properties.road_no))
        );
      }

      if (laneOps.checkboxes) {
        const laneRanges = ["1", "2", "3", "4", "5"];
        var laneConditions = laneOps.checkboxes
          .map((laneOp, index) => {
            if (laneOp) {
              return (feature) =>
                feature.properties.width === laneRanges[index];
            } else {
              return null;
            }
          })
          .filter((condition) => condition !== null);
      } else {
        laneConditions = [];
      }
      if (facilOps.checkboxes) {
        const facilRanges = ["0", "1", "2", "4", "8"];
        var facilConditions = facilOps.checkboxes
          .map((facilOp, index) => {
            if (facilOp) {
              return (feature) =>
                feature.properties.facil_kind === facilRanges[index];
            } else {
              return null;
            }
          })
          .filter((condition) => condition !== null);
      } else {
        facilConditions = [];
      }
      if (speedOps.checkboxes) {
        const speedRanges = [20, 30, 40, 50, 60, 70, 80];
        var speedConditions = speedOps.checkboxes
          .map((speedOp, index) => {
            if (speedOp) {
              if (index === 8) {
                return (feature) =>
                  feature.properties.max_spd === null ||
                  feature.properties.max_spd === 0;
              } else if (index === 7) {
                return (feature) =>
                  feature.properties.max_spd === 90 ||
                  feature.properties.max_spd === 100 ||
                  feature.properties.max_spd === 110;
              } else {
                return (feature) =>
                  feature.properties.max_spd === speedRanges[index];
              }
            } else {
              return null;
            }
          })
          .filter((condition) => condition !== null);
      } else {
        speedConditions = [];
      }
      if (barrierOps.checkboxes) {
        const barrierRanges = ["0", "1", "2", "3", "4", "5", "15"];
        var barrierConditions = barrierOps.checkboxes
          .map((barrierOp, index) => {
            if (barrierOp) {
              return (feature) =>
                feature.properties.barrier === barrierRanges[index];
            } else {
              return null;
            }
          })
          .filter((condition) => condition !== null);
      } else {
        barrierConditions = [];
      }
      if (lightOps.checkboxes) {
        const lightRanges = [0, 1, 2, 3, 4, null];
        var lightConditions = lightOps.checkboxes
          .map((lightOp, index) => {
            if (lightOp) {
              return (feature) =>
                feature.properties.num_cross === lightRanges[index];
            } else {
              return null;
            }
          })
          .filter((condition) => condition !== null);
      } else {
        lightConditions = [];
      }
      if (caronlyOps.checkboxes) {
        const caronlyRanges = ["0", "1", null];
        var caronlyConditions = caronlyOps.checkboxes
          .map((caronlyOp, index) => {
            if (caronlyOp) {
              return (feature) =>
                feature.properties.auto_exclu === caronlyRanges[index];
            } else {
              return null;
            }
          })
          .filter((condition) => condition !== null);
      } else {
        caronlyConditions = [];
      }
      if (onewayOps.checkboxes) {
        const onewayRanges = ["0", "1"];
        var onewayConditions = onewayOps.checkboxes
          .map((onewayOp, index) => {
            if (onewayOp) {
              return (feature) =>
                feature.properties.oneway === onewayRanges[index];
            } else {
              return null;
            }
          })
          .filter((condition) => condition !== null);
      } else {
        onewayConditions = [];
      }

      const filtered = data.nroad.features.filter((feature) => {
        return (
          filterConditions.every((condition) => condition(feature)) &&
          (laneConditions.length === 0 ||
            laneConditions.some((condition) => condition(feature))) &&
          (facilConditions.length === 0 ||
            facilConditions.some((condition) => condition(feature))) &&
          (speedConditions.length === 0 ||
            speedConditions.some((condition) => condition(feature))) &&
          (barrierConditions.length === 0 ||
            barrierConditions.some((condition) => condition(feature))) &&
          (lightConditions.length === 0 ||
            lightConditions.some((condition) => condition(feature))) &&
          (caronlyConditions.length === 0 ||
            caronlyConditions.some((condition) => condition(feature))) &&
          (onewayConditions.length === 0 ||
            onewayConditions.some((condition) => condition(feature)))
        );
      });

      const totalLength =
        filtered.length !== 0
          ? Math.round(
              filtered.reduce((acc, feature) => {
                return acc + feature.properties.length;
              }, 0) / 1000
            )
          : 0;

      setLength(totalLength);
    } else if (data.emiroad && taasInfo && depth1 === "TAAS") {
      const filtered = data.emiroad.features.filter((feature) => {
        let emi, conditions;

        switch (depth2) {
          case "차량관점":
            emi = feature.properties.emi_v;
            conditions = [
              taasInfo[0] && 0 === emi,
              taasInfo[1] && 0 < emi && emi <= 261.86,
              taasInfo[2] && 261.86 < emi && emi <= 1573.98,
            ];
            break;

          case "보행자관점":
            emi = feature.properties.emi_p;
            conditions = [
              taasInfo[0] && 0 === emi,
              taasInfo[1] && 0 < emi && emi <= 253.88,
              taasInfo[2] && 253.88 < emi && emi <= 599.42,
            ];
            break;
          case "자전거관점":
            emi = feature.properties.emi_b;
            conditions = [
              taasInfo[0] && 0 === emi,
              taasInfo[1] && 0 < emi && emi <= 72.46,
              taasInfo[2] && 72.46 < emi && emi <= 185.56,
            ];
            break;
          default:
            conditions = [];
            break;
        }

        if (conditions.every((val) => val === false)) {
          return emi === -100;
        } else {
          return conditions.some((val) => val === true);
        }
      });

      const totalLength =
        filtered.length !== 0
          ? Math.round(
              filtered.reduce((acc, feature) => {
                return acc + feature.properties.length;
              }, 0) / 1000
            )
          : depth1 === "TAAS"
          ? 14927
          : 0;

      setLength(totalLength);
    } else {
      setLength(0);
    }
  }, [depth1, depth2, data.emiroad, taasInfo, data.nroad, info]);

  return (
    <div className="testc">
      <LeftBar setData={setData} setLD={setLD} setIsFilter={setIsFilter} />
      <div className="container">
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
          <button className="toggle_button" onClick={handleMap}>
            M
          </button>
          <button
            className="toggle_button"
            onClick={() => setIsFilter(!isFilter)}
          >
            F
          </button>
        </div>

        <div className="lengthSum">
          선택구간 연장 <span>{length ? length : 0}</span> km
        </div>

        <DeckGL
          initialViewState={view}
          onViewStateChange={({ viewState }) => setView(viewState)}
          controller={true}
          layers={layers}
          getTooltip={({ object, layer }) => getTooltip({ object, layer })}
        >
          <Map mapStyle={basemap} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
        </DeckGL>
      </div>

      {LD && (
        <div className="overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
