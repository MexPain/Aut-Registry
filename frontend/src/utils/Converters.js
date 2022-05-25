export function dateConverter(date) {
    let dateAndTime = date.split("T")
    return dateAndTime[0]
}

export function statusConverter(status) {
    let array = status.split("_")
    return array[1].toLowerCase()
}