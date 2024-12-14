import { Coordinate } from "../constants";

export const getElementCoordinates = (element: HTMLElement): Coordinate => {
    if (!element) return { x: 0, y: 0 }; // Default value if the element doesn't exist
  
    const rect = element.getBoundingClientRect(); // Get the element's position relative to the viewport
    const x = Math.round(rect.left); // x-coordinate in the viewport
    const y = Math.round(rect.top + window.scrollY); // y-coordinate adjusted for vertical scrolling
  
    return { x, y };
  };