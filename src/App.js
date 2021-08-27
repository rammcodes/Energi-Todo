import React, { Component } from 'react'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import initialCategories from './data/InitialCategories'
import './App.scss'

class App extends Component {
  state = {
    activeCatIndex: 0,
    taskText: '',
    currentCatText: '',
    showCatPopup: false,
    categories: localStorage.getItem('categories')
      ? JSON.parse(localStorage.getItem('categories'))
      : initialCategories,
    sidebarSm: true,
  }

  setCatPopup = () => {
    this.setState((prevState) => ({
      showCatPopup: !prevState.showCatPopup,
    }))
  }

  onCatText = (e) => {
    this.setState({
      currentCatText: e.target.value,
    })
  }

  onCatSubmit = (e) => {
    e.preventDefault()

    const categories = JSON.parse(JSON.stringify(this.state.categories))

    if (this.state.currentCatText.length) {
      const catObj = {
        name: this.state.currentCatText,
        tasks: [],
      }
      categories.push(catObj)
      localStorage.setItem('categories', JSON.stringify(categories))
      this.setState({ categories, showCatPopup: false, currentCatText: '' })
    }
  }

  onCatDelete = (idx) => {
    let categories = JSON.parse(JSON.stringify(this.state.categories))
    categories = categories.filter((item, i) => i !== idx)

    localStorage.setItem('categories', JSON.stringify(categories))

    this.setState({
      categories,
      activeCatIndex: 0,
    })
  }

  onTaskText = (e) => {
    this.setState({
      taskText: e.target.value,
    })
  }

  onTaskSubmit = (e) => {
    e.preventDefault()

    const categories = JSON.parse(JSON.stringify(this.state.categories))

    if (!this.state.categories.length) {
      return alert('No Categories Found')
    }

    if (this.state.taskText.length) {
      categories[this.state.activeCatIndex].tasks.push({
        title: this.state.taskText,
      })

      localStorage.setItem('categories', JSON.stringify(categories))

      this.setState({
        categories,
        taskText: '',
      })
    }
  }

  onTaskDelete = (idx) => {
    const categories = JSON.parse(JSON.stringify(this.state.categories))
    categories[this.state.activeCatIndex].tasks = categories[
      this.state.activeCatIndex
    ].tasks.filter((item, i) => i !== idx)

    localStorage.setItem('categories', JSON.stringify(categories))

    this.setState({
      categories,
    })
  }

  setActiveCat = (e, idx) => {
    if (e.target !== e.currentTarget) return
    this.setState({
      activeCatIndex: idx,
      sidebarSm: true
    })
  }

  setSmallSidebar = (val) => {
    this.setState({
      sidebarSm: val,
    })
  }

  render() {
    return (
      <div className="app">
        <Sidebar
          categories={this.state.categories}
          activeCatIndex={this.state.activeCatIndex}
          setActiveCat={this.setActiveCat}
          showCatPopup={this.state.showCatPopup}
          sidebarSm={this.state.sidebarSm}
          setCatPopup={this.setCatPopup}
          currentCatText={this.state.currentCatText}
          onCatText={this.onCatText}
          onCatSubmit={this.onCatSubmit}
          onCatDelete={this.onCatDelete}
        />
        <Main
          categories={this.state.categories}
          activeCatIndex={this.state.activeCatIndex}
          taskText={this.state.taskText}
          onTaskText={this.onTaskText}
          onTaskSubmit={this.onTaskSubmit}
          onTaskDelete={this.onTaskDelete}
          setSmallSidebar={this.setSmallSidebar}
        />
      </div>
    )
  }
}

export default App
