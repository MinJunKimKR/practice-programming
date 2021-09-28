import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

/*
 */

const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    console.log("no noti");
    return;
  }
  const fireNotif = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          console.log("not permited");
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return fireNotif;
};
const App = () => {
  const triggerNotif = useNotification("Can I steal your kimchi", {
    body: "ya",
  });
  return (
    <div className="App">
      <button onClick={triggerNotif}>onClick</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
