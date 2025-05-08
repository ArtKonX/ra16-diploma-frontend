import MainBanner from "@src/components/MainBanner/MainBanner";
import { useEffect } from "react";

import notFoundData from '@data/not-found/not-found-data.json';

import bannerSrc from '@assets/images/banner.jpg';
import HeadingWithContent from "@src/components/HeadingWithContent/HeadingWithContent";
import Paragraph from "@ui/Paragraph/Paragraph";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/redux/store";
import { removeIsSearching } from "@src/redux/slices/CatalogSlice";

const NotFound = () => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(removeIsSearching())
    }, [])

    return (
        <div className="row">
            <div className="row p-0">
                <MainBanner textBanner='К весне готовы!' bannerSrc={bannerSrc} />
                <HeadingWithContent classText='top-sales' titleHeading={notFoundData.title}>
                    <Paragraph classInfo='mb-0 fs-3 text-center' text={notFoundData.text} />
                </HeadingWithContent>
            </div>
        </div>
    )
}

export default NotFound