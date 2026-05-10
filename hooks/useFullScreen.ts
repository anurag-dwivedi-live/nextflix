"use client";

import { useEffect } from "react";

export default function useFullScreen(active: boolean) {
  useEffect(() => {
    if (active) {
      document.body.classList.add("theater-mode");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("theater-mode");
      document.body.style.overflow = "";
    }

    return () => {
      document.body.classList.remove("theater-mode");
      document.body.style.overflow = "";
    };
  }, [active]);
}
