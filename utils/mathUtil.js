const getAverageStandardDeviation = (clientProducts) => {
    let standardDeviations = [];
    for (let i = 0; i < clientProducts.length; i++) {
        if (clientProducts[i].current_product_transactions.length === 0)
            continue;
        const currentItem = clientProducts[i].current_product_transactions.map(item => (parseInt(item.pricen)));
        standardDeviations.push(parseInt(getStandardDeviation(currentItem)));
    }
    return getMean(standardDeviations).toFixed(2);
}

const getStandardDeviation = (items) => {
    const mean = getMean(items);
    return (Math.sqrt(items.reduce((acc, item) => acc + Math.pow(item - mean, 2), 0) / (items.length)) / 100).toFixed(2);
}

const getMean = (items) => {
    return items.reduce((acc, item) => (acc += item)) / items.length;
}

module.exports = {
    getAverageStandardDeviation
};