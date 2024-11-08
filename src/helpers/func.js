import api from './api'

const months = [
  { value: 0, name: 'Yanvar' },
  { value: 1, name: 'Fevral' },
  { value: 2, name: 'Mart' },
  { value: 3, name: 'Aprel' },
  { value: 4, name: 'May' },
  { value: 5, name: 'Iyun' },
  { value: 6, name: 'Iyul' },
  { value: 7, name: 'Avgust' },
  { value: 8, name: 'Sentabr' },
  { value: 9, name: 'Oktabr' },
  { value: 10, name: 'Noyabr' },
  { value: 11, name: 'Dekabr' }
]

const langs = ['tr', 'uz', 'ru'];

const addZero = (v) => (v < 10 ? `0${v}` : `${v}`);

const convertDate = (value = new Date(), type = null) => {
  const date = new Date(value)
  return type == 'full'
    ? `${addZero(date.getDate())} ${months[date.getMonth()].name} ${addZero(date.getFullYear())}, ${addZero(date.getHours())}:${addZero(date.getMinutes())}`
    : `${addZero(date.getDate())} ${months[date.getMonth()].name} ${addZero(date.getFullYear())}`
}

const generateExcel = async (url) => {
  const res = await api.get(url)
  await download(res.data)
}

const download = async (filepath) => {
  api
    .get(filepath, {
      responseType: 'blob'
    })
    .then((response) => {
      const fileURL = window.URL.createObjectURL(new Blob([response.data]))
      const fileLink = document.createElement('a')
      fileLink.href = fileURL
      fileLink.setAttribute('download', 'report.xlsx')
      document.body.appendChild(fileLink)
      fileLink.click()
    })
}

export { convertDate, months, generateExcel, langs }
