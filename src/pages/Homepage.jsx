import React, { useEffect, useState } from 'react'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import getCurrency from '../api/getCurrency'
import switchCurrency from '../components/switchCurrency'
import formatNumber from '../utils/formatNumber'

const Homepage = () => {
    const [response, setResponse] = useState(null)
    const [currencyList, setCurrencyList] = useState(null)
    const [query, setQuery] = useState(null)
    const [defaultUSD, setDefaultUSD] = useState(1)
    const [isClicked, setIsClicked] = useState(false)
    const [displayList, setDisplayList] = useState(null)
    let tempList = {}

    useEffect(() => {
        const getData = async () => {
            getCurrency().then(
                res => {
                    let rates = {}
                    setResponse(res.data) 
                    for (const key in res.data.rates) {
                        rates[key] = res.data.rates[key] / res.data.rates['USD']
                    }
                    setCurrencyList(rates)
                    setDisplayList(prevState => { // display initialization
                        return {...prevState, IDR: rates['IDR']}
                    }) 
                    setDisplayList(prevState => { // display initialization
                        return {...prevState, EUR: rates['EUR']}
                    })
                }
            )
        }

        if (response === null) {
            getData()
        } else if (query !== null) {
            getData()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayList, defaultUSD])

    // select new currency
    const addCurrency = () => {
        if (isClicked) { // when add more currency btn is clicked
            return <div className="d-flex flex-wrap justify-content-between">
                <FormControl as="select" className="w-75 selection" onChange={handleChange}>
                    <option>Select</option>
                    <option value="IDR">IDR</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                    <option value="GBP">GBP</option>
                    <option value="CHF">CHF</option>
                    <option value="SGD">SGD</option>
                    <option value="INR">INR</option>
                    <option value="MYR">MYR</option>
                    <option value="JPY">JPY</option>
                    <option value="KRW">KRW</option>
                </FormControl>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        } else { // when add more currency btn isn't clicked yet
            return <Button onClick={e => setIsClicked(true)}>
                (+) Add More Currency
            </Button>
        }
    }

    // change currency on select
    const handleChange = e => {
        setQuery(e.target.value.toUpperCase())
    }

    // add new currency to display list
    const handleSubmit = e => {
        e.preventDefault()
        for (const key in currencyList) {
            if (key === query) {
                tempList[query] = currencyList[query]
                setDisplayList(prevState => {
                    return {...prevState, ...tempList}
                })
            }
        }
        // reset btn clicked and currency selected state after new currency added
        setIsClicked(false)
        setQuery(null)
    }

    // delete specific currency from display list
    const handleDelete = (e, item) => {
        let tempList = {}
        for (const key in displayList) {
            if (key !== item) {
                tempList[key] = currencyList[key]
            }
        }

        for (let index = 0; index <= 1; index++) {
            setDisplayList(tempList)
        }
    }

    return (
        <Container className="my-3">
            <div className="px-2 pb-4 border-bottom border-dark">
                <em className="h5">USD - United States Dollars</em>
                <div className="d-flex justify-content-between">
                    <span className="h5">USD</span>
                    <FormControl className="text-right w-25" min={0} step={0.1} type="number" defaultValue={defaultUSD} onChange={(e) => setDefaultUSD(e.target.value)} />
                </div>
            </div>
            {
                displayList && Object.keys(displayList).map(item => {
                    return (
                        <div key={item} className="d-flex flex-wrap justify-content-between my-3 border border-dark">
                            <div className="box1 p-3">
                                <div className="d-flex justify-content-between">
                                    <span className="h5">{item}</span>
                                    <span className="h5">{defaultUSD !== 0 ? formatNumber((displayList[item] * defaultUSD).toFixed(4)) : 0}</span>

                                </div>
                                <em className="h6">{item} - {switchCurrency(item)}</em> <br />
                                <em>1 USD = {item} {formatNumber(displayList[item].toFixed(4))}</em>
                            </div>
                            <div className="box2">
                                <Button onClick={e => handleDelete(e, item)} className="btnDelete w-100">(-)</Button>
                            </div>
                        </div>
                    )
                })
            }
            { addCurrency() }
        </Container>
    )
}

export default Homepage
