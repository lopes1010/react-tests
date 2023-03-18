import React, { useState, useEffect } from "react";
import "./style.css";
function App() {
  let [items, setItems] = useState<number>(0);
  let [queue, setQueue] = useState<Array<number[]>>([[], [], [], [], []]);

  const addToQueue = (items: number) => {
    if (items === 0) return;
    let lineWithleastItems: number[];
    let leastItems = 1e9;
    queue.forEach((line) => {
      let itemsInLine = line.reduce((a, b) => a + b, 0);
      if (itemsInLine < leastItems) {
        leastItems = itemsInLine;
        lineWithleastItems = line;
      }
    });

    setItems(0);
    setQueue((prevLines) =>
      prevLines.map((line) =>
        line === lineWithleastItems ? [...line, items] : line
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setQueue((prevLines) =>
        prevLines.map((line) =>
          [line[0] - 1, ...line.slice(1)].filter((val) => val > 0)
        )
      );
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="page">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addToQueue(items);
        }}
      >
        <input
          type="number"
          min="0"
          value={items}
          onChange={(e) => {
            e.preventDefault();
            if (!Number.isNaN(e.target.valueAsNumber))
              setItems(e.target.valueAsNumber);
          }}
        ></input>
        <button type="submit">Checkout</button>
      </form>
      <div id="lines">
        <ul className="container">
          {queue.map((line, key) => {
            return (
              <li className="cashierLine" key={key}>
                {line ? (
                  <>
                    <div className="capacity">
                      {line.reduce((a, b) => a + b, 0)}
                    </div>
                    <ul className="cartWait">
                      {line.map((cart, key) => {
                        return (
                          <li className="cart" key={key}>
                            {cart}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  0
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
