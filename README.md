# Portfolio

Derleme adımı olmayan, sade HTML/CSS/JS kişisel site.

| Dosya | Ne işe yarar |
|---|---|
| `content.js` | **Tüm içerik** (isim, hakkımda, projeler, deneyim, sosyal linkler, e-posta). Sadece bunu düzenle. |
| `index.html` | Sayfa iskeleti |
| `styles.css` | Tasarım (renkler en üstte `:root` içinde) |
| `main.js` | Etkileşimler ve iletişim formu |
| `serve.js` | Yerel önizleme sunucusu |

## Yerelde çalıştırma

```bash
node serve.js
```

Ardından http://localhost:5173 adresini aç.

## Proje görseli ekleme

`assets/` klasörü oluşturup görseli içine koy, sonra `content.js` içinde ilgili projeye `image: "assets/dosya.jpg"` yaz.

## İletişim formu

- `formEndpoint` boşsa: "Gönder", ziyaretçinin e-posta uygulamasını mesaj doldurulmuş şekilde açar.
- Mesajların doğrudan gelen kutuna düşmesi için: [formspree.io](https://formspree.io) üzerinde ücretsiz bir form oluştur ve verdiği adresi `formEndpoint` alanına yapıştır.

## Yayınlama

Site GitHub Pages üzerinde: https://sezersvnc.github.io

Güncellemek için değişiklikleri commit'leyip push etmen yeterli; birkaç dakika içinde yayına girer:

```bash
git add -A
git commit -m "İçerik güncellendi"
git push
```
