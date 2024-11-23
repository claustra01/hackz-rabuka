import { css } from "hono/css";
import { createRoute } from "honox/factory";
import ThreeCanvas from "../islands/threeCanvas";

const className = css`
  font-family: sans-serif;
`;

export default createRoute((c) => {
	const name = c.req.query("name") ?? "Hono";
	return c.render(
		<div class={className}>
			<ThreeCanvas />
		</div>,
	);
});
