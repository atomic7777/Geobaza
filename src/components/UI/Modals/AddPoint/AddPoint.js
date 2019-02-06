import React, { Component } from "react";
import classes from "./AddPoint.module.css";
import Hoc from "../../../../hoc/Hoc/Hoc";
import Button from "../../../UI/Button/Button";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

class AddPoint extends Component {
  state = {
    nr: "",
    x: "",
    y: "",
    h: "0",
    opis: "",
    data: "",
    showInfoModal: false,
    checkboxArchiveChecked: true,
    addButtonDisabled: "false"
  };

  handle_nr(event) {
    const val = event.target.value;

    this.setState({
      nr: val
    });
  }

  handle_x(event) {
    const val = event.target.value;
    this.setState({ x: val });
  }

  handle_y(event) {
    const val = event.target.value;
    this.setState({ y: val });
  }

  handle_h(event) {
    const val = event.target.value;
    this.setState({ h: val });
  }

  handle_opis(event) {
    const val = event.target.value;
    this.setState({ opis: val });
  }

  handle_data(event) {
    const val = event.target.value;
    const datevalid = isValidDate(val);
    if (datevalid) {
      this.setState({
        data: val,
        addButtonDisabled: "false"
      });
    } else {
      this.setState({
        data: val,
        addButtonDisabled: "true"
      });
    }
  }

  //zamykanie okna
  HandleShowInfoModalClose = () => {
    this.setState(() => {
      return { showInfoModal: false };
    });
  };

  HandleShowInfoModalShow = () => {
    this.setState(() => {
      return { showInfoModal: true };
    });
  };

  checkboxArchiveHandler(event) {
    this.setState(() => {
      return { checkboxArchiveChecked: event.target.checked };
    });
  }

  handleButtonDodaj() {
    console.log(this.state.x);
    axios
      .get(process.env.REACT_APP_URL+"add_single.php", {
        params: {
          user: "atomic77",
          pass: "88952430799468a1a3207807921affbe",
          nr: this.state.nr,
          x: this.state.x,
          y: this.state.y,
          h: this.state.h,
          opis: this.state.opis,
          data: this.state.data,
          copyTable: this.state.checkboxArchiveChecked
        }
      })
      .then(response => {
        let resp = response.data;
        this.setState(() => {
          return {
            InfoModalResponse: resp, //response.data,
            showInfoModal: true
          };
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    var today = new Date();
    today = today.toISOString().substring(0, 10);
    this.setState({ data: today });
  }

  render() {
    if (!this.props.show) return null;
    else {
      return (
        <Hoc>
          <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
          <div className={classes.AddPoint}>
            <div
              style={{
                textAlign: "center"
              }}
            >
              Dodaj punkt
            </div>
            <div>
              <div>
                Nr:
                <input
                  type="text"
                  value={this.state.nr}
                  onChange={this.handle_nr.bind(this)}
                />
              </div>
              <div>
                X:
                <input
                  type="text"
                  value={this.state.x}
                  onChange={this.handle_x.bind(this)}
                />
              </div>
              <div>
                Y:
                <input
                  type="text"
                  value={this.state.y}
                  onChange={this.handle_y.bind(this)}
                />
              </div>
              <div>
                H:
                <input
                  type="text"
                  value={this.state.h}
                  onChange={this.handle_h.bind(this)}
                />
              </div>
              <div>
                Opis:
                <input
                  type="text"
                  value={this.state.opis}
                  onChange={this.handle_opis.bind(this)}
                />
              </div>
              <div>
                Data:
                <input
                  type="text"
                  value={this.state.data}
                  onChange={this.handle_data.bind(this)}
                />
              </div>
            </div>
            <div
              style={{
                textAlign: "center"
              }}
            >
              <div>
                Dodaj punkt również do archiwum
                <input
                  type="checkbox"
                  defaultChecked="true"
                  onChange={this.checkboxArchiveHandler.bind(this)}
                />
              </div>
              <Button
                disabled={this.state.addButtonDisabled}
                clicked={this.handleButtonDodaj.bind(this)}
              >
                Dodaj
              </Button>
              <Button clicked={this.props.modalClosed}>Zamknij</Button>
              {this.state.showInfoModal && (
                <SweetAlert
                  warning
                  confirmBtnText="OK"
                  confirmBtnBsStyle="default" //cancelBtnBsStyle="default"
                  title="Dodawanie punktu"
                  onConfirm={this.HandleShowInfoModalClose.bind(this)}
                >
                  {this.state.InfoModalResponse}
                </SweetAlert>
              )}
            </div>
          </div>
        </Hoc>
      );
    }
  }
}

function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  var d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return false; // Invalid date
  return d.toISOString().slice(0, 10) === dateString;
}

export default AddPoint;
