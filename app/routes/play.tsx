import { createRoute } from "honox/factory";
import GameDisplay from "../islands/GameDisplay";
import { filterMiddleware } from "../middlewares/filter";

export default createRoute(await filterMiddleware, (c) => {
	return c.render(<GameDisplay />);
});
