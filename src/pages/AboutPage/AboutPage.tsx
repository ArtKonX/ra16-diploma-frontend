import aboutUsData from '@data/about-us/about-us-list-data.json';
import aboutUsParagraphsData from '@data/about-us/about-us-paragraphs-data.json';

import bannerSrc from '@assets/images/banner.jpg';

import MainBanner from "@components/MainBanner/MainBanner"
import { memo } from "react"
import HeadingWithContent from "@components/HeadingWithContent/HeadingWithContent"
import ListAboutUs from "@src/components/about-us/ListAboutUs/ListAboutUs";
import Paragraph from "@src/components/ui/Paragraph/Paragraph";

const MemoizedMainBanner = memo(MainBanner);
const MemoizedHeadingWithContent = memo(HeadingWithContent);

const AboutPage = () => {

    return (
        <div className="row">
            <div className="row p-0">
                <MemoizedMainBanner textBanner='К весне готовы!' bannerSrc={bannerSrc} />
                <MemoizedHeadingWithContent classText='top-sales' titleHeading='О магазине'>
                    <Paragraph classInfo='text-start mb-3' text={aboutUsParagraphsData[0].title} />
                    <Paragraph classInfo='h4 text-center pt-4' text={aboutUsParagraphsData[1].title} />
                    <ListAboutUs aboutUsData={aboutUsData} />
                    <Paragraph classInfo='text-start mb-3' text={aboutUsParagraphsData[2].title} />
                    <Paragraph classInfo='text-start mb-3' text={aboutUsParagraphsData[3].title} />
                </MemoizedHeadingWithContent>
            </div>
        </div>
    )
}

export default AboutPage