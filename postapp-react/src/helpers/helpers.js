export const isObjectEmpty = (obj) =>{
    return Object.keys(obj).length === 0 & obj.constructor === Object;
}

export const downloadTextAsFile = (fileName,text) => {
    let element = document.createElement('a')
    element.setAttribute('href','data:text/plain;charset=utf-8,'+encodeURIComponent(text))
    element.setAttribute('download',fileName)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}