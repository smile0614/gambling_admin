"use client";

import useColorMode from "@/hooks/useColorMode";
import React, { useMemo } from "react";

import WorldMap, { CountryContext } from "react-svg-worldmap";

interface MapOneProps {
  data: Array<{ country: string; value: number }>;
}

const MapOne: React.FC<MapOneProps> = ({ data }) => {
  const [colorMode, setColorMode] = useColorMode();
  const getStyle = ({
    countryValue,
    countryCode,
    minValue,
    maxValue,
    color,
  }: CountryContext) => ({
    fill: countryValue ? "#1552B6" : "#ccd6df",
    fillOpacity: countryValue
      ? 0.4 + (0.6 * (countryValue - minValue)) / (maxValue - minValue)
      : 0.7,
    stroke: "#ccd6df",
    strokeWidth: 1,
    strokeOpacity: 0.4,
    cursor: "pointer",
  });

  const renderMap = useMemo(() => {
    return (
      <WorldMap
        color="#1552B6"
        value-suffix="people"
        size="responsive"
        data={data}
        backgroundColor="transparent"
        styleFunction={getStyle}
        // tooltipTextFunction={}
      />
    );
  }, [data, colorMode]);

  return (
    <div className="m-auto flex h-full w-full items-center justify-center rounded-lg border border-stroke bg-white px-7.5 py-6 dark:border-strokedark dark:bg-boxdark">
      {renderMap}
    </div>
  );
};

export default MapOne;
