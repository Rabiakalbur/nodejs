const Product = require('../models/product'); // Ürün modelini içe aktar

// Ürün Listeleme
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Ürünleri çekerken bir hata oluştu' });
  }
};

// Ürün Ekleme
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Ürün eklenirken bir hata oluştu' });
  }
};

// Ürün Silme
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    res.json({ message: 'Ürün başarıyla silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Ürün silinirken bir hata oluştu' });
  }
};

// Ürün Güncelleme
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Ürün güncellenirken bir hata oluştu' });
  }
};
