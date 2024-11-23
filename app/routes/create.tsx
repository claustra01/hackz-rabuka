import { createRoute } from "honox/factory";
import Create from "../islands/Create";

export default createRoute((c) => {
	return c.render(<Create />);
});
