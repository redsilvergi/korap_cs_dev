const useEmiColor = () => {
  const getEmiVColor = (emi, taasInfo) => {
    if (taasInfo.every((val) => val === false)) {
      if (0 === emi) {
        return [0, 166, 172, 255 * 0.8];
      } else if (0 < emi && emi <= 2.26) {
        return [43, 150, 175, 255 * 0.8];
      } else if (2.26 < emi && emi <= 4.78) {
        return [86, 134, 178, 255 * 0.8];
      } else if (4.78 < emi && emi <= 9.82) {
        return [129, 118, 181, 255 * 0.8];
      } else if (9.82 < emi && emi <= 21.24) {
        return [164, 126, 161, 255 * 0.8];
      } else if (21.24 < emi && emi <= 36.74) {
        return [198, 133, 140, 255 * 0.8];
      } else if (36.74 < emi && emi <= 63.66) {
        return [233, 141, 120, 255 * 0.8];
      } else if (63.66 < emi && emi <= 115.36) {
        return [218, 94, 84, 255 * 0.8];
      } else if (115.36 < emi && emi <= 261.86) {
        return [204, 47, 47, 255 * 0.8];
      } else if (261.86 < emi && emi <= 1573.98) {
        return [189, 0, 11, 255 * 0.8];
      } else {
        return [255, 0, 0, 255 * 0.8];
      }
    } else {
      if (0 === emi) {
        return taasInfo[0] ? [0, 166, 172, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (0 < emi && emi <= 2.26) {
        return taasInfo[1] ? [43, 150, 175, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (2.26 < emi && emi <= 4.78) {
        return taasInfo[1] ? [86, 134, 178, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (4.78 < emi && emi <= 9.82) {
        return taasInfo[1] ? [129, 118, 181, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (9.82 < emi && emi <= 21.24) {
        return taasInfo[1] ? [164, 126, 161, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (21.24 < emi && emi <= 36.74) {
        return taasInfo[1] ? [198, 133, 140, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (36.74 < emi && emi <= 63.66) {
        return taasInfo[1] ? [233, 141, 120, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (63.66 < emi && emi <= 115.36) {
        return taasInfo[1] ? [218, 94, 84, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (115.36 < emi && emi <= 261.86) {
        return taasInfo[1] ? [204, 47, 47, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (261.86 < emi && emi <= 1573.98) {
        return taasInfo[2] ? [189, 0, 11, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else {
        return [255, 0, 0, 255 * 0.8];
      }
    }
  };

  const getEmiPColor = (emi, taasInfo) => {
    if (taasInfo.every((val) => val === false)) {
      if (0 === emi) {
        return [0, 166, 172, 255 * 0.8];
      } else if (0 < emi && emi <= 2.26) {
        return [43, 150, 175, 255 * 0.8];
      } else if (2.26 < emi && emi <= 7.3) {
        return [86, 134, 178, 255 * 0.8];
      } else if (7.3 < emi && emi <= 20.5) {
        return [129, 118, 181, 255 * 0.8];
      } else if (20.5 < emi && emi <= 33.96) {
        return [164, 126, 161, 255 * 0.8];
      } else if (33.96 < emi && emi <= 48.94) {
        return [198, 133, 140, 255 * 0.8];
      } else if (48.94 < emi && emi <= 74.6) {
        return [233, 141, 120, 255 * 0.8];
      } else if (74.6 < emi && emi <= 121.66) {
        return [218, 94, 84, 255 * 0.8];
      } else if (121.66 < emi && emi <= 253.88) {
        return [204, 47, 47, 255 * 0.8];
      } else if (253.88 < emi && emi <= 599.42) {
        return [189, 0, 11, 255 * 0.8];
      } else {
        return [255, 0, 0, 255 * 0.8];
      }
    } else {
      if (0 === emi) {
        return taasInfo[0] ? [0, 166, 172, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (0 < emi && emi <= 2.26) {
        return taasInfo[1] ? [43, 150, 175, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (2.26 < emi && emi <= 7.3) {
        return taasInfo[1] ? [86, 134, 178, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (7.3 < emi && emi <= 20.5) {
        return taasInfo[1] ? [129, 118, 181, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (20.5 < emi && emi <= 33.96) {
        return taasInfo[1] ? [164, 126, 161, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (33.96 < emi && emi <= 48.94) {
        return taasInfo[1] ? [198, 133, 140, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (48.94 < emi && emi <= 74.6) {
        return taasInfo[1] ? [233, 141, 120, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (74.6 < emi && emi <= 121.66) {
        return taasInfo[1] ? [218, 94, 84, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (121.66 < emi && emi <= 253.88) {
        return taasInfo[1] ? [204, 47, 47, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (253.88 < emi && emi <= 599.42) {
        return taasInfo[2] ? [189, 0, 11, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else {
        return [255, 0, 0, 255 * 0.8];
      }
    }
  };

  const getEmiBColor = (emi, taasInfo) => {
    if (taasInfo.every((val) => val === false)) {
      if (0 === emi) {
        return [0, 166, 172, 255 * 0.8];
      } else if (0 < emi && emi <= 2) {
        return [43, 150, 175, 255 * 0.8];
      } else if (2 < emi && emi <= 2.26) {
        return [86, 134, 178, 255 * 0.8];
      } else if (2.26 < emi && emi <= 4.78) {
        return [129, 118, 181, 255 * 0.8];
      } else if (4.78 < emi && emi <= 14.46) {
        return [164, 126, 161, 255 * 0.8];
      } else if (14.46 < emi && emi <= 19.5) {
        return [198, 133, 140, 255 * 0.8];
      } else if (19.5 < emi && emi <= 31.7) {
        return [233, 141, 120, 255 * 0.8];
      } else if (31.7 < emi && emi <= 43.64) {
        return [218, 94, 84, 255 * 0.8];
      } else if (43.64 < emi && emi <= 72.46) {
        return [204, 47, 47, 255 * 0.8];
      } else if (72.46 < emi && emi <= 185.56) {
        return [189, 0, 11, 255 * 0.8];
      } else {
        return [255, 0, 0, 255 * 0.8];
      }
    } else {
      if (0 === emi) {
        return taasInfo[0] ? [0, 166, 172, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (0 < emi && emi <= 2) {
        return taasInfo[1] ? [43, 150, 175, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (2 < emi && emi <= 2.26) {
        return taasInfo[1] ? [86, 134, 178, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (2.26 < emi && emi <= 4.78) {
        return taasInfo[1] ? [129, 118, 181, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (4.78 < emi && emi <= 14.46) {
        return taasInfo[1] ? [164, 126, 161, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (14.46 < emi && emi <= 19.5) {
        return taasInfo[1] ? [198, 133, 140, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (19.5 < emi && emi <= 31.7) {
        return taasInfo[1] ? [233, 141, 120, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (31.7 < emi && emi <= 43.64) {
        return taasInfo[1] ? [218, 94, 84, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (43.64 < emi && emi <= 72.46) {
        return taasInfo[1] ? [204, 47, 47, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else if (72.46 < emi) {
        return taasInfo[2] ? [189, 0, 11, 255 * 0.8] : [0, 0, 0, 255 * 0.05];
      } else {
        return [255, 0, 0, 255 * 0.8];
      }
    }
  };

  const getRoadColor = (feature, info) => {
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
            return (feature) => feature.properties.width === laneRanges[index];
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

    if (
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
    ) {
      return [230, 0, 60, 255 * 0.8];
    } else {
      return [0, 0, 0, 255 * 0.05];
    }
  };

  return { getEmiVColor, getEmiPColor, getEmiBColor, getRoadColor };
};

export default useEmiColor;
