import React from 'react';
import { GoBlink } from "../src";
import * as ReactDOM from "react-dom/client";

const text = [
  "Cloud Hosting",
  "Digital Media\n& Broadcasting",
  "Web Hosting",
  "Domain Services",
  "Web Development",
  "Disaster Recovery",
  "Network Security",
  "Global Networking",
  "Web-App Development",
  "On-Site IT Solutions",
  "Cloud Services",
  "Telecommunications",
  "Cloud Networking",
  "Web Security",
  "goSystem",
];

const Page = () => (
  <div>
    <div>
      <GoBlink
        prefix="We are"
        messages={text}
      />
      <GoBlink
        prefix="We are"
        messages={text}
      />
      <GoBlink
        prefix="We are"
        messages={text}
      />
      <GoBlink
        prefix="We are"
        messages={text}
      />
      <GoBlink
        prefix="We are"
        messages={text}
      />
      <GoBlink
        prefix="We are"
        messages={text}
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
