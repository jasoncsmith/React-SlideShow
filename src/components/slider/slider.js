import React, { useState, useEffect, useCallback, useRef } from "react";
import "./slider.scss";
import "./caption.scss";
import "./menuItem.scss";
import data from "../../data/data.js";

const MenuItem = ({ isActive, onMenuClick, slide }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={isActive ? "menuItem menuItem--selected" : "menuItem"}
            >
            <button
                type="button"
                onClick={onMenuClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            ></button>

            {isHovered === true ? (
                <div className="menuItem__thumbnail">
                    <h5 dangerouslySetInnerHTML={{ __html: slide.client }}></h5>
                    <img
                        className="menuItem__img"
                        src={`images/${slide.image.name}`}
                        alt={slide.image.alt}
                        title={slide.image.alt}
                        height={100}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

const Caption = ({ slide }) => (
    <div className="caption-display__caption">
        <h5 className="caption__subtitle">Client</h5>
        <p className="caption__client-name" dangerouslySetInnerHTML={{ __html: slide.client }}></p>
        <h5 className="caption__subtitle">Project</h5>
        <p dangerouslySetInnerHTML={{ __html: slide.projectName }} />
        <h5 className="caption__subtitle">Skills</h5>
        <p>{slide.skills}</p>
    </div>
);

const Slide = ({ idx }) => {
    const image = data[idx].image;

    return (
        <img
            className="slider__slide"
            src={`images/${image.name}`}
            alt={image.alt}
            title={image.alt}
            height={350}
        />
    );
};

function Slider() {
    const timer = 3000;
    const duration = 375;
    const intervalRef = useRef();
    const [index, setIndex] = useState(0);
    const [viewingIndex, setViewingIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAnimatingLeft, setIsAnimatingLeft] = useState(false);
    const [isCaptionHiding, setIsCaptionHiding] = useState(false);
    const [isCaptionHidden, setIsCaptionHidden] = useState(false);
    const [isCaptionShowing, setIsCaptionShowing] = useState(false);

    const onMouseOver = () => {
        setIsHovered(true);
        pause();
    };

    const onMouseLeave = () => {
        setIsHovered(false);
    };

    const hideCaptions = () => {
        setIsCaptionHiding(true);
        setTimeout(() => {
            setIsCaptionHidden(true);
            setIsCaptionHiding(false);
        }, 450);
    };

    const showCaptions = () => {
        setIsCaptionShowing(true);
        setIsCaptionHidden(false);
        setTimeout(() => {
            setIsCaptionShowing(false);
        }, 450);
    };

    const previous = () => {
        if (isAnimatingLeft === true) {
            return;
        }

        let idx = null;
        let idxViewing = null;

        if (index === 0) {
            idx = data.length - 1;
            idxViewing = 0;
        } else {
            idx = index - 1;
            idxViewing = index;
        }
        setIndex(idx);
        setViewingIndex(idxViewing);
        setPrevIndex(idx);

        setIsAnimatingLeft(true);
        setTimeout(() => {
            setIsAnimatingLeft(false);
            setViewingIndex(idx);
        }, duration);
    };

    const goto = (idx) => {
        setIndex(idx);
        setViewingIndex(idx);
    };

    const pause = () => {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
    };

    const next = useCallback(() => {
        if (isAnimating === true) {
            return;
        }

        let idx = null;
        let idxViewing = null;

        if (index === data.length - 1) {
            idx = 0;
            idxViewing = data.length - 1;
        } else {
            idx = index + 1;
            idxViewing = index;
        }

        setIndex(idx);
        setViewingIndex(idxViewing);
        setNextIndex(idx);
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            setViewingIndex(idx);
        }, duration);
    }, [index, isAnimating]);

    const play = useCallback(() => {
        setIsPlaying(true);

        let intervalId = setTimeout(() => {
            next();
        }, timer);

        intervalRef.current = intervalId;
    }, [next]);

    useEffect(() => {
        if (isHovered === false) {
            play();
        }
        return () => pause();
    }, [play, isHovered]);

    const menuItems = data.map((t, idx) => (
        <MenuItem
            key={`mi-${t.order}`}
            isActive={index === idx}
            onMenuClick={() => goto(idx)}
            slide={data[idx]}
        />
    ));

    return (
        <div
            id="slider1"
            className="slider"
        >
            <div
                className={
                    isCaptionHidden
                        ? "slider__container slider__container--captions-hidden"
                        : "slider__container"
                }
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
            >
                <div className="slider__viewport">
                    <div
                        className={
                            isAnimating
                                ? "viewport__slides viewport__slides--is-animating-right"
                                : isAnimatingLeft
                                ? "viewport__slides viewport__slides--is-animating-left"
                                : "viewport__slides"
                        }
                    >
                        <Slide idx={prevIndex} />
                        <Slide idx={viewingIndex} />
                        <Slide idx={nextIndex} />
                    </div>
                </div>

                <nav>
                    <button
                        type="button"
                        className="nav__btn btn-prev"
                        onClick={previous}
                    >
                        &lsaquo;
                    </button>
                    <button
                        type="button"
                        className="nav__btn btn-next"
                        onClick={next}
                    >
                        &rsaquo;
                    </button>
                </nav>

                <div className="slider__controls">
                    <div className="controls__slider-menu">
                        {menuItems}
                        <div className="slider-menu__play-state">
                            {isPlaying === true ? "Playing" : "Paused"}
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
                        ? "slider__caption-display slider__caption-display--is-hiding"
                        : isCaptionHidden
                        ? "slider__caption-display slider__caption-display--is-hidden"
                        : isCaptionShowing
                        ? "slider__caption-display slider__caption-display--is-showing"
                        : "slider__caption-display"
                }
            >
                <Caption slide={data[index]} />

                <div className="caption-display__links"></div>
            </div>
        </div>
    );
}

export default Slider;
