import { makeObservable, computed, observable, action } from 'mobx'
import { createContext, useContext } from 'react'

import db from '../../../data/db.json'
import { DURATION_CAPTION, DURATION_SLIDE_BUFFER, SLIDE_INTERVAL } from '../constants'

import { ImageProps } from '../components/Image'

export interface Project {
  id: number
  client: string
  clientId: string
  year: number
  url: string
  role: string
  projectName: string
  projectDescription: string
  fragment: string
  skills: string
  software: string
  longDesc: string
  image: ImageProps
}

class SliderStore {
  private intervalId?: number

  constructor() {
    makeObservable(this)
    this.init()
  }

  @observable slides: Project[] = []
  @observable index = 0
  @observable isAnimatingLeft = false
  @observable isAnimatingRight = false
  @observable isCaptionShowing = false
  @observable isCaptionHiding = false
  @observable isCaptionHidden = false
  @observable isPlaying = false

  @computed
  get numOfSlides(): number {
    return this.slides?.length ?? 0
  }

  @computed
  get isAtEnd(): boolean {
    return this.index === this.numOfSlides - 1
  }

  @computed
  get isAtStart(): boolean {
    return this.index === 0
  }

  @computed
  get nextIndex(): number {
    return this.isAtEnd ? 0 : this.index + 1
  }

  @computed
  get prevIndex(): number {
    return this.isAtStart ? this.numOfSlides - 1 : this.index - 1
  }

  @action.bound
  setIndex(val: number) {
    this.index = val
  }

  @action.bound
  goToPrevious() {
    if (!!this.isAnimatingLeft) return

    this.setIsAnimatingLeft(true)

    setTimeout(() => {
      this.setIndex(this.prevIndex)
      this.setIsAnimatingLeft(false)
    }, DURATION_SLIDE_BUFFER)
  }

  @action.bound
  goToNext() {
    if (!!this.isAnimatingRight) return

    this.setIsAnimatingRight(true)

    setTimeout(() => {
      this.setIndex(this.nextIndex)
      this.setIsAnimatingRight(false)
    }, DURATION_SLIDE_BUFFER)
  }

  @action.bound
  goTo(val: number) {
    this.index = val
  }

  @action.bound
  setIsAnimatingRight(val: boolean) {
    this.isAnimatingRight = val
  }

  @action.bound
  setIsAnimatingLeft(val: boolean) {
    this.isAnimatingLeft = val
  }

  @action.bound
  setIsCaptionHiding(val: boolean) {
    this.isCaptionHiding = val
  }

  @action.bound
  setIsCaptionHidden(val: boolean) {
    this.isCaptionHidden = val
  }

  @action.bound
  setIsCaptionShowing(val: boolean) {
    this.isCaptionShowing = val
  }

  @action.bound
  setIsPlaying(val: boolean) {
    this.isPlaying = val
  }

  @action.bound
  hideCaptions = (): void => {
    this.setIsCaptionHiding(true)

    setTimeout(() => {
      this.setIsCaptionHidden(true)
      this.setIsCaptionHiding(false)
    }, DURATION_CAPTION)
  }

  @action.bound
  showCaptions = (): void => {
    this.setIsCaptionShowing(true)
    this.setIsCaptionHidden(false)

    setTimeout(this.setIsCaptionShowing, DURATION_CAPTION, false)
  }

  toggleCaptions = () => (!!this.isCaptionHidden ? this.showCaptions() : this.hideCaptions())

  @action.bound
  pause = () => {
    window.clearInterval(this.intervalId)
    this.setIsPlaying(false)
  }

  @action.bound
  play = () => {
    this.intervalId = window.setInterval(this.goToNext, SLIDE_INTERVAL)
    this.setIsPlaying(true)
  }

  @action.bound
  init() {
    this.slides = db
    this.play()
  }
}

type SliderStoreType = InstanceType<typeof SliderStore>

export default SliderStore
export const SliderStoreContext = createContext<SliderStoreType>({} as SliderStoreType)
export const useSliderStoreContext = () => useContext(SliderStoreContext)
