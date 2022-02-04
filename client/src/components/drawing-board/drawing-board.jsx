import React, { useEffect, useState, useRef } from "react";
import Excalidraw, {
  exportToCanvas,
  exportToSvg,
  exportToBlob,
} from "@excalidraw/excalidraw";
import InitialData from "./initial-data.js";

import styles from "./drawing-board.module.css";

import TopRightUI from "./components/renderTopUI";
import DrawingFooter from "./components/render-footer";

function DrawingBoard() {
  const excalidrawRef = useRef(null);

  // Data for excalidraw
  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [blobUrl, setBlobUrl] = useState(null);
  const [canvasUrl, setCanvasUrl] = useState(null);
  const [exportWithDarkMode, setExportWithDarkMode] = useState(false);
  const [shouldAddWatermark, setShouldAddWatermark] = useState(false);
  const [theme, setTheme] = useState("light");

  // Event listener: listens for libarary imports
  useEffect(() => {
    const onHashChange = () => {
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const libraryUrl = hash.get("addLibrary");
      console.log(libraryUrl);
      console.log(hash.get("token"));
      if (libraryUrl) {
        excalidrawRef.current.importLibrary(libraryUrl, hash.get("token"));
      }
    };

    window.addEventListener("hashchange", onHashChange, false);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  // update scene data (can be used to store user files)
  const updateScene = () => {
    const sceneData = {
      elements: [
        // {
        //   type: "rectangle",
        //   version: 141,
        //   versionNonce: 361174001,
        //   isDeleted: false,
        //   id: "oDVXy8D6rom3H1-LLH2-f",
        //   fillStyle: "hachure",
        //   strokeWidth: 1,
        //   strokeStyle: "solid",
        //   roughness: 1,
        //   opacity: 100,
        //   angle: 0,
        //   x: 100.50390625,
        //   y: 93.67578125,
        //   strokeColor: "#c92a2a",
        //   backgroundColor: "transparent",
        //   width: 186.47265625,
        //   height: 141.9765625,
        //   seed: 1968410350,
        //   groupIds: []
        // }
      ],
      appState: {
        viewBackgroundColor: "#edf2ff",
      },
    };
    excalidrawRef.current.updateScene(sceneData);
  };

  // main content
  return (
    <div className={styles.overallWrapper}>
      {/* <div className="bu">
        <button className="update-scene" onClick={updateScene}>
          Update Scene
        </button>
        <button
          className="reset-scene"
          onClick={() => {
            excalidrawRef.current.resetScene();
          }}
        >
          Reset Scene
        </button>
        <label>
          <input
            type="checkbox"
            checked={viewModeEnabled}
            onChange={() => setViewModeEnabled(!viewModeEnabled)}
          />
          View mode
        </label>
        <label>
          <input
            type="checkbox"
            checked={zenModeEnabled}
            onChange={() => setZenModeEnabled(!zenModeEnabled)}
          />
          Zen mode
        </label>
        <label>
          <input
            type="checkbox"
            checked={gridModeEnabled}
            onChange={() => setGridModeEnabled(!gridModeEnabled)}
          />
          Grid mode
        </label>
        <label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={() => {
              let newTheme = "light";
              if (theme === "light") {
                newTheme = "dark";
              }
              setTheme(newTheme);
            }}
          />
          Switch to Dark Theme
        </label>
      </div> */}
      <div className={styles.excalidrawWrapper}>
        <Excalidraw
          ref={excalidrawRef}
          initialData={InitialData}
          // onChange={(elements, state) =>
          //   console.log("Elements :", elements, "State : ", state)
          // }
          // onPointerUpdate={(payload) => console.log(payload)}
          onCollabButtonClick={() =>
            window.alert("You clicked on collab button")
          }
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
          theme={theme}
          name="Custom name of drawing"
          UIOptions={{ canvasActions: { theme: false } }}
          renderTopRightUI={TopRightUI}
          renderFooter={DrawingFooter}
          handleKeyboardGlobally={false}
          onLibraryChange={(items) => {
            console.log("ON LIB CHANGE");
            console.log(items);
          }}
        />
      </div>

      {/* <div className="export-wrapper button-wrapper">
        <label className="export-wrapper__checkbox">
          <input
            type="checkbox"
            checked={exportWithDarkMode}
            onChange={() => setExportWithDarkMode(!exportWithDarkMode)}
          />
          Export with dark mode
        </label>
        <label className="export-wrapper__checkbox">
          <input
            type="checkbox"
            checked={shouldAddWatermark}
            onChange={() => setShouldAddWatermark(!shouldAddWatermark)}
          />
          Add Watermark
        </label>
        <button
          onClick={() => {
            const svg = exportToSvg({
              elements: excalidrawRef.current.getSceneElements(),
              appState: {
                ...InitialData.appState,
                exportWithDarkMode,
                shouldAddWatermark,
              },
            });
            document.querySelector(".export-svg").innerHTML = svg.outerHTML;
          }}
        >
          Export to SVG
        </button>
        <div className="export export-svg"></div>

        <button
          onClick={async () => {
            const blob = await exportToBlob({
              elements: excalidrawRef.current.getSceneElements(),
              mimeType: "image/png",
              appState: {
                ...InitialData.appState,
                exportWithDarkMode,
                shouldAddWatermark,
              },
            });
            setBlobUrl(window.URL.createObjectURL(blob));
          }}
        >
          Export to Blob
        </button>
        <div className="export export-blob">
          <img src={blobUrl} alt="" />
        </div>

        <button
          onClick={() => {
            const canvas = exportToCanvas({
              elements: excalidrawRef.current.getSceneElements(),
              appState: {
                ...InitialData.appState,
                exportWithDarkMode,
                shouldAddWatermark,
              },
            });
            setCanvasUrl(canvas.toDataURL());
          }}
        >
          Export to Canvas
        </button>
        <div className="export export-canvas">
          <img src={canvasUrl} alt="" />
        </div>
      </div> */}
    </div>
  );
}

export default DrawingBoard;
