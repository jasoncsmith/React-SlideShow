import { IImage } from './slider';

const slideWidth = 495;

const SlideImage = ({ name, alt }: IImage) => {
    return (
        <img
            className="slider__slide"
            src={`images/${name}`}
            alt={alt}
            title={alt}
            height={350}
            width={slideWidth}
        />
    );
};
export default SlideImage;
