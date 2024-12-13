const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// Konfigurasi Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Ganti dengan password Anda
  database: "store_db_m", // Nama database
});

// Tes Koneksi
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to database.");
  }
});

app.get('/', (req , res)=>{
  res.send("tes")
})
// Endpoint untuk mengambil produk beserta toko dan avatar
app.get("/products", (req, res) => {
  const query = `
    SELECT 
      p.id, p.nama, p.harga, p.diskon, p.gambar, p.kategori, p.deskripsi,
      t.nama AS toko, t.avatar
    FROM product p
    JOIN toko t ON p.toko_id = t.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
