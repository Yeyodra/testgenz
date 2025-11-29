# Panduan Deploy ke Vercel

## Persiapan

Project ini menggunakan Next.js 15 dan membutuhkan environment variables untuk API keys.

### Environment Variables yang Dibutuhkan

Berdasarkan `.env.example`, project ini membutuhkan:
- `GEMINI_API_KEY` - API key untuk Gemini AI
- `DATABASE_URL` - URL koneksi database (opsional, jika menggunakan database)

## Cara Deploy ke Vercel

### Opsi 1: Deploy via Vercel Dashboard (Recommended)

1. **Push code ke Git repository**
   ```bash
   git add .
   git commit -m "Setup Vercel deployment"
   git push origin main
   ```

2. **Import project ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan akun GitHub/GitLab/Bitbucket
   - Klik "Add New Project"
   - Import repository project ini

3. **Configure Environment Variables**
   - Di halaman import project, scroll ke bagian "Environment Variables"
   - Tambahkan variable berikut:
     ```
     GEMINI_API_KEY=your_gemini_api_key_here
     DATABASE_URL=your_database_url_here
     ```
   - Pastikan environment variables ditambahkan untuk semua environment (Production, Preview, Development)

4. **Deploy**
   - Klik "Deploy"
   - Tunggu proses build selesai (biasanya 2-3 menit)
   - Project akan otomatis deploy di URL: `https://your-project-name.vercel.app`

### Opsi 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login ke Vercel**
   ```bash
   vercel login
   ```

3. **Deploy project**
   ```bash
   vercel
   ```
   - Ikuti prompt untuk setup project
   - Pilih scope/team
   - Konfirmasi settings

4. **Set Environment Variables via CLI**
   ```bash
   vercel env add GEMINI_API_KEY
   vercel env add DATABASE_URL
   ```
   - Pilih environment (production/preview/development)
   - Masukkan value untuk setiap variable

5. **Deploy ke Production**
   ```bash
   vercel --prod
   ```

## Mengelola Environment Variables

### Menambah/Edit Environment Variables

**Via Dashboard:**
1. Buka project di [vercel.com/dashboard](https://vercel.com/dashboard)
2. Pilih project
3. Klik tab "Settings"
4. Klik "Environment Variables"
5. Tambah atau edit variables
6. Redeploy project untuk apply perubahan

**Via CLI:**
```bash
# Tambah variable baru
vercel env add VARIABLE_NAME

# List semua variables
vercel env ls

# Remove variable
vercel env rm VARIABLE_NAME
```

### Environment Variables untuk Development Lokal

Untuk development lokal, gunakan file `.env.local`:

1. Copy `.env.example` ke `.env.local`:
   ```bash
   copy .env.example .env.local
   ```

2. Isi values di `.env.local`:
   ```
   GEMINI_API_KEY=your_local_api_key
   DATABASE_URL=your_local_database_url
   ```

**PENTING:** File `.env.local` sudah ada di `.gitignore` dan tidak akan ter-commit ke repository.

## Auto-Deploy

Setelah setup awal, Vercel akan otomatis deploy setiap kali:
- Push ke branch `main` → Deploy ke Production
- Push ke branch lain → Deploy ke Preview environment
- Pull Request dibuat → Deploy preview untuk testing

## Custom Domain (Opsional)

1. Buka project di Vercel Dashboard
2. Klik tab "Settings"
3. Klik "Domains"
4. Tambahkan custom domain
5. Update DNS records sesuai instruksi Vercel

## Troubleshooting

### Build Error: Missing Environment Variables
- Pastikan semua environment variables sudah ditambahkan di Vercel Dashboard
- Check typo pada nama variable
- Redeploy setelah menambahkan variables

### API Routes Tidak Berfungsi
- Pastikan API routes ada di folder `src/app/api/`
- Check logs di Vercel Dashboard → Functions tab

### Database Connection Error
- Pastikan `DATABASE_URL` sudah diset dengan benar
- Untuk production, gunakan database yang accessible dari internet
- Pertimbangkan menggunakan Vercel Postgres atau Supabase

## Monitoring

- **Logs:** Vercel Dashboard → Project → Deployments → View Function Logs
- **Analytics:** Vercel Dashboard → Project → Analytics
- **Performance:** Vercel Dashboard → Project → Speed Insights

## Keamanan Environment Variables

✅ **DO:**
- Simpan API keys di Vercel Environment Variables
- Gunakan `.env.local` untuk development
- Tambahkan `.env.local` ke `.gitignore`

❌ **DON'T:**
- Commit API keys ke Git repository
- Share `.env.local` file
- Hardcode API keys di source code

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)
