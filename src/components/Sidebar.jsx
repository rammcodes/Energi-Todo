import React, { Component } from 'react'

class Sidebar extends Component {
  render() {
    const {
      categories,
      activeCatIndex,
      setActiveCat,
      showCatPopup,
      setCatPopup,
      currentCatText,
      onCatText,
      onCatSubmit,
      onCatDelete,
      sidebarSm
    } = this.props

    return (
      <div className="sidebar__wrapper">
        <div className={`sidebar ${sidebarSm ? ' sidebar--sm' : ''}`}>
          {showCatPopup ? (
            <div className="sidebar__cat-form-cont">
              <form onSubmit={onCatSubmit} className="sidebar__cat-form">
                <div onClick={setCatPopup} className="sidebar__cat-form-close">
                  <img src={require('../assets/close.svg').default} alt="" />
                </div>
                <div className="sidebar__cat-form-field">
                  <label htmlFor="" className="sidebar__cat-form-label">
                    Category Name
                  </label>
                  <input
                    onChange={(e) => onCatText(e)}
                    value={currentCatText}
                    type="text"
                    className="sidebar__cat-form-input"
                    placeholder="Enter Category Name"
                  />
                </div>
                <button type="submit" className="sidebar__cat-form-submit">
                  Submit
                </button>
              </form>
            </div>
          ) : null}
          <div className="sidebar__upper">
            <h2 className="sidebar__upper-title">Categories</h2>
            <button onClick={setCatPopup} className="sidebar__upper-action">
              +
            </button>
          </div>
          <div className="sidebar__cat-list-cont">
            {categories.length ? (
              <ul className="sidebar__cat-list">
                {categories.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      onClick={(e) => setActiveCat(e, idx)}
                      className={`sidebar__cat ${
                        activeCatIndex === idx ? 'sidebar__cat--active' : ''
                      }`}
                    >
                      <span>{item.name}</span>
                      <div
                        className="sidebar__cat-trash-icon-cont"
                        onClick={() => onCatDelete(idx)}
                      >
                        <img
                          className="sidebar__cat-trash-icon"
                          src={require('../assets/trash.svg').default}
                          alt="trash icon"
                        />
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
