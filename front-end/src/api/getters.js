const NOT_FOUND = 404;

const getProducts = () => {
  const allProducts = fetch('http://localhost:3001/products', {
    method: 'GET',
  }).then((response) => {
    if (response.status === NOT_FOUND) {
      return response.status;
    }
    return response.json();
  });
  return allProducts;
};

// const getSeller = () => {
//   const sellers = fetch('http://localhost:3001/user/sellers', {
//     method: 'GET',
//   }).then((response) => response.json());
//   return sellers;
// };

const getImage = (url) => {
  const image = fetch(url)
    .then((data) => data.url);
    // .catch((err) => console.log('ERROOOOO', err));
  return image;
};

export {
  getImage,
  getProducts,
  // getSeller,
};
