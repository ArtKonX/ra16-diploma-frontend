import './ContactsPage.scss';

import MainBanner from "@components/MainBanner/MainBanner"
import { memo } from "react"
import HeadingWithContent from "@components/HeadingWithContent/HeadingWithContent"
import Paragraph from "@src/components/uI/Paragraph/Paragraph"
import { Link } from 'react-router-dom';

import bannerSrc from '@assets/images/banner.jpg';

import contactInfo from '@data/contacts/contact-info.json';

const MemoizedMainBanner = memo(MainBanner);
const MemoizedHeadingWithContent = memo(HeadingWithContent);

const ContactsPage = () => {

    return (
        <div className="row">
            <div className="row p-0">
                <MemoizedMainBanner textBanner='К весне готовы!' bannerSrc={bannerSrc} />
                <MemoizedHeadingWithContent classText='top-sales' titleHeading='Контакты'>
                    <Paragraph classInfo='text-start mb-3' text={contactInfo.address} />
                    <h5 className="title-coors text-center">Координаты для связи:</h5>
                    <p className="text-contacts text-start mb-3">
                        Телефон:
                        <Link className='text-decoration-none text-secondary mb-1' to={`tel:${contactInfo.phoneHref}`}>
                            {contactInfo.phone}
                        </Link>
                        ({contactInfo.workingHours})
                    </p>
                    <p className="text-contacts text-start mb-3">
                        Email:
                        <Link className='text-decoration-none text-secondary mb-1' to={`mailto:${contactInfo.email}`}>
                            {contactInfo.email}
                        </Link>
                    </p>
                </MemoizedHeadingWithContent>
            </div>
        </div>
    )
}

export default ContactsPage