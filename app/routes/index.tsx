import { createRoute } from "honox/factory";
import Top from "../islands/Top";
import { filterMiddleware } from "../middlewares/filter";

export default createRoute(filterMiddleware, (c) => {
	return c.render(<Top />);
});
