const controls = document.querySelector('.js-device-switcher')
const domResult = document.querySelector('.js-dom-show')

export default function _typeSwitcher () {
    if (!controls || !domResult) return

    controls.addEventListener('click', event => {
        const targetElem = event.target.closest('.js-tablet') || event.target.closest('.js-phone')
        const trigger = targetElem.dataset.trigger

        if (targetElem) {
            if (!targetElem.classList.contains('active')) {
                const openElem = document.querySelector('.js-dom-show .open')
                const activeElem = document.querySelector('.js-device-switcher .active')

                openElem.classList.remove('open')
                activeElem.classList.remove('active')

                targetElem.classList.add('active')
                window.deviceType = +(trigger === 'phone')
                document.querySelector(`[data-target="${trigger}"]`).classList.add('open')
            }
        }
    })
}



