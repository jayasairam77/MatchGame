import {Component} from 'react'

import TabItems from '../TabItems'

import ImgItem from '../ImgItem'

import './index.css'

class HomePage extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = props
    this.state = {
      score: 0,
      timer: 60,
      tabsList,
      imagesList,
      matchingImg: imagesList[0].imageUrl,
      matchingImgId: imagesList[0].id,
      activeTabId: tabsList[0].tabId,
      renderResult: false,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {timer} = this.state
    if (timer === 0) {
      clearInterval(this.timerId)
      this.setState({renderResult: true})
    } else {
      this.setState({timer: timer - 1})
    }
  }

  changeMatchingImg = () => {
    const {imagesList, score} = this.state
    const listLength = imagesList.length
    const ind = Math.round(Math.random() * listLength - 1)
    this.setState({
      matchingImg: imagesList[ind].imageUrl,
      matchingImgId: imagesList[ind].id,
      score: score + 1,
    })
  }

  onTabChange = tabId => {
    const {tabsList} = this.state
    this.setState({
      activeTabId: tabsList.find(eachTab => eachTab.tabId === tabId).tabId,
    })
  }

  onBannerBtnClick = id => {
    const {matchingImgId, score} = this.state
    if (matchingImgId === id) {
      this.changeMatchingImg()
      // this.setState({score: score + 1})
    } else if (matchingImgId !== id) {
      clearInterval(this.timerId)
      this.setState({renderResult: true})
    }
  }

  onResetBtnClick = () => {
    this.setState({renderResult: false, score: 0, timer: 60})
    this.componentDidMount()
  }

  renderGameCard = () => {
    const {matchingImg, tabsList, activeTabId, imagesList} = this.state
    const filterdImgsList = imagesList.filter(
      eachImage => eachImage.category === activeTabId,
    )
    return (
      <div className="main-card">
        <div className="matching-img">
          <img src={matchingImg} alt="match" className="matching-img" />
        </div>
        <ul className="tabs-card">
          {tabsList.map(eachTab => (
            <TabItems
              tabDetails={eachTab}
              activeTabId={activeTabId}
              onTabChange={this.onTabChange}
              key={eachTab.tabId}
            />
          ))}
        </ul>
        <div className="category-imgs">
          <ul className="category-imgs-card">
            {filterdImgsList.map(eachImg => (
              <ImgItem
                imgDetails={eachImg}
                onBannerBtnClick={this.onBannerBtnClick}
                key={eachImg.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderGameResultCard = () => {
    const {score} = this.state
    return (
      <div className="game-result-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="trophy-img"
        />
        <p>YOUR SCORE</p>
        <p>{score}</p>
        <div className="play-again-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
          />
          <button onClick={this.onResetBtnClick}>PLAY AGAIN</button>
        </div>
      </div>
    )
  }

  render() {
    const {score, timer, renderResult} = this.state

    return (
      <div className="app-container">
        <div className="app-nav-container">
          <ul className="log-card">
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                alt="website logo"
                className="website-logo"
              />
            </li>
          </ul>
          <ul className="nav-text-card">
            <li className="score-card">
              <p>Score: {score}</p>
            </li>
          </ul>
          <ul className="nav-timer-card">
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-img"
              />
              <p>{timer} sec</p>
            </li>
          </ul>
        </div>
        {renderResult ? this.renderGameResultCard() : this.renderGameCard()}
      </div>
    )
  }
}

export default HomePage
