import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Map } from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import "mapbox-gl/dist/mapbox-gl.css"; //remove console log error
import "./LandingPage.css";
import dissolvedRoad from "../National_Road_Dissolved3.json";
import intPoint from "../National_Road_Interchange_Final_geojson.json";
import LeftBar from "../components/LeftBar";
import useTooltip from "../hooks/use-tooltip";
import useInfo from "../hooks/use-info";
import useEmiColor from "../hooks/use_emicolor";
import Controls from "../components/Controls";
import Basemap from "../components/Basemap";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsaHl4enpjNzE4N3Eza3Bjemk3MTc1cDYifQ.EL1F3mAAhdlX1du8lCLDGw";

const INITIAL_VIEW_STATE = {
  longitude: 126.8,
  latitude: 36.1,
  zoom: 6.420000000000002,
  bearing: 0,
  pitch: 0,
};

function LandingPage() {
  const [LD, setLD] = useState(false);
  const [view, setView] = useState(INITIAL_VIEW_STATE);
  const [data, setData] = useState({ nroad: null, emiroad: null });
  const [length, setLength] = useState(null);
  const { getTooltip } = useTooltip();
  const { info, taasInfo, tmsInfo, depth1, depth2, isFilter } = useInfo();
  const {
    getEmiVColor,
    getEmiPColor,
    getEmiBColor,
    getRoadColor,
    getTmsColor,
    getTmsdColor,
  } = useEmiColor();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [basemap, setBasemap] = useState(
    "mapbox://styles/redsilver522/cli2ji9m500w901pofuyqhbtz"
  );

  //LAYERS
  const layer0 = new GeoJsonLayer({
    id: "oneroad",
    data: dissolvedRoad,
    lineWidthMaxPixels: 3,
    getLineColor:
      depth2 !== "교통량지점" ? [0, 0, 0, 150] : [0, 0, 0, 255 * 0.2],
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
        switch (depth1) {
          case "도로현황":
            return getRoadColor(d);
          case "TMS":
            if (depth2 === "교통량구간") {
              return getTmsColor(d.properties.aadt_pred);
            } else {
              return [230, 0, 60, 0];
            }

          default:
            return [230, 0, 60];
        }
      },
      pickable: true,
      autoHighlight: true,
      visible:
        isFilter &&
        view.zoom >= 6 &&
        (depth1 === "도로현황" ||
          (depth1 !== "TAAS" && depth2 !== "교통량지점" && depth2 !== null)),
      // onClick: (i, e) => console.log(i, e),
      updateTriggers: {
        getLineColor: [info, depth1, tmsInfo],
      },
    });
  }, [
    data.nroad,
    depth1,
    depth2,
    isFilter,
    view.zoom,
    info,
    getRoadColor,
    getTmsColor,
    tmsInfo,
  ]);

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
            return getEmiVColor(d.properties.emi_v);
          case "보행자관점":
            return getEmiPColor(d.properties.emi_p);
          case "자전거관점":
            return getEmiBColor(d.properties.emi_b);
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
      // onClick: (i, e) => console.log(i, e),
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

  const layer7 = useMemo(() => {
    if (!data.aadtDot) return null;

    return new GeoJsonLayer({
      id: "aadtdot",
      data: data.aadtDot,
      lineWidthScale: 20,
      lineWidthMaxPixels: 2,
      pointRadiusMinPixels: 3,
      pointRadiusMaxPixels: 7,
      getFillColor: (d) => {
        return getTmsdColor(d.properties.Resduals);
      },
      getLineColor: [0, 0, 0, 255 * 0.75],
      pickable: true,
      autoHighlight: true,
      getPointRadius: 1000,
      visible: isFilter && view.zoom >= 6 && depth2 === "교통량지점",
      // onClick: (i, e) => console.log(i, e),
      updateTriggers: {
        getPointRadius: hoveredItem,
        getFillColor: tmsInfo,
      },
    });
  }, [
    data.aadtDot,
    depth2,
    tmsInfo,
    isFilter,
    view.zoom,
    hoveredItem,
    getTmsdColor,
  ]);

  const layers = [
    layer0,
    layer1,
    layer2,
    layer3,
    layer4,
    layer5,
    layer6,
    layer7,
  ];

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
    } else if (data.nroad && tmsInfo && depth2 === "교통량구간") {
      const filtered = data.nroad.features.filter((feature) => {
        let aadt, conditions;

        aadt = feature.properties.aadt_pred;
        conditions = [
          tmsInfo[0] && 1524 <= aadt && aadt <= 18271,
          tmsInfo[1] && 18271 < aadt && aadt <= 82417,
          tmsInfo[2] && 82417 < aadt && aadt <= 298292,
        ];

        if (conditions.every((val) => val === false)) {
          return aadt === -100;
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
          : depth2 === "교통량구간"
          ? 14933
          : 0;

      setLength(totalLength);
    } else {
      setLength(0);
    }
  }, [depth1, depth2, data.emiroad, taasInfo, data.nroad, info, tmsInfo]);

  return (
    <div className="testc">
      <LeftBar setData={setData} setLD={setLD} />
      <div className="container">
        <Basemap basemap={basemap} setBasemap={setBasemap} />
        <Controls
          view={view}
          setView={setView}
          INITIAL_VIEW_STATE={INITIAL_VIEW_STATE}
        />

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
