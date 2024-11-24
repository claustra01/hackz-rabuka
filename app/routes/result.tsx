import { createRoute } from "honox/factory";
import Result from "../islands/Result";
import { filterMiddleware } from "../middlewares/filter";

export default createRoute(await filterMiddleware, (c) => {
	return c.render(<Result />);
});
