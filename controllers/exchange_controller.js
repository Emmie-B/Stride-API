// This controller is responsible for handling the exchange of currency
// from leones to SOLs. It is a simple function that takes in the
// amount in leones and the current exchange rate of USD to SOL and returns
// the equivalent amount in SOL.


const  convertSLEtoSOL = (amountInSLE, usdToSOLRate) => {
    const usdToSLE = 22.7483; // 1 USD = 22.7483 SLE
    const amountInUSD = amountInSLE / usdToSLE;
    const amountInSOL = amountInUSD * usdToSOLRate;
    console.log(amountInSOL.toFixed(4)); // Rounded to 4 decimal places
    return amountInSOL.toFixed(4); // Rounded to 4 decimal places
}

convertSLEtoSOL(10, 0.0081) // 0.1



// this converts SOL to SLE
const  convertSOLtoSLE = (amountInSOL, usdToSOLRate) => {
    const usdToSLE = 22.7483; // 1 USD = 22.7483 SLE
    const amountInUSD = amountInSOL / usdToSOLRate;
    const amountInSLE = amountInUSD * usdToSLE;
    console.log(amountInSLE.toFixed(4)); // Rounded to 4 decimal places
    return amountInSLE.toFixed(4); // Rounded to 4 decimal places
}

convertSOLtoSLE(0.1, 0.0081) // 10


export { convertSLEtoSOL, convertSOLtoSLE }
