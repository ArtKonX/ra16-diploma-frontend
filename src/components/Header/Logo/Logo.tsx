import { Link } from "react-router-dom"

interface LogoProps {
    srcLogo: string,
    alt: string
}

const Logo = ({srcLogo, alt}: LogoProps) => {

    return (
        <Link className="navbar-brand" to="/">
            <img src={srcLogo} alt={alt} />
        </Link>
    )
}

export default Logo