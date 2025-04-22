import Contacts from './Contacts/Contacts';
import './Footer.scss';
import FooterCopyright from './FooterCopyright/FooterCopyright';
import FooterMenu from './FooterMenu/FooterMenu';
import HeadingWithContentFooter from './HeadingWithContentFooter/HeadingWithContentFooter';
import ListPaySystems from './ListPaySystems/ListPaySystems';

const textCopyright = `2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров. Все права защищены.<br/>Доставка по всей России!`;

const Footer = () => {

    return (
        <footer className="container">
            <div className="row">
                <div className="pt-4 pb-4 row bg-light footer w-100 d-flex align-items-start justify-content-between">
                    <div className="col">
                        <HeadingWithContentFooter classText='' titleHeading='Информация' >
                            <FooterMenu />
                        </HeadingWithContentFooter>
                    </div>
                    <div className="col">
                        <HeadingWithContentFooter classText=''
                            titleHeading='Принимаем к оплате:' >
                            <ListPaySystems />
                        </HeadingWithContentFooter>
                        <section>
                            <FooterCopyright textCopyright={textCopyright} />
                        </section>
                    </div>
                    <div className="col text-right">
                        <HeadingWithContentFooter classText='footer-contacts align-items-end'
                            titleHeading='Контакты:' >
                            <Contacts />
                        </HeadingWithContentFooter>
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer