import MainBanner from "@src/components/MainBanner/MainBanner";
import { memo } from "react";

import notFoundData from '@data/not-found/not-found-data.json';

import bannerSrc from '@assets/images/banner.jpg';
import HeadingWithContent from "@src/components/HeadingWithContent/HeadingWithContent";
import Paragraph from "@ui/Paragraph/Paragraph";

const MemoizedMainBanner = memo(MainBanner);
const MemoizedHeadingWithContent = memo(HeadingWithContent);

const NotFound = () => {

    return (
        <div className="row">
            <div className="row p-0">
                <MemoizedMainBanner textBanner='К весне готовы!' bannerSrc={bannerSrc} />
                <MemoizedHeadingWithContent classText='top-sales' titleHeading={notFoundData.title}>
                    <Paragraph classInfo='mb-0 fs-3 text-center' text={notFoundData.text} />
                </MemoizedHeadingWithContent>
            </div>
        </div>
    )
}

export default NotFound