import { Coordinate } from "../constants";

export const getElementCoordinates = (element: HTMLElement): Coordinate => {
  if (!element) return { x: 0, y: 0 }; 

  const rect = element.getBoundingClientRect();
  const x = Math.round(rect.left);
  const y = Math.round(rect.top + window.scrollY);

  return { x, y };
};