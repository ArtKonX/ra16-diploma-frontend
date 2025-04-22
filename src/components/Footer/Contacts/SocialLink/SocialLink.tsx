import './SocialLink.scss';

const SocialLink = ({ socialName }: { socialName: string }) => {

    return (
        <div className={`footer-social-link footer-social-link-${socialName}`}></div>
    )
}

export default SocialLink