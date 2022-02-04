import { useState, useRef } from "react";

export default function ResizingDragbar({ itemOne, itemTwo }) {
  const [firstElementWidth, setFirstElementWidth] = useState(-1);
  const [dragging, setDragging] = useState(false);

  const handleMouseMove = (event) => {
    if (!dragging) {
      return;
    }
    
    

    setFirstElementWidth(event.clientX);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
      onMouseMove={handleMouseMove}
    >
      <div
        style={{
          width: firstElementWidth < 0 ? "50vw" : firstElementWidth,
        }}
      >
        {itemOne}
      </div>
      <div
        style={{
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          height: "100vh",
          cursor: "ew-resize",
        }}
        onMouseDown={() => {
          setDragging(true);
        }}
        onMouseUp={() => {
          setDragging(false);
        }}
      >
        <div
          style={{
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
            height: "100%",
          }}
        ></div>
      </div>

      <div
        style={{
          flexGrow: 1,
          backgroundColor: "greenyellow"
        }}
      >
        {itemTwo}
      </div>
    </div>
  );
}
