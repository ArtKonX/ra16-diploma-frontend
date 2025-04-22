import './Paragraph.scss';

interface ParagraphProps {
    classInfo: string,
    text: string
}

const Paragraph = ({classInfo, text}: ParagraphProps) => {

    return (
        <p className={`${classInfo} paragraph`}>{text}</p>
    )
}

export default Paragraph