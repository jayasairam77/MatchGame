import './index.css'

const TabItems = props => {
  const {tabDetails, activeTabId, onTabChange} = props
  const {displayText, tabId} = tabDetails
  const itemStyleCls = tabId === activeTabId ? 'active-item' : 'inactive-item'
  const onTabClick = () => {
    onTabChange(tabId)
  }
  return (
    <li className="tab-item">
      <button
        type="button"
        onClick={onTabClick}
        className={`item-btn ${itemStyleCls}`}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItems
