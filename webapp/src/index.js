import { render } from 'react-dom';
import $ from 'jquery';
import Popper from 'popper.js';
import app from './App';
import 'bootstrap';

window.jQuery = $;
window.$ = $;
window.Popper = Popper;

render(app(), document.getElementById('root'));
