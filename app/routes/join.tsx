import { createRoute } from "honox/factory";
import Join from "../islands/Join";

export default createRoute((c) => {
	return c.render(<Join />);
});
