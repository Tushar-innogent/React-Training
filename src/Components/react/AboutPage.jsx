const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
  ];
  
  export default function ShoppingList() {
    const listItems = products.map(product =>
      <li
        key={product.id}
        style={{
          color: product.isFruit ? 'magenta' : 'darkgreen'
        }}
      >
        {product.title}
      </li>
    );
  
    return (
      <ul>{listItems}</ul>
    );
  }
  

// const user = {
//     name: 'Hedy Lamarr',
//     imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
//     imageSize: 90
// }
// export default function AboutPage (){   
    // return(
    //     <>
    //         <h1>{user.name}</h1>
    //         <img 
    //         className="avatar"
    //         src={user.imageUrl}
    //         alt={"Photo of "+user.name}
    //         style={{
    //             width: user.imageSize,
    //             height: user.imageSize
    //         }} 
    //         />
    //     </>
    // );
// }