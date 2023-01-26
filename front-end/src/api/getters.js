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

const getImage = (url) => {
  const image = fetch(url)
    .then((data) => data.url);
    // .catch((err) => console.log('ERROOOOO', err));
  return image;
};

export {
  getImage,
  getProducts,
};
