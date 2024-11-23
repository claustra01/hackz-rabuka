import { css } from "hono/css";
import { createRoute } from "honox/factory";
import { FilesetResolver, AudioClassifier } from "@mediapipe/tasks-audio";
import { useState } from "hono/jsx";
import Counter from "../islands/counter";
import MicSwitch from "../islands/micSwitch";
import AudioClass from "../islands/audioClass";

const className = css`
  font-family: sans-serif;
`;

export default createRoute((c) => {
  const name = c.req.query("name") ?? "Hono";
  return c.render(
    <div class={className}>
      <AudioClass></AudioClass>
    </div>
  );
});
