import axios from "axios"

const getCurrency = async () => await axios.get('http://api.exchangeratesapi.io/v1/latest?access_key=9277e4e3af527cd593cc7f6142522837&symbols=EUR,USD,CAD,IDR,GBP,CHF,SGD,INR,MYR,JPY,KRW')

export default getCurrency