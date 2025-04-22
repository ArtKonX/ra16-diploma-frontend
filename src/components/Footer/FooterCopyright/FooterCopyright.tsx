import './FooterCopyright.scss';

const FooterCopyright = (
    { textCopyright }:
        { textCopyright: string }) => {

    return (
        <div className="footer-copyright mt-4 text-start"
            dangerouslySetInnerHTML={{ __html: textCopyright }}></div>
    )
}

export default FooterCopyright