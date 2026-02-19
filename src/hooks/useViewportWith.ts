import { useEffect, useState } from "react";

export function useViewportWith(matchFunction: (value: number) => boolean) {
  const [width, setWidth] = useState(window.innerWidth);

  function setValues() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", () => setValues());
    // return () => {
    //   window.removeEventListener("resize", setValues);
    // }
  }, []);

  const match: boolean = matchFunction(width);

  return match;
}