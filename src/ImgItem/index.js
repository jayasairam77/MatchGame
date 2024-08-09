import './index.css'

const ImgItem = props => {
  const {imgDetails, onBannerBtnClick} = props
  const {id, thumbnailUrl} = imgDetails
  const onBannerBtnImgClick = () => {
    onBannerBtnClick(id)
  }
  return (
    <li>
      <button type="button" onClick={onBannerBtnImgClick}>
        <img src={thumbnailUrl} alt="thumbnail" className="banner-img" />
      </button>
    </li>
  )
}

export default ImgItem
