import Footer from "@src/components/Footer/Footer";
import Header from "@src/components/Header/Header";
import { memo, ReactNode } from "react";

const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

interface LayoutProps {
    classNamePage: string,
    children: ReactNode
}

const Layout = ({ classNamePage, children }: LayoutProps) => {

    return (
        <div className={`${classNamePage} container-page`}>
            <MemoizedHeader />
            <main className="container">{children}</main>
            <MemoizedFooter />
        </div>
    );
};

export default Layout;