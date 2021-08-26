import React, { Component } from 'react'

class Main extends Component {
  state = {}
  render() {
    const {
      categories,
      activeCatIndex,
      taskText,
      onTaskText,
      onTaskSubmit,
      onTaskDelete,
      setSmallSidebar
    } = this.props
    return (
      <div className="main">
        <form onSubmit={onTaskSubmit} className="task-form">
          <input
            className="task-form__input"
            placeholder="Enter Task Here..."
            value={taskText}
            onChange={onTaskText}
          />
          <button className="task-form__submit">
            <img
              className="task-form__submit-icon"
              src={require('../assets/arrow-right.svg').default}
              alt="Submit Icon"
            />
          </button>
        </form>
        <div className="tasks">
          {categories.length ? (
            <div className="tasks__list">
              {categories[activeCatIndex].tasks.map((item, idx) => {
                return (
                  <div key={idx} className="tasks__list-item">
                    <div className="tasks__list-item-upper">
                      <span className="tasks__list-item-cat-name">
                        {categories[activeCatIndex].name}
                      </span>
                      <span
                        onClick={() => onTaskDelete(idx)}
                        className="tasks__list-item-trash-icon-cont"
                      >
                        <img
                          src={require('../assets/trash-dark.svg').default}
                          alt="trash icon"
                          className="tasks__list-item-trash-icon"
                        />
                      </span>
                    </div>
                    <h3 className="tasks__list-item-heading">{item.title}</h3>
                    <p className="tasks__list-item-desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Velit repellendus sit
                    </p>
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
        <button onClick={() => setSmallSidebar(false)} className="sidebar-btn">
            Categories
        </button>
      </div>
    )
  }
}

export default Main
