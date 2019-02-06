import React, { Component } from "react";
import Geobaza from "./containers/Geobaza/Geobaza";
import Layout from "./components/Layout/Layout";

//modules

class App extends Component {
    render() {
        return (
            <Layout>
                <Geobaza />
            </Layout>
        );
    }
}

export default App;
