/* ═══════════════════════════════════════════════════════
   tugas-ar.js — Logika Interaksi Kartu Nama AR
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', async () => {

  // 1. Cek ketersediaan kamera menggunakan fungsi bawaan utils.js
  const ok = await checkCamera();
  if (!ok) {
    alert("Kamera tidak dapat diakses. Pastikan menggunakan localhost atau HTTPS.");
    return;
  }

  // 2. Ambil elemen container untuk Website Profil
  const websiteUI = document.getElementById('profile-website');

  // 3. Tunggu sampai scene 3D (A-Frame) siap sepenuhnya
  document.querySelector('a-scene').addEventListener('loaded', () => {
    
    // Ambil elemen marker
    const marker = document.getElementById('marker-kartu');

    if (!marker) return;

    // EVENT 1: Ketika kamera berhasil mendeteksi marker
    marker.addEventListener('markerFound', () => {
      // Ubah tulisan di status bar bawah
      setARStatus('Kartu Nama terdeteksi! Membuka profil...', 'found');
      
      // Munculkan website di sebelah kanan layar (tambah class 'show')
      websiteUI.classList.add('show');
    });

    // EVENT 2: Ketika marker ditarik atau hilang dari pandangan kamera
    marker.addEventListener('markerLost', () => {
      // Kembalikan tulisan status bar ke awal
      setARStatus('Arahkan kamera ke marker Hiro...', 'searching');
      
      // Tarik kembali/sembunyikan website dari layar
      websiteUI.classList.remove('show');
    });
    
  });

});