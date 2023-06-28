import React, { useEffect, useState, useCallback, useRef } from 'react';
import Caption from './caption';
import MenuItem from './menuItem';
import SlideImage from './SlideImage';
import db from '../../data/db.json';
import './slider.scss';

export interface IData {
    id: number;
    client: string;
    clientId: string;
    year: number;
    url: string;
    role: string;
    projectName: string;
    projectDescription: string;
    fragment: string;
    skills: string;
    software: string;
    longDesc: string;
    image: IImage;
}

export interface IImage {
    width: string;
    height: string;
    alt: string;
    name: string;
}
const durationSlide = 375;
const durationCaption = 450;
const durationTimeout = 250;
const timer = 3000;
const data: IData[] = db;

function Slider() {
    const intervalRef = useRef<number | undefined>();
    const [index, setIndex] = useState(0);
    const [viewingIndex, setViewingIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimatingRight, setIsAnimatingRight] = useState(false);
    const [isAnimatingLeft, setIsAnimatingLeft] = useState(false);
    const [isCaptionHiding, setIsCaptionHiding] = useState(false);
    const [isCaptionHidden, setIsCaptionHidden] = useState(false);
    const [isCaptionShowing, setIsCaptionShowing] = useState(false);

    const onMouseOver = (): void => {
        setIsHovered(true);
        pause();
    };

    const onMouseLeave = (): void => {
        setIsHovered(false);
    };

    const hideCaptions = (): void => {
        setIsCaptionHiding(true);
        setTimeout(() => {
            setIsCaptionHidden(true);
            setIsCaptionHiding(false);
        }, durationCaption);
    };

    const showCaptions = (): void => {
        setIsCaptionShowing(true);
        setIsCaptionHidden(false);
        setTimeout(() => {
            setIsCaptionShowing(false);
        }, durationCaption);
    };

    const goto = (idx: number): void => {
        setIndex(idx);
        setViewingIndex(idx);
    };

    const pause = (): void => {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
    };

    const previous = (): void => {
        if (isAnimatingLeft === true) {
            return;
        }

        const idx: number = index === 0 ? data.length - 1 : index - 1;

        setPrevIndex(idx);
        setIndex(idx);

        setIsAnimatingLeft(true);
        setTimeout(() => {
            setViewingIndex(idx);
            setTimeout(setIsAnimatingLeft, durationTimeout, false); // setTimeout fixes jank in Edge
        }, durationSlide);
    };

    const next = useCallback((): void => {
        if (isAnimatingRight === true) {
            return;
        }
        const idx = index === data.length - 1 ? 0 : index + 1;

        setNextIndex(idx);
        setIndex(idx);

        setIsAnimatingRight(true);
        setTimeout(() => {
            setViewingIndex(idx);
            setTimeout(setIsAnimatingRight, durationTimeout, false); // setTimeout fixes jank in Edge
        }, durationSlide);
    }, [index, isAnimatingRight]);

    const play = useCallback(() => {
        setIsPlaying(true);
        intervalRef.current = window.setTimeout(next, timer);
    }, [next]);

    useEffect(() => {
        if (isHovered === false) {
            play();
        }
        return () => pause();
    }, [play, isHovered]);

    const menuItems = data.map(
        (t: IData, idx): JSX.Element => (
            <MenuItem
                key={`mi-${t.id}`}
                isActive={index === idx}
                onMenuClick={() => goto(idx)}
                image={data[idx].image}
                client={data[idx].client}
            />
        )
    );

    const currentSlide = data[viewingIndex];
    const slideImagePrev = data[prevIndex].image as IImage;
    const slideImageCurrent = currentSlide.image as IImage;
    const slideImageNext = data[nextIndex].image as IImage;

    return (
        <div
            id="slider1"
            className="slider"
        >
            <div
                className={
                    isCaptionHidden
                        ? 'slider__container slider__container--captions-hidden'
                        : 'slider__container'
                }
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
            >
                <div className="slider__viewport">
                    <div
                        className={
                            isAnimatingRight
                                ? 'viewport__slides viewport__slides--is-animating-right'
                                : isAnimatingLeft
                                ? 'viewport__slides viewport__slides--is-animating-left'
                                : 'viewport__slides'
                        }
                    >
                        <SlideImage {...slideImagePrev} />
                        <SlideImage {...slideImageCurrent} />
                        <SlideImage {...slideImageNext} />
                    </div>
                </div>

                <nav>
                    <button
                        type="button"
                        className="nav__btn btn-prev"
                        onClick={previous}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        className="nav__btn btn-next"
                        onClick={next}
                    >
                        Next
                    </button>
                </nav>

                <div className="slider__controls">
                    <div className="controls__slider-menu">
                        {menuItems}
                        <div className="slider-menu__play-state">
                            {isPlaying === true ? 'Playing' : 'Paused'}
                        </div>
                    </div>

                    {isCaptionHidden === false ? (
                        <button
                            type="button"
                            className="btn btn-toggle-captions"
                            onClick={hideCaptions}
                        >
                            Hide Captions
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-toggle-captions"
                            onClick={showCaptions}
                        >
                            Show Captions
                        </button>
                    )}
                </div>
            </div>

            <div
                className={
                    isCaptionHiding
                        ? 'slider__caption-display slider__caption-display--is-hiding'
                        : isCaptionHidden
                        ? 'slider__caption-display slider__caption-display--is-hidden'
                        : isCaptionShowing
                        ? 'slider__caption-display slider__caption-display--is-showing'
                        : 'slider__caption-display'
                }
            >
                <Caption
                    isUpdating={isAnimatingRight || isAnimatingLeft}
                    slide={currentSlide}
                />

                <div className="caption-display__links"></div>
            </div>
        </div>
    );
}

export default Slider;
