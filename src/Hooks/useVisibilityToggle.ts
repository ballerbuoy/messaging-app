import { useState, useCallback } from "react";

export const useVisibilityToggle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const show = useCallback(() => setIsVisible(true), [setIsVisible]);
  const hide = useCallback(() => setIsVisible(false), [setIsVisible]);

  return { isVisible, show, hide };
};
