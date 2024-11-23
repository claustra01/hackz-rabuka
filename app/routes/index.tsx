import { createRoute } from "honox/factory";
import Top from "../islands/Top";

export default createRoute((c) => {
  return c.render(<Top />);
});
