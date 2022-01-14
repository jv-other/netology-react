import React, { useState } from "react";
import Collapse from "./components/Collapse/Collapse";

import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="example">
        <Collapse
          collapsedLabel="Подробнее"
          expandedLabel="Скрыть"
          isExpanded={true}
          onExpandedChange={expanded => console.log("Component expanded: ", expanded)}
        >
          <p>
            Альфа-Банк, основанный в 1990 году, является универсальным банком,
            осуществляющим все основные виды банковских операций, представленных
            на рынке финансовых услуг, включая обслуживание частных и корпоративных
            клиентов, инвестиционный банковский бизнес, торговое финансирование и т.д.
          </p>
        </Collapse>
      </div>
      <div className="example">
        <Collapse>
          <p>
            Альфа-Банк, основанный в 1990 году, является универсальным банком,
            осуществляющим все основные виды банковских операций, представленных
            на рынке финансовых услуг, включая обслуживание частных и корпоративных
            клиентов, инвестиционный банковский бизнес, торговое финансирование и т.д.
          </p>
        </Collapse>
      </div>
    </div>
  );
}

export default App;
