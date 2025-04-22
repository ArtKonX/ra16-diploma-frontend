import { ReactNode } from 'react';
import './HeadingWithContent.scss';

interface HeadingWithContentProps {
    classText: string,
    titleHeading: string,
    children: ReactNode
}

const HeadingWithContent = (
    { classText, titleHeading, children }:
        HeadingWithContentProps) => {

    return (
        <section className={classText + ' mt-5 mb-5'}>
            <h2 className="title-content text-center mb-5">{titleHeading}</h2>
            {children}
        </section>
    )
}

export default HeadingWithContent