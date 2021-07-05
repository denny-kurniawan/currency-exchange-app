const switchCurrency = (currency) => {
    // eslint-disable-next-line default-case
    switch (currency) {
        case 'IDR':
            return 'Indonesian Rupiah'
        case 'EUR':
            return 'Euro'
        case 'USD':
            return 'United States Dollar'
        case 'CAD':
            return 'Canadian Dollar'
        case 'GBP':
            return 'Pound Sterling'
        case 'CHF':
            return 'Swiss Franc'
        case 'SGD':
            return 'Singapore Dollar'
        case 'INR':
            return 'Indian Rupee'
        case 'MYR':
            return 'Malaysian Ringgit'
        case 'JPY':
            return 'Japanese Yen'
        case 'KRW':
            return 'South Korean won'
    }
}

export default switchCurrency