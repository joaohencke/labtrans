import { render } from "react-dom";
import $ from "jquery";
import Popper from "popper.js";
import app from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "react-datepicker/dist/react-datepicker.css";
import "toastr/build/toastr.css";
window.jQuery = $;
window.$ = $;
window.Popper = Popper;

render(app(), document.getElementById("root"));
