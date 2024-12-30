const axios = require('axios');

const saveProduct = async () => {
    const newProduct = {
        name: 'Crystal Necklace',
        price: 29.99,
        description: 'Beautiful handcrafted crystal necklace',
    };

    try {
        const response = await axios.post(
            'http://localhost/taki/api/products',
            newProduct,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        console.log('Cevap:', response.data);
    } catch (error) {
        console.error('Hata:', error.message);
    }
};

saveProduct();
