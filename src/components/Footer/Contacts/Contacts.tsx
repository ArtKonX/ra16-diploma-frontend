import './Contacts.scss';
import LinkContact from './LinkContact/LinkContact';
import SocialLink from './SocialLink/SocialLink';

import contactInfo from '@data/contacts/contact-info.json';

const Contacts = () => {

    return (
        <>
            <LinkContact contactText={contactInfo.phone} contactType='phone' contactHref={`tel:${contactInfo.phoneHref}`} />
            <span className="footer-contacts-working-hours mb-1">{contactInfo.workingHours}</span>
            <LinkContact contactText={contactInfo.email} contactType='email' contactHref={`mailto:${contactInfo.email}`} />
            <div className="footer-social-links mt-2">
                <SocialLink socialName='twitter' />
                <SocialLink socialName='vk' />
            </div>
        </>
    )
}

export default Contacts