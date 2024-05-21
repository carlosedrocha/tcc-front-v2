import { Dimensions, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
type BreakPointValue = Partial<{
  // @ts-ignore
  [key]: any;
}>;

import DefaultTheme from "tailwindcss/defaultConfig";
import resolveConfig from "tailwindcss/resolveConfig";

const TailwindTheme = resolveConfig(DefaultTheme);
const screenSize = TailwindTheme.theme.screens;

let resolveScreenWidth: any = {
  default: 0,
};

Object.entries(screenSize).forEach(([key, value]) => {
  resolveScreenWidth[key] = parseInt(value.replace("px", ""));
});

export const getBreakPointValue = (values: any, width: any) => {
  if (typeof values !== "object") return values;

  let finalBreakPointResolvedValue: any;
  let mediaQueriesBreakpoints: any = [];
  Object.keys(resolveScreenWidth).forEach((key) => {
    const isValid = isValidBreakpoint(resolveScreenWidth[key], width);

    mediaQueriesBreakpoints.push({
      key: key,
      breakpoint: resolveScreenWidth[key],
      isValid: isValid,
    });
  });

  mediaQueriesBreakpoints.sort((a: any, b: any) => a.breakpoint - b.breakpoint);

  mediaQueriesBreakpoints.forEach((breakpoint: any, index: any) => {
    breakpoint.value = values.hasOwnProperty(breakpoint.key)
      ? // @ts-ignore
        values[breakpoint.key]
      : mediaQueriesBreakpoints[index - 1].value;
  });

  const lastValidObject = getLastValidObject(mediaQueriesBreakpoints);

  if (!lastValidObject) {
    finalBreakPointResolvedValue = values;
  } else {
    finalBreakPointResolvedValue = lastValidObject.value;
  }
  return finalBreakPointResolvedValue;
};

export function useBreakpointValue(values: BreakPointValue) {
  let { width } = useWindowDimensions();
  if (typeof values !== "object") return values;

  const [currentBreakPointValue, setCurrentBreakPointValue] = useState(null);

  useEffect(() => {
    const finalBreakPointResolvedValue = getBreakPointValue(values, width);

    setCurrentBreakPointValue(finalBreakPointResolvedValue);
  }, [width]);

  return currentBreakPointValue;
}

export function isValidBreakpoint(
  breakPointWidth: any,
  width: any = Dimensions.get("window")?.width
) {
  const windowWidth = width;

  if (windowWidth >= breakPointWidth) {
    return true;
  }
  return false;
}

function getLastValidObject(mediaQueries: any) {
  for (let i = mediaQueries.length - 1; i >= 0; i--) {
    console.log(mediaQueries[i].isValid, mediaQueries[i].key);

    if (mediaQueries[i].isValid) {
      return mediaQueries[i];
    }
  }
  return null; // No valid object found
}
