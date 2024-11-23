import { createRoute } from "honox/factory";
import Battle from "../islands/Battle";

export default createRoute((c) => {
	return c.render(<Battle />);
});
