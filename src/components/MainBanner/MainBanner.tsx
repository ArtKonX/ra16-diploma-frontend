import './MainBanner.scss';

interface MainBannerProps {
    bannerSrc: string,
    textBanner: string
}

const MainBanner = (
    { bannerSrc, textBanner }:
        MainBannerProps) => {

    return (
        <div className="banner p-0">
            <img src={bannerSrc} className="img-fluid w-100"
                alt="К весне готовы!" />
            <h2 className="banner-header">{textBanner}</h2>
        </div>
    )
}

export default MainBanner