export const fetchData = () =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data Fetched!');
        }, 3000);
    })
}