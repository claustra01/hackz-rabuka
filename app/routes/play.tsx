import { css } from "hono/css";
import { createRoute } from "honox/factory";
import GameDisplay from "../islands/GameDisplay";

const className = css`
  font-family: sans-serif;
`;

export default createRoute((c) => {
	const name = c.req.query("name") ?? "Hono";
	return c.render(
		<div class={className}>
			<GameDisplay />
		</div>,
	);
});
