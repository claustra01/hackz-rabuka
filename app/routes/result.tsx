import { createRoute } from "honox/factory";
import Result from "../islands/Result";

export default createRoute((c) => {
	return c.render(<Result />);
});
