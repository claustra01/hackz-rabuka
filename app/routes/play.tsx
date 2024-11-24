import { css } from "hono/css";
import { createRoute } from "honox/factory";
import GameDisplay from "../islands/GameDisplay";
import { filterMiddleware } from "../middlewares/filter";

const className = css`
  height: 100vh;
`;

export default createRoute(await filterMiddleware, (c) => {
	return c.render(
		<div class={className}>
			<GameDisplay />
		</div>,
	);
});
