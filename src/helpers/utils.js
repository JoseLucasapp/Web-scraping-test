export const checkParams = (data) => {

    const brand = 'lenovo'

    const checkedData = []

    for (let i = 0; i < data.length; i++) {
        const check = {
            descriptionPassed: false,
            titlePassed: false
        }

        const title = (data[i].title).split(' ')
        const description = ((data[i].description).split(',')[0]).split(' ')

        for (let t = 0; t < title.length; t++) {
            if (title[t].toLowerCase() === brand) {
                check.titlePassed = true
            }
        }

        for (let d = 0; d < description.length; d++) {
            if (description[d].toLowerCase() === brand) {
                check.descriptionPassed = true
            }
        }

        if (check.descriptionPassed && check.titlePassed) {
            checkedData.push(data[i])
        }
    }

    checkedData.sort((a, b) => a.price - b.price)

    return checkedData
}