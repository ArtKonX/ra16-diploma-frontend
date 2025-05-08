import Footer from "@src/components/Footer/Footer";
import Header from "@src/components/Header/Header";
import { ReactNode } from "react";

interface LayoutProps {
    classNamePage: string,
    children: ReactNode
}

const Layout = ({ classNamePage, children }: LayoutProps) => {

    return (
        <div className={`${classNamePage} container-page`}>
            <Header />
            <main className="container">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;