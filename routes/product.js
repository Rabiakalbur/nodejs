const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rotaları Tanımlayın
router.get('/', productController.getAllProducts); // Tüm ürünleri getir
router.post('/', productController.addProduct); // Ürün ekle
router.delete('/:id', productController.deleteProduct); // Ürün sil
router.put('/:id', productController.updateProduct); // Ürün güncelle

module.exports = router;
