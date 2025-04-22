import { Link } from 'react-router-dom';
import './LinkContact.scss';

interface LinkContactProps {
    contactText: string,
    contactType: string,
    contactHref: string
}

const LinkContact = ({ contactText, contactType, contactHref }:
    LinkContactProps) => {

    return (
        <Link className={`footer-contacts-${contactType} text-decoration-none text-secondary mb-1`}
            to={contactHref}>
            {contactText}
        </Link>
    )
}

export default LinkContact