export default function _socketStart () {
    document.querySelector('.js-start-ws').onclick = () => {
        window.socket.send(JSON.stringify({action: "connect"}))
    }

    document.querySelector('.js-start').onclick = () => {
        const code = parseInt(document.querySelector('.js-code').value)
        const url = `${window.location.href}?type=1&id=${code}`
        window.location.href = url
    }
}