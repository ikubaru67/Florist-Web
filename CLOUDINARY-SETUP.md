# 📸 Cloudinary Setup Guide

## Cara Upload Gambar ke Cloudinary (Paling Mudah!)

### Metode 1: Upload Manual di Cloudinary Dashboard (RECOMMENDED)

Ini cara **paling sederhana** tanpa perlu coding atau setup apapun:

#### Step 1: Buat Akun Cloudinary (Gratis)
1. Kunjungi: https://cloudinary.com/users/register/free
2. Daftar dengan email atau Google/GitHub
3. Free tier: **25GB storage + 25GB bandwidth/bulan** (cukup untuk ribuan gambar!)

#### Step 2: Upload Gambar
1. Login ke https://console.cloudinary.com/
2. Klik tab **"Media Library"** di sidebar kiri
3. Klik button **"Upload"** di pojok kanan atas
4. Pilih gambar dari komputer (drag & drop atau browse)
5. Tunggu upload selesai
6. Klik gambar yang baru di-upload

#### Step 3: Copy Link Gambar
1. Di detail gambar, scroll ke bawah
2. Lihat bagian **"Asset Info"** atau **"Details"**
3. Copy URL dari field **"Secure URL"**
   
   Contoh URL:
   ```
   https://res.cloudinary.com/dxyz123/image/upload/v1702123456/sample.jpg
   ```

#### Step 4: Paste di Admin Panel
1. Login ke Admin Panel website
2. Buka **Admin → Products → Add Product**
3. Di field **"Atau paste URL gambar"**, paste URL dari Cloudinary
4. Preview gambar akan muncul otomatis
5. Save produk seperti biasa

**That's it!** ✅ Tidak perlu install apapun, tidak perlu setup environment variable!

---

### Metode 2: Upload Widget Otomatis (Advanced - Optional)

Jika mau upload langsung dari Admin Panel tanpa buka Cloudinary dashboard, bisa pakai upload widget yang sudah saya buat.

#### Setup Upload Widget:

**1. Buat Upload Preset**
1. Di Cloudinary Console, klik **Settings** (icon gear)
2. Tab **Upload** → Scroll ke **Upload presets**
3. Klik **Add upload preset**
4. Isi:
   - Preset name: `florist_products`
   - **Signing mode: Unsigned** (PENTING!)
   - Folder: `florist-products`
5. Save

