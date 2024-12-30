// Gerekli Modülleri Dahil Etme
const express = require('express'); // Express.js web framework'ü
const mongoose = require('mongoose'); // MongoDB ile bağlantı ve işlemler
const cors = require('cors'); // CORS hatalarını önlemek için



// Express Uygulaması Oluşturma
const app = express();
app.use(express.json()); // JSON formatında gelen verileri işlemeye izin verir
app.use(cors()); // Farklı domain'lerden gelen isteklere izin verir

// MongoDB Bağlantısı
mongoose.connect(
  'mongodb+srv://kalburrabia:O46wCATxfP3Qqt5b@crystalcluster.meole.mongodb.net/?retryWrites=true&w=majority&appName=CrystalCluster',
  {
    useNewUrlParser: true, // Yeni URL yapısını kullan
    useUnifiedTopology: true, // Yeni MongoDB sürücüsünü etkinleştir
  }
)
  .then(() => console.log('MongoDB’ye bağlandı'))  
  .catch((err) => console.log('MongoDB bağlantı hatası:', err));  

// Ürün Modelini Dahil Etme
const Product = require('./models/product'); // Ürün modeli (MongoDB'deki şema)

// 1. Ürünleri Listeleme API'si
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); // MongoDB'den tüm ürünleri al
    res.json(products); // Ürünleri JSON formatında döndür
  } catch (err) {
    res.status(500).json({ message: 'Ürünleri çekerken bir hata oluştu' });  
  }
});

// 2. Yeni Ürün Ekleme API'si
app.post('/api/products', async (req, res) => {
  try {
    // Eğer body'de değerler boşsa varsayılan bir ürün ekle
    const newProduct = new Product({
      name: req.body.name || "Default Product",  
      description: req.body.description || "This is a default product description",  
      price: req.body.price || 0,  
      image: req.body.image || "https://example.com/default-image.jpg",  
      category: req.body.category || "Default Category"  
    });
    const savedProduct = await newProduct.save(); // Ürünü MongoDB'ye kaydet
    res.status(201).json(savedProduct); // Kaydedilen ürünü JSON formatında döndür
  } catch (err) {
    res.status(500).json({ message: 'Ürün eklenirken bir hata oluştu' });  
  }
});

// 3. Ürün Silme API'si
app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id; // URL'den ürün ID'sini al
    const deletedProduct = await Product.findByIdAndDelete(productId); // ID'ye göre ürünü sil
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Ürün bulunamadı' }); // Ürün bulunamazsa hata döndür
    }
    res.json({ message: 'Ürün başarıyla silindi' }); // Başarılı silme mesajı gönder
  } catch (err) {
    res.status(500).json({ message: 'Ürün silinirken bir hata oluştu', error: err.message });  
  }
});

// 4. Ürün Güncelleme API'si
app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id; // URL'den ürün ID'sini al
    const updatedProduct = await Product.findByIdAndUpdate(
      productId, // Güncellenecek ürün ID'si
      req.body, // Güncelleme verileri
      { new: true } // Güncellenmiş ürünü döndür
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Güncellenmek istenen ürün bulunamadı' });  
    }
    res.json(updatedProduct); // Güncellenmiş ürünü döndür
  } catch (err) {
    res.status(500).json({ message: 'Ürün güncellenirken bir hata oluştu', error: err.message });  
  }
});

// Sunucu Başlatma
app.listen(5000, () => {
  console.log('Sunucu 5000 portunda çalışıyor...'); 
});
