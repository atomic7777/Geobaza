import React, { Component } from "react";
import classes from "./Layout.module.css";
import Hoc from "../../hoc/Hoc/Hoc";

class Layout extends Component {
    render() {
        return (
            <Hoc>
                <div>GeoBaza</div>
                <main className={classes.Layout}>{this.props.children}</main>
            </Hoc>
        );
    }
}

export default Layout;
