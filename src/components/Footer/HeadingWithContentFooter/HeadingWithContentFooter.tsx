import { ReactNode } from 'react';
import './HeadingWithContentFooter.scss';

interface HeadingWithContentFooterProps {
    classText: string;
    titleHeading: string;
    children: ReactNode;
}

const HeadingWithContentFooter = (
    { classText, titleHeading, children }:
        HeadingWithContentFooterProps) => {

    return (
        <section className={classText + ' mt-0 d-flex flex-column align-items-start justify-content-start'}>
            <h5 className="text-center mb-2 title-footer">{titleHeading}</h5>
            {children}
        </section>
    )
}

export default HeadingWithContentFooter