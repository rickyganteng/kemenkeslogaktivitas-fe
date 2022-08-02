import React, { Component } from "react";
import styles from "./Dropdown.module.css";
import { ChevronDoubleUp, ChevronDoubleDown } from "react-bootstrap-icons";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: false,
      headerTitle: this.props.title,
    };
  }

  toggleList = () => {
    this.setState((prevState) => ({
      isListOpen: !prevState.isListOpen,
    }));
  };

  selectItem = (item) => {
    const { resetThenSet } = this.props;
    const { title, id, key } = item;

    this.setState(
      {
        headerTitle: title,
        isListOpen: false,
      },
      () => resetThenSet(id, title, key)
    );
  };

  render() {
    const { isListOpen, headerTitle } = this.state;
    const { list } = this.props;
    return (
      <>
        <div className="mb-3">
          <button
            type="button"
            className={`${styles.ddHeader} overflow-auto`}
            onClick={this.toggleList}
          >
            <div className="d-flex flex-row justify-content-between">
              <div className="mt-1">{headerTitle}</div>
              <div className="mt-1 mb-1">
                {isListOpen ? <ChevronDoubleUp /> : <ChevronDoubleDown />}
              </div>
            </div>
          </button>
          {isListOpen && (
            <div role="list">
              {list.map((item) => (
                <button
                  type="button"
                  className={`${styles.ddListItem} overflow-auto`}
                  key={item.id}
                  onClick={() => this.selectItem(item)}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}
export default Dashboard;
