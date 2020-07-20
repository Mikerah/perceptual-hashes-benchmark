const sharp = require('sharp')
const itermean = require('@stdlib/stats/iter/mean')
const array2iterator = require('@stdlib/array/to-iterator')

function aHash(image) {
    sharp(image).resize(8, 8).grayscale(true).then(imgBuff => {
        let imageArray = [...imgBuff]
        let avg = itermean(array2iterator(imageArray))
        let bitArray = new Array(imageArray.length)
        for (let i = 0; i < imageArray.length; i++) {
            bitArray[i] = imageArray[i] > avg
        }
        bitStr = bitArray.join("")
        return parseInt(bitSt, 2).toString(16)
    }).catch(err => {
        console.log(err)
    })
}

function pHash(image) {

}

function PQDHash(image) {

}

function blockMeanHash(image) {

}

module.exports = {
    aHash,
    pHash,
    PQDHash,
    blockMeanHash
}