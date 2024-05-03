import { fetchData } from "../data";
// import { ReactDom} from "react-dom";

export function JavaScriptTraining() {

    const bikes = ["Bullet", "KTM", "Harley", "Kawasaki"];

    function printArray(arr) {
        console.log('Array');
        arr.forEach(elements =>{
            console.log(elements);
        });
    }
    bikes.splice(1, 1,'Shine');
    printArray(bikes);

    bikes.reduce((e) => { return e.concat(" **")});
    console.log(bikes);
    // document.addEventListener('DOMContentLoaded', () => {
    //     // ES6: const and let keywords
    //     const heading = document.getElementById('heading');
    //     let nameInput = document.getElementById('nameInput');
  
    //     // Arrow Function
    //     const greet = (name) => {
    //       return `Hello, ${name}!`;
    //     };

    //     // Event listener
    //   document.getElementById('submitButton').addEventListener('click', () => {
    //     // ES6: Template literals
    //     const name = nameInput.value;
    //     const greeting = greet(name);

    //     // Asynchronous JavaScript: Promises and async/await
    //     fetchData()
    //       .then((data) => {
    //         console.log(data); // Output: Data fetched successfully
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });

    //     // DOM Manipulation
    //     heading.textContent = greeting;
    //   });
    // });

    return (
        <div>
            {/* <h1 id="heading">Hello World</h1>
            <input type="text" id="nameInput" placeholder="Enter your name"/>
            <button id="submitButton">Submit</button> */}
        </div>
    );
}


