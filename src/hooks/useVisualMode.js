import React, { useState } from "react";


export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //if replace is true, we don't want to add the transition
  //to the history array so when we hit back we are brought 
  //back 2 steps instead of 1.
  function transition(currentMode, replace = false) {
    if (replace) {
      setMode(currentMode)
    } else {
      setMode(currentMode)
      setHistory([...history, currentMode])
    }
  }

  function back() {
    if (history.length > 1) {
      let prevMode = history[history.length - 2];
      setHistory(history.slice(0, history.length - 1));
      setMode(prevMode)
    }
  }

  return { mode, transition, back };
};

