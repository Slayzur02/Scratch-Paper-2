import { useState } from "react";
import styles from "./tabs.module.css";

function Tabs({tabContentItem}) {
  const [numTabs, setNumTabs] = useState(1);

  const [activeTab, setActiveTab] = useState(0);

  const [tabHeaders, setTabHeaders] = useState(["Untitled[0]"]);
  const [tabContent, setTabContent] = useState([tabContentItem]);

  const changeTabName = (e, index) => {
    setTabHeaders((prevTabs) => {
      let newArr = [...prevTabs];
      newArr[index] = e.target.value;
      console.log(newArr);
      return newArr;
    });
  };

  // const Content = () => {
  //   if (activeTab === -1) {
  //     return <h1>No file is open</h1>;
  //   }
  //   const content = <div>{tabContent[activeTab]}</div>;
  //   return content;
  // };

  const createNewTab = () => {
    setTabHeaders([...tabHeaders, `Untitled[${numTabs}]`]);
    setTabContent([...tabContent, tabContentItem]);
    setActiveTab(numTabs);
    setNumTabs(numTabs + 1);
  };

  const inputCheck = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
      return;
    }
    if (e.keyCode === 9) {
      if (activeTab === numTabs - 1) {
        return;
      }
      setActiveTab(activeTab + 1);
      console.log("SET ACTIVE TAB");
    }
  };

  const removeItem = (index) => {
    setTabHeaders((prevTabs) => {
      return [...prevTabs.slice(0, index), ...prevTabs.slice(index + 1)];
    });
    setActiveTab(numTabs-2);
    setNumTabs(numTabs - 1);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.overallWrapper}>
        <div className={styles.tabWrapper}>
          {/* <AllTabs/> */}
          {tabHeaders.map((item, index) => (
            <div
              className={index === activeTab ? styles.activeTab : styles.tab}
              key={index}
            >
              <input
                type="text"
                value={tabHeaders[index]}
                onClick={() => {
                  setActiveTab(index);
                }}
                onChange={(e) => {
                  changeTabName(e, index);
                }}
                onKeyDown={(e) => {
                  inputCheck(e);
                }}
                style = {{
                  height: "30px",
                }}
              ></input>
              <button
                onClick={() => removeItem(index)}
                className={styles.xButton}
              >
                x
              </button>
            </div>
          ))}
          <div className={styles.tab} onClick={createNewTab}>
            +
          </div>
        </div>

        {tabContent.map((item, index) => (
          <div key = {index}
          className = {index === activeTab ? styles.content : styles.hidden}>
            {item}
          </div>)
        )}
      </div>
    </div>
  );

  // return (
  //   <div className = {styles.layout}>
  //     <div className={styles.overallWrapper}>
  //       <div className={styles.tabWrapper}>
  //         <div className={styles.activeTab}>Tab 1</div>
  //         <div className={styles.tab}>Tab 2</div>
  //       </div>
  //       <div>
  //         <div>
  //           <h1>Content 1</h1>
  //           <p>This is some very interesting text.... Hahahah</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Tabs;
