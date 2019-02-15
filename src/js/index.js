// applicaion - MVC - Controller module

// include other files w/ webpack entry point
import "../css/styles.css";
import "../assets/static/favicon.ico"

// include references to external module files (Model & View)
import x from "./models/Sample";
import y from "./views/sampleView";

// test access to external modules
console.log('ES6-starter - webpack workflow')
console.log(`Imported ${x} from Sample Module!`);
console.log(`Imported ${y} from sampleView Module!`)

