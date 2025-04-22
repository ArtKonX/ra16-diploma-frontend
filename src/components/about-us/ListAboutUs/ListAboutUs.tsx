import './ListAboutUs.scss';

interface AboutUsData {
    id: number,
    title: string
}

const ListAboutUs = ({ aboutUsData }: { aboutUsData: AboutUsData[] }) => {

    return (
        <ol className='m-5 list-about-us'>
            {aboutUsData.map(elem => (<li key={elem.id}
                className='text-start mb-3'>
                {elem.title}
            </li>))}
        </ol>
    )
}

export default ListAboutUs