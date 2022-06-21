import React from "react";
import { GoTyping } from "../src";
import * as ReactDOM from "react-dom/client";

const Page = () => (
  <div
    style={{
      width: "200px",
      border: "solid",
    }}
  >
    <h1>Example Page</h1>
    <GoTyping
      prefix="Welcome to"
      messages={[
        "the house of fun",
        "the United Kingdom",
        "Greggs",
        "Crossrail, also known as the Elizabeth Line",
      ]}
    />
  </div>
);

const container = document.getElementById("root") as HTMLDivElement;
const root = ReactDOM.createRoot(container);
root.render(<Page />);
