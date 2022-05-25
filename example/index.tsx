import React from 'react';
import { GoBlink } from "../src";
import * as ReactDOM from "react-dom/client";

const Page = () => (
  <div>
    <div>
    <GoBlink
      prefix="We are'nt"
      messages={["Digital Media Broadcasting Services", "goSystem Solutions Limited"]}
      suffix="suffix"
      debug
    />
    </div>
    <p>
      The quick brown fox jumps over the lazy dog.
    </p>
  </div>
);

const container = document.getElementById("root") as HTMLDivElement;
const root = ReactDOM.createRoot(container);
root.render(<Page />);
