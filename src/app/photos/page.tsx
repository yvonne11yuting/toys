import { PhotoType } from '@/common.types';
import PhotoList from '@/components/PhotoList'
import { getPhotos } from '@/lib/actions';


const Photos = async () => {
    const result = await getPhotos() as PhotoType[]

    return (
        <div className="photos-grid">
            <PhotoList data={result} />
        </div>
    )
}

export default Photos