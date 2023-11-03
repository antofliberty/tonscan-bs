const predefinedScreenSizes = {
    small: 480,
    medium: 1240
}

export default {
    install (Vue) {
        Vue.mixin({
            data () {
                return {
                    screenSizes: {
                        isSmallScreen: false,
                        isMediumScreen: false,
                        isLargeScreen: false,
                    }
                }
            },
            mounted () {
                this.checkScreenWidth();
                window.addEventListener('resize', this.checkScreenWidth);
            },
            methods: {
                checkScreenWidth(event = null) {

                    // Not outer!
                    let width = window.innerWidth;

                    if (event !== null) {
                        width = event.target.innerWidth;
                    }

                    if(width <= predefinedScreenSizes.small) {
                        this.setScreenSize('isSmallScreen')
                    } else if (width > predefinedScreenSizes.small
                        && width <= predefinedScreenSizes.medium) {
                        this.setScreenSize('isMediumScreen')
                    } else if (width > predefinedScreenSizes.medium) {
                        this.setScreenSize('isLargeScreen')
                    }
                },
                setScreenSize(predefinedScreenSize) {
                    for (const predefinedScreenSizeKey in this.screenSizes) {
                        this.screenSizes[predefinedScreenSizeKey] = predefinedScreenSizeKey === predefinedScreenSize;
                    }
                }
            },
            beforeDestroy() {
                window.removeEventListener('resize', this.resizeListener)
            }
        })
    }
}
