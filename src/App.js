import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';

import PrimaryForm from "./components/primaryForm";
import SecondaryForm from "./components/secondaryForm";

class App extends Component {
    render() {
        return (
            <div>
               {/* <PrimaryForm/>*/}
                <SecondaryForm/>
            </div>
        );
    }
}

export default App;