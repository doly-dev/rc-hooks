import React from "react";
import { Link } from "react-router-dom";

import { demos } from "~/rc-hooks-demo";

export default function Home() {
  return (
    <>
      <h2>rc-hooks</h2>
      <ul>
        {
          demos.map(item => (
            <li key={item.name}><Link to={`/example/${item.name}`}>{item.name}</Link> - {item.description}</li>
          ))
        }
      </ul>
    </>
  );
}
