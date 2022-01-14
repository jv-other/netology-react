import React from "react";
import Card, { CardImage } from "./components/Card/Card";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// default card button click handler
const onCardClick = e => e.target.classList.toggle("btn-primary");

const examples = [{
  title: "Card title",
  text: "Some quick example text to build on the card title and make up the bulk of the cards's content.",
  onClick: onCardClick
}, {
  title: "Special title treatment",
  text: "With supporting text below as a natural lead-in to additional content.",
  onClick: onCardClick
}, {
  title: "Other card sample",
  text: "Some quick example",
  onClick: onCardClick
}];

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Card {...examples[0]}>
            <CardImage src="logo512.png" alt="Image sample" />
          </Card>
        </div>
        <div className="col">
          <Card {...examples[1]} />
        </div>
        <div className="col">
          <Card {...examples[2]}>
            <div className="padding p-3">
              <img src="logo512.png" alt="Other image sample" className="img-thumbnail" />
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

export default App;
