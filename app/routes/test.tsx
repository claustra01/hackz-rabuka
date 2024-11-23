import { createRoute } from "honox/factory";
import Test from "../islands/Test";

export default createRoute((c) => {
	return c.render(<Test />);
});