**2. Update `.env`**
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=florist_products
```

**3. Restart dev server**
```bash
npm run dev
```

**4. Cara pakai:**
- Klik button **"Upload dari Device"** di form produk
- Widget Cloudinary muncul
- Pilih gambar → Crop → Done
- URL otomatis ter-isi

---

## 🎯 Comparison: Manual vs Widget

| Feature | Upload Manual | Upload Widget |
|---------|---------------|---------------|
| **Setup** | ❌ Tidak perlu setup | ✅ Perlu setup .env |
| **Kemudahan** | ⭐⭐⭐⭐⭐ Paling mudah | ⭐⭐⭐⭐ Mudah |
| **Kecepatan** | Upload 1x di Cloudinary, paste berkali-kali | Upload langsung dari Admin |
| **Cropping** | Manual di Cloudinary | Otomatis 1:1 |
| **Best for** | **Testing & Production** | Production dengan banyak admin |

**Rekomendasi:** Pakai **Upload Manual** dulu, paling simple dan no setup! 🎉

---

Cloudinary URL bisa di-transform on-the-fly:

**Original URL:**
```
https://res.cloudinary.com/your_cloud/image/upload/v1234567890/florist-products/abc123.jpg
```

**Resize 300x300:**
```
https://res.cloudinary.com/your_cloud/image/upload/w_300,h_300,c_fill/v1234567890/florist-products/abc123.jpg
```

**Thumbnail 150x150:**
```
https://res.cloudinary.com/your_cloud/image/upload/w_150,h_150,c_thumb/v1234567890/florist-products/abc123.jpg
```

**Quality 80 + WebP:**
```
https://res.cloudinary.com/your_cloud/image/upload/q_80,f_webp/v1234567890/florist-products/abc123.jpg
```

### 8. Monitoring Usage

Cek usage di: https://console.cloudinary.com/console/usage

**Free Tier Limits:**
- Storage: 25GB
- Bandwidth: 25GB/bulan
- Transformations: 25,000/bulan

Jika limit tercapai:
- Upgrade ke paid plan
- Atau optimize gambar sebelum upload
- Atau pakai CDN lain untuk backup

### 9. Security Settings (Optional)

**Restrict Upload by Folder:**
1. Settings → Upload → Upload presets
2. Edit preset `florist_products`
3. Set **Folder** = `florist-products` (fixed)
4. Users tidak bisa upload ke folder lain

**Allowed Formats:**
- Sudah di-set di widget: `['png', 'jpg', 'jpeg', 'gif', 'webp']`
- Bisa update di code: `CloudinaryUploadWidget.jsx`

**Max File Size:**
- Default: 5MB (`maxFileSize: 5000000`)
- Bisa adjust di code jika perlu

### 10. Troubleshooting

#### Upload gagal / Error 401
- Cek `VITE_CLOUDINARY_CLOUD_NAME` benar
- Cek `VITE_CLOUDINARY_UPLOAD_PRESET` benar
- Pastikan preset di-set **Unsigned**
- Restart Vite dev server: `npm run dev`

#### Preview tidak muncul
- Cek URL gambar valid
- Cek network tab di browser console
- Cloudinary mungkin butuh waktu beberapa detik untuk process

#### Widget tidak muncul
- Cek browser console untuk error
- Pastikan Cloudinary script loaded (cek Network tab)
- Clear cache & hard reload (Ctrl+Shift+R)

#### Gambar terlalu besar
- Cloudinary auto-compress tapi file original tetap besar
- Resize gambar sebelum upload
- Atau adjust `maxFileSize` di widget config

### 11. Alternative: Google Drive (Backup Method)

Jika Cloudinary tidak bisa dipakai, masih bisa paste URL manual:

**Google Drive Link Format:**
```
Original: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
Direct:   https://drive.google.com/uc?export=view&id=FILE_ID
```

⚠️ **Note:** Google Drive lebih lambat dan ada rate limit!

### 12. Best Practices

✅ **DO:**
- Upload gambar 800x800px atau lebih
- Format JPEG/PNG dengan quality 80-90%
- Rename file dengan nama descriptive sebelum upload
- Gunakan Cloudinary transformations untuk thumbnail

❌ **DON'T:**
- Upload gambar terlalu besar (>2MB tanpa perlu)
- Upload format video/GIF besar (pakai image saja)
- Share Cloudinary API secret di frontend
- Hardcode URL tanpa validation

---

## 📝 Summary

1. ✅ Daftar Cloudinary (gratis)
2. ✅ Dapatkan Cloud Name
3. ✅ Buat Upload Preset (unsigned)

## 📝 Quick Start Summary

### Cara Tercepat (No Setup Required):

1. ✅ Daftar Cloudinary gratis: https://cloudinary.com/users/register/free
2. ✅ Upload gambar di Media Library
3. ✅ Copy "Secure URL" dari gambar
4. ✅ Paste URL di Admin → Tambah Produk
5. ✅ Done! Super simple! 🎉

### Dengan Upload Widget (Optional):

1. ✅ Buat upload preset (unsigned) di Cloudinary
2. ✅ Update `.env` dengan cloud name & preset
3. ✅ Restart `npm run dev`
4. ✅ Klik "Upload dari Device" di form produk
5. ✅ Widget handle semua automatically

---

## 🎯 Alternative: Google Drive (Jika Tidak Pakai Cloudinary)

**Format Link:**
```
Original: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
Direct:   https://drive.google.com/uc?export=view&id=FILE_ID
```

**Steps:**
1. Upload gambar ke Google Drive
2. Klik kanan → Get link → Set "Anyone with the link"
3. Copy FILE_ID dari link
4. Format jadi: `https://drive.google.com/uc?export=view&id=FILE_ID`
5. Paste di form produk

⚠️ **Note:** Google Drive lebih lambat dan ada rate limit. Cloudinary lebih direkomendasikan!

---

**Support:** https://cloudinary.com/documentation  
**Community:** https://community.cloudinary.com/

---

**Last Updated:** December 10, 2025  
**Version:** 2.0 - Simplified (No Package Required!)
