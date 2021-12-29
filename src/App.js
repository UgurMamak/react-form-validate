import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';

import PrimaryForm from "./components/primaryForm";
import SecondaryForm from "./components/secondaryForm";
import TertiaryForm from "./components/tertiaryForm";
import FourthForm from "./components/fourthForm";

class App extends Component {
    render() {
        return (
            <div>
               {/* <FourthForm/>*/}
               {/* <PrimaryForm/>*/}
               <TertiaryForm/>
                <SecondaryForm/>
            </div>
        );
    }
}

export default App;