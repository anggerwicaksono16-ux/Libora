/**
 * DIGI-PUSTAKA — script.js
 * Video: YouTube IFrame Player API
 * Kuis OTOMATIS terbuka setelah video selesai
 * (Deteksi selesai video real-time via event onStateChange === ENDED)
 */

/* ================================================
   DATA KUIS — 5 soal unik per modul
   ================================================ */
   const quizData = {
    1: [
      { q: "Berdasarkan naskah, apa karakteristik utama yang membedakan perpustakaan khusus dengan jenis perpustakaan lainnya?", opts: ["Memiliki jumlah koleksi buku fisik paling banyak", "Terbuka bagi seluruh lapisan masyarakat umum", "koleksi dirancang untuk mendukung tugas instansi", "Dikelola sepenuhnya oleh tenaga sukarelawan lembaga"], correct: 2 },
      { q: "Peraturan manakah yang menjadi acuan utama dalam Standar Nasional Perpustakaan Khusus (SNPK) saat ini?", opts: ["SNPK Nomor 7 Tahun 2022", "Undang-Undang Nomor 43 Tahun 2007", "SNPK Nomor 5 Tahun 2020", " Peraturan Pemerintah Nomor 24 Tahun 2014"], correct: 0 },
      { q: "Berdasarkan Pasal 2 SNPK, perpustakaan khusus berada pada tiga jenis lembaga berikut, kecuali..?", opts: ["Lembaga pemerintah", "Lembaga non-pemerintah (swasta)", "Rumah ibadah", "Sekolah umum dan madrasah"], correct: 3 },
      { q: "Ada berapa komponen utama yang wajib dipenuhi dalam pengelolaan perpustakaan khusus menurut standar nasional?", opts: ["4 Komponen", "5 Komponen", "6 Komponen", "7 Komponen"], correct: 2 },
      { q: "Komponen yang mengatur tentang perencanaan strategis, anggaran tahunan, dan evaluasi kinerja berkala disebut dengan komponen..?", opts: ["Koleksi", "Pengelolaan", "Penyelenggaraan", "Sarana dan Prasarana"], correct: 1 }
    ],
    2: [
      { q: "Apa langkah pertama dalam pengelolaan koleksi perpustakaan khusus?", opts: ["Pelestarian koleksi", "Katalogisasi", "Pengembangan koleksi", "Penyiangan"], correct: 2 },
      { q: "Apa tujuan klasifikasi menggunakan DDC?", opts: ["Mengelompokkan buku berdasarkan subjek", "Memberi nomor infentaris", "Membersihkan koleksi dari debu", "Mencatat peminjaman buku"], correct: 0 },
      { q: "Saat cacah ulang ditemukan dua buku tidak ada di rak tindakan pertama yang tepat adalah?", opts: ["Mengganti dengan buku baru", "Mencocokkan kembali dengan data peminjaman dan lokasi penyimpanan", "Melakukan penyiangan", "Langsun menghapus dari inventaris"], correct: 1 },
      { q: "Koleksi digital perpustakaan sebaiknya dikelola menggunakan?", opts: ["Buku catatan manual", "Sistem katalog online", "Lembar spreadsheet tanpa backup", "Flashdisk pribadi pustakawan"], correct: 1 },
      { q: "Mengapa pelestarian koleksi dilakukan secara berkala?", opts: ["Agar rak terlihat penuh", "Agar proses katalogisasi lebih cepat", "Agar jumlah buku berkuran", "Agar koleksi tetap awet dan dapat dimanfaatkan lebih lama"], correct: 3 }
    ],
    3: [
      { q: "Fasilitas utama yang wajib dimiliki perpustakaan khusus modern adalah?", opts: ["Kolam renang", "Ruang baca nyaman, akses internet, dan sistem katalog digital", "Kafetaria mewah", "Studio rekaman"], correct: 1 },
      { q: "Teknologi RFID digunakan di perpustakaan untuk?", opts: ["Memutar musik", "Otomasi peminjaman, pengembalian, dan keamanan koleksi", "Mencetak buku baru", "Mengatur suhu ruangan"], correct: 1 },
      { q: "Self-service kiosk di perpustakaan berfungsi untuk?", opts: ["Menjual makanan ringan", "Memungkinkan pengguna meminjam dan mengembalikan koleksi secara mandiri", "Mencetak foto", "Membuat kartu identitas"], correct: 1 },
      { q: "Standar pencahayaan ruang baca perpustakaan yang direkomendasikan adalah?", opts: ["Sangat gelap agar tenang", "Cahaya terang merata sekitar 300–500 lux", "Hanya cahaya lilin", "Lampu warna-warni"], correct: 1 },
      { q: "Infrastruktur jaringan yang mendukung perpustakaan digital meliputi?", opts: ["Hanya telepon kabel", "Koneksi internet cepat, Wi-Fi, dan server lokal yang handal", "Antena radio", "Mesin fax generasi lama"], correct: 1 }
    ],
    4: [
      { q: "Sistem Otomasi Perpustakaan yang populer di Indonesia adalah?", opts: ["Microsoft Word", "SLiMS (Senayan Library Management System)", "Adobe Photoshop", "Google Maps"], correct: 1 },
      { q: "OPAC dalam sistem perpustakaan merupakan singkatan dari?", opts: ["Online Public Access Catalog", "Open Program Application Center", "Official Publication Access Code", "Online Print Automation Control"], correct: 0 },
      { q: "Integrasi sistem perpustakaan dengan sistem informasi organisasi bertujuan untuk?", opts: ["Mempersulit akses pengguna", "Memudahkan berbagi data dan efisiensi layanan informasi", "Mengurangi koleksi digital", "Membatasi jam operasional"], correct: 1 },
      { q: "Backup data sistem perpustakaan sebaiknya dilakukan?", opts: ["Tidak perlu dilakukan", "Secara berkala dan disimpan di lokasi berbeda (termasuk cloud)", "Hanya saat sistem rusak", "Setahun sekali saja"], correct: 1 },
      { q: "Manfaat automasi pengelolaan sirkulasi perpustakaan adalah?", opts: ["Memperlambat proses peminjaman", "Mempercepat transaksi, mengurangi kesalahan, dan menghasilkan laporan otomatis", "Menghilangkan peran pustakawan", "Mempermahal biaya operasional"], correct: 1 }
    ],
    5: [
      { q: "Layanan referensi di perpustakaan khusus berfungsi untuk?", opts: ["Menjual buku kepada pengguna", "Membantu pengguna menemukan informasi yang tepat dan relevan", "Mengatur jadwal rapat", "Membersihkan koleksi"], correct: 1 },
      { q: "Cara terbaik mengukur kepuasan pengguna perpustakaan adalah?", opts: ["Mengamati penampilan pengguna", "Survei kepuasan, wawancara, dan analisis statistik penggunaan layanan", "Menghitung jumlah buku yang dipinjam saja", "Melihat jumlah pengunjung tanpa analisis"], correct: 1 },
      { q: "Literasi informasi yang diajarkan pustakawan kepada pengguna mencakup?", opts: ["Cara memasak", "Cara menemukan, mengevaluasi, dan menggunakan informasi secara efektif", "Cara mendesain grafis", "Cara berolahraga"], correct: 1 },
      { q: "Layanan berbasis kebutuhan pengguna (user-centered service) mengutamakan?", opts: ["Kenyamanan pustakawan semata", "Kebutuhan, preferensi, dan pengalaman pengguna dalam setiap layanan", "Penghematan anggaran saja", "Jumlah koleksi buku terbanyak"], correct: 1 },
      { q: "Komunikasi efektif antara pustakawan dan pengguna ditingkatkan melalui?", opts: ["Mengabaikan pertanyaan pengguna", "Pelatihan komunikasi, empati, dan responsivitas terhadap kebutuhan pengguna", "Membatasi jam layanan", "Mengurangi jumlah staf layanan"], correct: 1 }
    ],
    6: [
      { q: "Kompetensi utama yang harus dimiliki pustakawan khusus adalah?", opts: ["Kemampuan memasak", "Penguasaan ilmu perpustakaan, teknologi informasi, dan komunikasi", "Kemampuan menyanyi", "Keahlian bela diri"], correct: 1 },
      { q: "Sertifikasi pustakawan di Indonesia dikeluarkan oleh?", opts: ["Kementerian Perdagangan", "Perpustakaan Nasional RI melalui uji kompetensi resmi", "Dinas Pariwisata", "Kementerian Pertanian"], correct: 1 },
      { q: "Pengembangan profesional berkelanjutan (CPD) bagi pustakawan bertujuan untuk?", opts: ["Menambah jumlah cuti tahunan", "Memperbarui pengetahuan dan keterampilan sesuai perkembangan zaman", "Mengurangi jam kerja", "Mendapatkan kenaikan gaji otomatis"], correct: 1 },
      { q: "Standar kompetensi pustakawan khusus mencakup kemampuan dalam bidang?", opts: ["Hanya pengelolaan fisik koleksi", "Pengelolaan informasi, teknologi, layanan pengguna, dan manajemen perpustakaan", "Hanya administrasi keuangan", "Hanya desain interior"], correct: 1 },
      { q: "Pelatihan relevan untuk meningkatkan kompetensi pustakawan di era digital adalah?", opts: ["Kursus merajut", "Pelatihan literasi digital, metadata, dan pengelolaan repositori institusi", "Kursus memasak internasional", "Pelatihan berkebun"], correct: 1 }
    ],
    7: [
      { q: "Struktur organisasi perpustakaan khusus yang ideal sebaiknya?", opts: ["Tidak perlu ada struktur formal", "Mencerminkan fungsi layanan, pengelolaan koleksi, dan pengembangan sumber daya", "Sama persis dengan struktur perusahaan manufaktur", "Hanya terdiri dari satu orang pustakawan"], correct: 1 },
      { q: "Kebijakan pengembangan koleksi perpustakaan khusus memuat?", opts: ["Resep masakan untuk staf", "Kriteria seleksi, anggaran, prioritas subjek, dan prosedur akuisisi", "Jadwal liburan staf", "Daftar harga makanan kantin"], correct: 1 },
      { q: "Dasar hukum penyelenggaraan perpustakaan di Indonesia adalah?", opts: ["Undang-Undang No. 43 Tahun 2007 tentang Perpustakaan", "Undang-Undang No. 1 Tahun 2000 tentang Perdagangan", "Peraturan Menteri Pertanian", "Keputusan Presiden tentang Olahraga"], correct: 0 },
      { q: "Laporan tahunan perpustakaan khusus berfungsi untuk?", opts: ["Hiasan dinding perpustakaan", "Evaluasi kinerja, pertanggungjawaban, dan bahan perencanaan tahun berikutnya", "Promosi produk perpustakaan", "Pengganti buku koleksi"], correct: 1 },
      { q: "Tata kelola perpustakaan khusus yang baik (good library governance) mencakup?", opts: ["Transparansi, akuntabilitas, efisiensi, dan partisipasi pemangku kepentingan", "Kerahasiaan anggaran dari semua pihak", "Keputusan sepihak tanpa koordinasi", "Pengelolaan tanpa dokumentasi"], correct: 0 }
    ]
  };
  
  /* ================================================
     INFO MODUL
     ================================================ */
  const moduleNames = [
    '', 'Karakteristik', 'Pengembang & Pengolahan', 'Fasilitas & Gedung',
    'Sirkulasi & Promosi', 'Kualifikasi & Pelatihan', 'Kebijakan & Prosedur',
    'Perencanaan & Pengawasan'
  ];

  /* ================================================
     PETA GAMBAR THUMBNAIL PER MODUL
     Isi dengan path/URL gambar thumbnail Anda, contoh:
     1: 'images/modul1.jpg'  atau  1: 'https://contoh.com/gambar.jpg'
     Modul yang belum diisi otomatis memakai ikon emoji seperti biasa.
     ================================================ */
  const thumbnailImages = {
    1: 'perpustakaan khusus.png',
    2: 'koleksi perpustakaan.png',
    3: 'saranaprasaranan perpustakaan.png',
    4: 'pelayanan perpustakaan.png',
    5: 'tenaha perpustakaan.png',
    6: 'penyeleharaan perpustakaan.png',
    7: 'penhelolaan perpustakaan.png',
  };

  /* ================================================
     TERAPKAN THUMBNAIL GAMBAR (dengan fallback ke emoji)
     ================================================ */
  function applyThumbnail(id, src) {
    const img   = document.getElementById('thumbImg' + id);
    const emoji = document.getElementById('thumbEmoji' + id);
    if (!img || !emoji) return;

    if (!src) {
      img.style.display   = 'none';
      emoji.style.display = 'flex';
      return;
    }

    img.onload = function () {
      img.style.display   = 'block';
      emoji.style.display = 'none';
    };
    img.onerror = function () {
      // Gagal memuat gambar -> kembali ke emoji
      img.style.display   = 'none';
      emoji.style.display = 'flex';
      showToast('⚠️ Gambar thumbnail Modul ' + id + ' gagal dimuat.');
    };
    img.src = src;
  }

  function initThumbnails() {
    for (let id = 1; id <= 7; id++) {
      applyThumbnail(id, thumbnailImages[id] || null);
    }
  }

  /* ================================================
     GANTI THUMBNAIL SECARA MANUAL DARI KODE/KONSOL
     Contoh pemakaian: setThumbnail(1, 'images/modul1-baru.jpg')
     ================================================ */
  function setThumbnail(id, src) {
    thumbnailImages[id] = src;
    applyThumbnail(id, src);
  }

  /* ================================================
     SESUAIKAN BADGE DURASI OTOMATIS DENGAN VIDEO ASLI
     Membaca durasi asli tiap video YouTube (dari youtubeVideoIds)
     lalu menuliskannya ke badge "mm:ss" di thumbnail masing-masing.
     Modul yang belum punya YouTube ID akan tetap pakai teks default.
     ================================================ */
  let durationQueue        = [];
  let durationProbePlayer  = null;

  function initDurationBadges() {
    durationQueue = Object.keys(youtubeVideoIds)
      .filter(function (id) { return !!youtubeVideoIds[id]; })
      .map(Number);

    if (durationQueue.length === 0) return;

    if (ytApiReady && typeof YT !== 'undefined' && YT.Player) {
      probeNextDuration();
    } else {
      // Tunggu YouTube IFrame API siap, lalu lanjutkan tanpa mengganggu
      // callback onYouTubeIframeAPIReady yang sudah ada untuk video modal
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof prevReady === 'function') prevReady();
        probeNextDuration();
      };
    }
  }

  function probeNextDuration() {
    if (durationQueue.length === 0) return;
    const id      = durationQueue.shift();
    const videoId = youtubeVideoIds[id];
    if (!videoId) { probeNextDuration(); return; }

    if (!durationProbePlayer) {
      // Pertama kali: buat player tersembunyi
      durationProbePlayer = new YT.Player('durationProbePlayer', {
        videoId: videoId,
        playerVars: { autoplay: 0, controls: 0, disablekb: 1 },
        events: {
          onReady: function () {
            waitForDuration(id);
          }
        }
      });
    } else {
      durationProbePlayer.cueVideoById(videoId);
      waitForDuration(id);
    }
  }

  function waitForDuration(id) {
    let attempts = 0;
    const checkReady = setInterval(function () {
      attempts++;
      const d = durationProbePlayer && typeof durationProbePlayer.getDuration === 'function'
        ? durationProbePlayer.getDuration() : 0;

      if (d && d > 0) {
        clearInterval(checkReady);
        updateDurationBadge(id, d);
        probeNextDuration();
      } else if (attempts >= 20) {
        // Gagal membaca durasi (mis. ID tidak valid) — lewati, badge tetap default
        clearInterval(checkReady);
        probeNextDuration();
      }
    }, 250);
  }

  function updateDurationBadge(id, totalSeconds) {
    const el = document.getElementById('durBadge' + id);
    if (!el) return;
    const m = Math.floor(totalSeconds / 60);
    const s = Math.floor(totalSeconds % 60);
    el.textContent = m + ':' + (s < 10 ? '0' : '') + s;
  }
  
  /* ================================================
     PETA YOUTUBE VIDEO ID PER MODUL
     Isi VIDEO_ID dari link YouTube Anda:
     https://www.youtube.com/watch?v=VIDEO_ID  atau  https://youtu.be/VIDEO_ID
     ================================================ */
  const youtubeVideoIds = {
    1: 'jiRVIfQmz0Q',
    2: '2pxe5Xo8GRc',
    3: 'z6_fZRJQzSw',
    4: 'A806lF7rnhE',
    5: 'i2_pQ_qJUcM',
    6: '9Lr6riIr9WQ',
    7: 'zx4Zno5MnBc',
  };

  /* ================================================
     YOUTUBE IFRAME API — STATE
     ================================================ */
  let ytPlayer        = null;   // instance YT.Player
  let ytApiReady       = false; // true setelah window.onYouTubeIframeAPIReady terpanggil
  let pendingVideoId   = null;  // video id yang menunggu API siap
  let pendingAutoplay  = false;

  // Dipanggil otomatis oleh script https://www.youtube.com/iframe_api setelah API siap
  window.onYouTubeIframeAPIReady = function () {
    ytApiReady = true;
    if (pendingVideoId) {
      createOrLoadYtPlayer(pendingVideoId, pendingAutoplay);
      pendingVideoId = null;
    }
  };

  /* ================================================
     STATE VIDEO
     ================================================ */
  const watchedVideos = new Set(); // id modul yang sudah selesai ditonton
  let currentVideoId  = null;
  let timerInterval   = null;
  
  /* ================================================
     FUNGSI UTAMA: playVideo(id)
     ================================================ */
  function playVideo(id) {
    currentVideoId = id;
  
    const overlay      = document.getElementById('videoOverlay');
    const titleEl      = document.getElementById('videoTitle');
    const statusEl     = document.getElementById('videoStatus');
    const bar          = document.getElementById('videoProgressBar');
    const btn          = document.getElementById('videoDoneBtn');
    const placeholder  = document.getElementById('videoPlaceholder');
    const progWrap     = document.getElementById('videoProgressWrap');
    const manualWrap   = document.getElementById('manualDoneWrap');
    const manualBtn    = document.getElementById('btnManualDone');
    const ytInput      = document.getElementById('youtubeIdInput');
  
    overlay.dataset.cardId = id;
    titleEl.textContent    = 'Modul ' + id + ': ' + (moduleNames[id] || '');
    bar.style.width        = '0%';
  
    clearTimer();
  
    // Cek jika sudah ditonton sebelumnya
    if (watchedVideos.has(id)) {
      const savedId = youtubeVideoIds[id] || ytInput.dataset['mod' + id] || null;
      if (savedId) {
        createOrLoadYtPlayer(savedId, false);
      }
      bar.style.width    = '100%';
      btn.disabled       = false;
      btn.textContent    = '✔ Buka Kuis';
      statusEl.textContent = '✅ Anda sudah menonton video ini.';
      manualWrap.style.display = 'none';
      overlay.classList.add('open');
      return;
    }
  
    // Cek apakah sudah ada YouTube ID di peta
    const ytId = youtubeVideoIds[id] || null;
  
    if (ytId) {
      // Langsung muat player YouTube
      createOrLoadYtPlayer(ytId, true);
      progWrap.style.display   = 'block';
      statusEl.textContent     = '▶ Tonton video hingga selesai — kuis akan terbuka otomatis.';
      btn.disabled             = true;
      btn.textContent          = '⏳ Menonton...';
      manualBtn.style.display  = 'none';
      manualWrap.style.display = 'none';
    } else {
      // Tampilkan placeholder input link YouTube
      document.getElementById('ytPlayerContainer').style.display = 'none';
      placeholder.style.display    = 'flex';
      progWrap.style.display       = 'none';
      btn.disabled                 = true;
      btn.textContent              = '⏳ Menonton...';
      statusEl.textContent         = '📂 Masukkan link/ID YouTube untuk memulai video.';
      document.getElementById('videoPlaceholderLabel').textContent =
        'Masukkan link/ID YouTube untuk Modul ' + id + ': ' + (moduleNames[id] || '');
      ytInput.value                = '';
      manualBtn.style.display      = 'none';
      manualWrap.style.display     = 'none';
    }
  
    overlay.classList.add('open');
  }
  
  /* ================================================
     MUAT VIDEO DARI INPUT LINK/ID YOUTUBE (manual input)
     ================================================ */
  function loadYoutubeVideo() {
    const input  = document.getElementById('youtubeIdInput');
    const rawVal = input.value.trim();
    if (!rawVal) { showToast('⚠️ Masukkan link atau ID YouTube terlebih dahulu!'); return; }
  
    const ytId = extractYoutubeId(rawVal);
    if (!ytId) { showToast('⚠️ Link/ID YouTube tidak valid!'); return; }
  
    // Simpan ID sementara untuk modul ini
    input.dataset['mod' + currentVideoId] = ytId;
  
    const statusEl  = document.getElementById('videoStatus');
    const progWrap  = document.getElementById('videoProgressWrap');
    const btn       = document.getElementById('videoDoneBtn');
  
    createOrLoadYtPlayer(ytId, true);
    progWrap.style.display  = 'block';
    statusEl.textContent    = '▶ Tonton video hingga selesai — kuis akan terbuka otomatis.';
    btn.disabled            = true;
    btn.textContent         = '⏳ Menonton...';
  }
  
  /* ================================================
     EKSTRAK VIDEO ID DARI BERAGAM FORMAT LINK YOUTUBE
     ================================================ */
  function extractYoutubeId(raw) {
    raw = raw.trim();
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtube\.com\/live\/|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    ];
    for (const p of patterns) {
      const m = raw.match(p);
      if (m) return m[1];
    }
    // Jika user langsung paste ID mentah (11 karakter)
    if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;
    return null;
  }
  
  /* ================================================
     BUAT / MUAT ULANG YOUTUBE PLAYER (IFrame API)
     ================================================ */
  function createOrLoadYtPlayer(videoId, autoplay) {
    document.getElementById('videoPlaceholder').style.display   = 'none';
    document.getElementById('ytPlayerContainer').style.display  = 'block';
  
    // Jika API belum siap, tunda pembuatan player sampai onYouTubeIframeAPIReady terpanggil
    if (!ytApiReady || typeof YT === 'undefined' || !YT.Player) {
      pendingVideoId  = videoId;
      pendingAutoplay = autoplay;
      return;
    }
  
    if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
      if (autoplay) ytPlayer.loadVideoById(videoId);
      else ytPlayer.cueVideoById(videoId);
      return;
    }
  
    ytPlayer = new YT.Player('ytPlayerContainer', {
      videoId: videoId,
      playerVars: {
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        autoplay: autoplay ? 1 : 0
      },
      events: {
        onStateChange: onYtStateChange
      }
    });
  }
  
  /* ================================================
     EVENT PERUBAHAN STATUS PLAYER YOUTUBE
     ================================================ */
  function onYtStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
      startProgressTracking();
    } else if (event.data === YT.PlayerState.PAUSED) {
      clearTimer();
    } else if (event.data === YT.PlayerState.ENDED) {
      clearTimer();
      const bar = document.getElementById('videoProgressBar');
      if (bar) bar.style.width = '100%';
      onVideoEnded(currentVideoId);
    }
  }
  
  /* ================================================
     LACAK PROGRESS TONTONAN (posisi asli dari player YouTube)
     ================================================ */
  function startProgressTracking() {
    clearTimer();
  
    const bar = document.getElementById('videoProgressBar');
  
    timerInterval = setInterval(function () {
      if (!ytPlayer || typeof ytPlayer.getDuration !== 'function') return;
      const duration = ytPlayer.getDuration();
      const current  = ytPlayer.getCurrentTime();
      if (!duration) return;
  
      const pct = Math.min((current / duration) * 100, 100);
      if (bar) bar.style.width = pct + '%';
    }, 500);
  }
  
  function clearTimer() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  }
  
  /* ================================================
     EVENT: VIDEO SELESAI (otomatis atau manual)
     ================================================ */
  function onVideoEnded(id) {
    const bar    = document.getElementById('videoProgressBar');
    const btn    = document.getElementById('videoDoneBtn');
    const status = document.getElementById('videoStatus');
    const manualBtn = document.getElementById('btnManualDone');
  
    watchedVideos.add(id);
    unlockQuizCard(id);
  
    bar.style.width    = '100%';
    btn.disabled       = false;
    btn.textContent    = '✔ Buka Kuis';
    status.textContent = '🎉 Video selesai! Kuis akan terbuka...';
    manualBtn.style.display = 'none';
  
    // Otomatis tutup video & buka kuis setelah 1,2 detik
    setTimeout(function () {
      closeVideoModal();
      setTimeout(function () {
        openQuiz(moduleNames[id] || 'Modul ' + id, id);
      }, 350);
    }, 1200);
  }
  
  /* ================================================
     TOMBOL MANUAL: "Saya Sudah Selesai Menonton"
     ================================================ */
  function markVideoWatched() {
    clearTimer();
    onVideoEnded(currentVideoId);
  }
  
  /* ================================================
     TOMBOL "Buka Kuis" (setelah ditonton)
     ================================================ */
  function videoDone() {
    const id = parseInt(document.getElementById('videoOverlay').dataset.cardId);
    closeVideoModal();
    if (watchedVideos.has(id)) {
      setTimeout(function () {
        openQuiz(moduleNames[id] || 'Modul ' + id, id);
      }, 350);
    }
  }
  
  /* ================================================
     TUTUP MODAL VIDEO
     ================================================ */
  function closeVideoModal() {
    clearTimer();
    // Hentikan video YouTube jika player sudah dibuat
    if (ytPlayer && typeof ytPlayer.stopVideo === 'function') {
      ytPlayer.stopVideo();
    }
    document.getElementById('ytPlayerContainer').style.display = 'none';
    document.getElementById('videoPlaceholder').style.display  = 'flex';
    document.getElementById('videoOverlay').classList.remove('open');
    document.getElementById('manualDoneWrap').style.display = 'none';
    document.getElementById('btnManualDone').style.display  = 'none';
  }
  
  function handleVideoOverlayClick(e) {
    if (e.target === document.getElementById('videoOverlay')) {
      const id = parseInt(document.getElementById('videoOverlay').dataset.cardId);
      // Boleh ditutup hanya jika sudah selesai ditonton
      if (watchedVideos.has(id)) closeVideoModal();
      else showToast('⚠️ Selesaikan menonton video terlebih dahulu!');
    }
  }
  
  /* ================================================
     UNLOCK QUIZ CARD SETELAH SELESAI NONTON
     ================================================ */
  function unlockQuizCard(id) {
    const card = document.querySelector('.video-card:nth-child(' + id + ')');
    if (!card) return;
    const btn = card.querySelector('.btn-quiz');
    if (btn)  { btn.classList.remove('btn-quiz-locked'); btn.disabled = false; }
    const badge = card.querySelector('.quiz-badge');
    if (badge) badge.classList.remove('quiz-badge-locked');
    const prog = document.getElementById('prog' + id);
    if (prog)  prog.style.width = '20%';
  }
  
  /* ================================================
     STATE & FUNGSI KUIS
     ================================================ */
  let currentModule   = 1;
  let currentQuestion = 0;
  let selectedOption  = null;
  let score           = 0;
  let answered        = [];
  let currentCardId   = null;
  
  function openQuiz(moduleName, cardId) {
    if (!watchedVideos.has(cardId)) {
      showToast('⚠️ Tonton video terlebih dahulu sebelum mengerjakan kuis!');
      return;
    }
    currentModule   = cardId;
    currentQuestion = 0;
    selectedOption  = null;
    score           = 0;
    answered        = [];
    currentCardId   = cardId;
  
    document.getElementById('quizTitle').textContent = 'Kuis Modul ' + cardId + ': ' + moduleName;
    document.getElementById('quizOverlay').classList.add('open');
    renderQuestion();
  }
  
  function closeQuiz() {
    document.getElementById('quizOverlay').classList.remove('open');
    if (currentCardId) {
      const total = quizData[currentModule].length;
      const prog  = document.getElementById('prog' + currentCardId);
      if (prog) prog.style.width = (answered.length / total * 100) + '%';
    }
  }
  
  function handleOverlayClick(e) {
    if (e.target === document.getElementById('quizOverlay')) closeQuiz();
  }
  
  function renderQuestion() {
    const data  = quizData[currentModule];
    const q     = data[currentQuestion];
    const total = data.length;
  
    document.getElementById('quizQuestion').textContent = q.q;
    document.getElementById('quizCounter').textContent  = 'Soal ' + (currentQuestion + 1) + ' dari ' + total;
    document.getElementById('quizScore').textContent    = 'Skor: ' + score + '/' + (total * 10);
    document.getElementById('quizProgressBar').style.width = ((currentQuestion + 1) / total * 100) + '%';
  
    const labels    = ['A', 'B', 'C', 'D'];
    const container = document.getElementById('quizOptions');
    container.innerHTML = '';
    selectedOption = null;
  
    q.opts.forEach(function (opt, i) {
      const div     = document.createElement('div');
      div.className = 'quiz-option';
  
      if (answered[currentQuestion] !== undefined) {
        // Hanya menandai opsi yang dipilih user (benar/salah),
        // opsi lain (termasuk jawaban benar) tidak ditandai.
        if (i === answered[currentQuestion]) {
          div.classList.add(i === q.correct ? 'correct' : 'wrong');
        }
      }
  
      div.innerHTML = '<span><span class="opt-label">' + labels[i] + '</span>' + opt + '</span><span class="opt-circle"></span>';
      div.onclick   = function () { selectOption(i, div); };
      container.appendChild(div);
    });
  
    if (answered[currentQuestion] !== undefined) {
      container.querySelectorAll('.quiz-option')[answered[currentQuestion]].classList.add('selected');
    }
  
    // Tombol Next hanya aktif jika soal ini sudah dijawab (Submit)
    const btnNext = document.getElementById('btnNext');
    if (btnNext) btnNext.disabled = (answered[currentQuestion] === undefined);
  }
  
  function selectOption(idx, el) {
    if (answered[currentQuestion] !== undefined) return;
    selectedOption = idx;
    document.querySelectorAll('.quiz-option').forEach(function (o) { o.classList.remove('selected'); });
    el.classList.add('selected');
  }
  
  function submitAnswer() {
    if (selectedOption === null) { showToast('⚠️ Pilih salah satu jawaban terlebih dahulu!'); return; }
    if (answered[currentQuestion] !== undefined) return;
  
    const q = quizData[currentModule][currentQuestion];
    answered[currentQuestion] = selectedOption;
    if (selectedOption === q.correct) score += 10;
  
    renderQuestion();
    document.getElementById('quizScore').textContent = 'Skor: ' + score + '/' + (quizData[currentModule].length * 10);

    // Otomatis lanjut ke soal berikutnya setelah submit
    setTimeout(function () { nextQuestion(); }, 500);
  }
  
  function nextQuestion() {
    const data = quizData[currentModule];
  
    // Jangan lanjut jika soal saat ini belum dijawab (jaga-jaga selain disabled)
    if (answered[currentQuestion] === undefined) {
      showToast('⚠️ Pilih salah satu jawaban terlebih dahulu!');
      return;
    }
  
    if (currentQuestion < data.length - 1) {
      currentQuestion++;
      selectedOption = null;
      renderQuestion();
    } else {
      const total = data.length * 10;
      closeQuiz();
      // Update progress bar card menjadi 100% jika semua soal dijawab
      if (answered.length === data.length) {
        const prog = document.getElementById('prog' + currentCardId);
        if (prog) prog.style.width = '100%';
      }
      setTimeout(function () { showResultModal(score, total); }, 300);
    }
  }
  
  /* ================================================
     MODAL HASIL KUIS (pengganti alert bawaan browser)
     ================================================ */
  function showResultModal(score, total) {
    const pct     = total > 0 ? Math.round((score / total) * 100) : 0;
    const icon    = document.getElementById('resultIcon');
    const title   = document.getElementById('resultTitle');
    const scoreEl = document.getElementById('resultScoreText');
    const barFill = document.getElementById('resultBarFill');
    const msgEl   = document.getElementById('resultMessage');
    const overlay = document.getElementById('resultOverlay');
  
    let emoji, message;
    if (score === total)        { emoji = '🏆'; message = '✅ Sempurna! Luar biasa!'; }
    else if (pct >= 60)          { emoji = '🎉'; message = '👍 Bagus! Pertahankan!'; }
    else                          { emoji = '📚'; message = '📚 Pelajari lagi materinya ya!'; }
  
    icon.textContent    = emoji;
    title.textContent   = 'Kuis Selesai!';
    scoreEl.textContent = score + ' / ' + total;
    msgEl.textContent   = message;
    barFill.style.width = '0%';
  
    overlay.classList.add('open');
    // Animasikan progress bar sedikit setelah modal tampil
    setTimeout(function () { barFill.style.width = pct + '%'; }, 100);
  }
  
  function closeResultModal() {
    document.getElementById('resultOverlay').classList.remove('open');
  }
  
  function handleResultOverlayClick(e) {
    if (e.target === document.getElementById('resultOverlay')) closeResultModal();
  }
  
  /* ================================================
     TOAST
     ================================================ */
  function showToast(msg) {
    let toast = document.getElementById('toastMsg');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastMsg';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 3000);
  }
  
  /* ================================================
     NAVIGASI HALAMAN
     ================================================ */
  function showPage(pageId, link) {
    document.querySelectorAll('.page-section').forEach(function (el) { el.style.display = 'none'; });
    const target = document.getElementById('page-' + pageId);
    if (target) target.style.display = 'block';
    document.querySelectorAll('.nav-links a').forEach(function (a) { a.classList.remove('active'); });
    if (link) link.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  /* ================================================
     KONTAK
     ================================================ */
  function sendMessage() {
    const inputs = document.querySelectorAll('#page-kontak .form-input');
    let empty = false;
    inputs.forEach(function (el) { if (!el.value.trim()) empty = true; });
    if (empty) { showToast('⚠️ Harap isi semua kolom sebelum mengirim!'); return; }
    showToast('✅ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
    inputs.forEach(function (el) { el.value = ''; });
  }
  
  /* ================================================
     SEARCH
     ================================================ */
  function searchVideos(keyword) {
    const q     = keyword.trim().toLowerCase();
    const cards = document.querySelectorAll('#page-beranda .video-card');
    let found   = 0;
  
    cards.forEach(function (card) {
      const title = (card.querySelector('.card-title') || {}).textContent || '';
      const sub   = (card.querySelector('.card-sub')   || {}).textContent || '';
      const match = !q || title.toLowerCase().includes(q) || sub.toLowerCase().includes(q);
      card.style.display = match ? '' : 'none';
      if (match) found++;
    });
  
    let msg = document.getElementById('searchEmptyMsg');
    if (!msg) {
      msg = document.createElement('div');
      msg.id = 'searchEmptyMsg';
      msg.style.cssText = 'text-align:center;padding:40px;color:#888;font-size:1rem;grid-column:1/-1;';
      document.querySelector('#page-beranda .video-grid').appendChild(msg);
    }
    msg.style.display = (found === 0 && q) ? 'block' : 'none';
    msg.textContent   = found === 0 && q ? '🔍 Tidak ada video yang cocok dengan "' + keyword + '"' : '';
  }
  
  /* ================================================
     INIT — Kunci semua tombol quiz saat halaman dimuat
     ================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initThumbnails();
    initDurationBadges();
    document.querySelectorAll('.btn-quiz').forEach(function (btn) {
      btn.classList.add('btn-quiz-locked');
      btn.disabled = true;
    });
    document.querySelectorAll('.quiz-badge').forEach(function (badge) {
      badge.classList.add('quiz-badge-locked');
    });
  });
