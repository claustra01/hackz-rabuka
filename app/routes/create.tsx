import { createRoute } from "honox/factory";
import Create from "../islands/Create";
import { filterMiddleware } from "../middlewares/filter";

export default createRoute(filterMiddleware, (c) => {
	return c.render(<Create />);
});
