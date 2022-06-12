const QRCode = require('qrcode')

export default function QR (elem, key) {
    QRCode.toCanvas(elem, key, { width: 185, height: 185 }, function (error) {
        if (error) console.error(error)
    })
}
