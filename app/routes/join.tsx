import { createRoute } from "honox/factory";
import Join from "../islands/Join";
import { filterMiddleware } from "../middlewares/filter";

export default createRoute(filterMiddleware, (c) => {
	return c.render(<Join />);
});
