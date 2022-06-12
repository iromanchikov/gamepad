export default function _gamepad () {
    const left = document.querySelector('.js-left')
    const right = document.querySelector('.js-right')
    const red = document.querySelector('.js-red')
    const green = document.querySelector('.js-green')

    if (left && right && red && green) {

        left.onclick = () => {
            window.socket.send(JSON.stringify({action: "left"}))
        }

        right.onclick = () => {
            window.socket.send(JSON.stringify({action: "right"}))
        }

        red.onclick = () => {
            window.socket.send(JSON.stringify({action: "red"}))
        }

        green.onclick = () => {
            window.socket.send(JSON.stringify({action: "green"}))
        }
    }
}