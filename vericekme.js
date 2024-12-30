const axios = require('axios'); //Node.js tarafında HTTP istekleri göndermek için axios paketini kullanılır.

const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost/taki/api/products');
        console.log('Ürünler:', response.data);
    } catch (error) {
        console.error('Hata:', error.message);
    }
};

fetchProducts();
