// project styles import
import '../css/index.css'

// if device type = 0 - it is desktop, else 1 - it is mobile
window.deviceType = 0
window.socket = new WebSocket('ws://localhost:8080')

// project modules import
import _typeSwitcher from './modules/_typeSwitcher'
import _socketStart from './modules/_socketStart'
import QR from './modules/_qrGenerate'
import _gamepad from './modules/_gamepad'

window.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href)
    const searchParamsType = parseInt(url.searchParams.get('type'))
    const searchParamsId = parseInt(url.searchParams.get('id'))
    const viewSwitcher = document.querySelector('.js-device-switcher .view-switcher__items-wrap')
    _typeSwitcher()
    _socketStart()
    window.socket.onmessage = function(event) {
        const data = JSON.parse(event.data)

        if (searchParamsType && searchParamsId) {
            window.deviceType = searchParamsType
            if (data.connected) {
                window.socket.send(JSON.stringify({action: "phoneOpen"}))
            }
        }

        if (data.code) {
            viewSwitcher.style.display = 'none'
            const activeDevice = document.querySelector('.dom-view__item.open')
            const url = `${window.location.href}?type=1&id=${data.code}`
            activeDevice.innerHTML = `
                <div>
                    <span>Код для подключения устройства</span> 
                    <span class="h1 green">${data.code}</span>
                </div>                    
                <canvas id="canvas"></canvas>
                <div>
                    <span class="blue">${url}</span>
                </div>       
            `
            const canvas = document.querySelector('canvas#canvas')
            if (canvas)
                QR(canvas, url)
        }
        if (data.start && data.dom) {
            if (data.dom[window.deviceType].elem) {
                document.body.style.background = '#fff'
                document.body.innerHTML = data.dom[window.deviceType].elem
                _gamepad()
            }
        }

        if (data.dom) {
            if (data.dom[window.deviceType].elem) {
                document.body.style.background = '#fff'
                document.body.innerHTML = data.dom[window.deviceType].elem
                _gamepad()
            }
        }
    }
})
