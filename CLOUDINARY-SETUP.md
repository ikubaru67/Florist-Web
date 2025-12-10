# 📸 Cloudinary Setup Guide

## Cara Setup Cloudinary untuk Upload Gambar Produk

### 1. Buat Akun Cloudinary (Gratis)
1. Kunjungi: https://cloudinary.com/users/register/free
2. Daftar dengan email atau Google/GitHub
3. Free tier termasuk:
   - 25GB storage
   - 25GB bandwidth per bulan
   - 25,000 transformasi per bulan

### 2. Dapatkan Cloud Name
1. Login ke https://console.cloudinary.com/
2. Di dashboard, lihat **Account Details**
3. Copy **Cloud Name** (contoh: `dxyz1234abc`)

### 3. Buat Upload Preset
1. Di Cloudinary Console, klik **Settings** (icon gear) di pojok kanan atas
2. Pilih tab **Upload**
3. Scroll ke bawah ke bagian **Upload presets**
4. Klik **Add upload preset**
5. Isi form:
   - **Preset name**: `florist_products` (atau nama lain)
   - **Signing mode**: **Unsigned** (penting!)
   - **Folder**: `florist-products` (optional, untuk organize)
   - **Resource type**: `Image`
   - **Access mode**: `Public`
   - **Delivery type**: `Upload`
6. Klik **Save**
7. Copy **Preset name** yang baru dibuat

### 4. Update Environment Variables

#### File: `.env`
Tambahkan baris ini:

```env
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=florist_products
```

**Contoh:**
```env
VITE_CLOUDINARY_CLOUD_NAME=dxyz1234abc
VITE_CLOUDINARY_UPLOAD_PRESET=florist_products
```

⚠️ **PENTING:** Setelah update `.env`, restart Vite dev server:
```bash
npm run dev
```

### 5. Cara Menggunakan

#### Admin - Tambah/Edit Produk:
1. Buka halaman Tambah/Edit Produk
2. Klik button **"Upload dari Device"**
3. Upload widget Cloudinary akan terbuka
4. Pilih gambar dari:
   - **Local Files**: Dari komputer
   - **Web Address**: Dari URL
   - **Camera**: Ambil foto langsung
5. Crop gambar (aspect ratio 1:1 / square)
6. Klik **Done**
7. URL gambar otomatis ter-isi
8. Preview gambar muncul
9. Save produk seperti biasa

#### Atau Paste URL Manual:
- Bisa juga paste URL gambar dari sumber lain (Google Drive, Imgur, dll)
- Tinggal paste di field "Atau paste URL gambar"

### 6. Features Cloudinary Upload Widget

✅ **Image Optimization**
- Auto resize & compress
- Convert ke format optimal (WebP)
- CDN global untuk loading cepat

✅ **Image Cropping**
- Crop ke aspect ratio 1:1 (square)
- Preview real-time sebelum upload

✅ **Multiple Sources**
- Upload dari computer
- Paste URL gambar
- Ambil foto dari kamera

✅ **Validation**
- Max file size: 5MB
- Format: PNG, JPG, JPEG, GIF, WebP
- Auto reject file yang tidak valid

### 7. Transformasi URL (Advanced)

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
4. ✅ Update `.env` dengan credentials
5. ✅ Restart `npm run dev`
6. ✅ Test upload di Admin → Tambah Produk
7. ✅ Done! Gambar otomatis di-host di Cloudinary CDN

**Support:** https://cloudinary.com/documentation  
**Community:** https://community.cloudinary.com/

---

**Last Updated:** December 10, 2025  
**Version:** 1.0
