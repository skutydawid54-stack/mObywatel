# 🇵🇱 mObywatel - Generator Dowodu Osobistego

Edukacyjna aplikacja webowa do generowania i weryfikacji polskiego dowodu osobistego z walidacją PESEL.

## ✨ Funkcjonalności

### 📋 Główne cechy:
- ✅ **Walidacja PESEL** - weryfikacja sumy kontrolnej i formatu
- 📅 **Automatyczne obliczenie daty urodzenia** - z pierwszych 6 cyfr PESEL
- 👤 **Automatyczne określenie płci** - na podstawie przedostatniej cyfry PESEL
- 📷 **Upload własnego zdjęcia** - drag & drop lub kliknięcie
- 💾 **Zapis danych** - do localStorage przeglądarki
- 🔄 **Generowanie QR Code** - z danymi z dowodu
- 🎲 **Losowy kod jednorazowy** - co 6 cyfr
- 🖨️ **Drukowanie** - w rzeczywistych rozmiarach dowodu
- 📱 **Responsywny design** - na urządzeniach mobilnych
- ℹ️ **Sekcja edukacyjna** - jak działa PESEL

## 🎓 Cel edukacyjny

Aplikacja pokazuje:
1. **Struktura PESEL** (11 cyfr):
   - 6 cyfr: data urodzenia (RRMMDD)
   - 3 cyfry: numer seryjny
   - 1 cyfra: kod płci (nieparzysta = mężczyzna, parzysta = kobieta)
   - 1 cyfra: suma kontrolna

2. **Algorytm walidacji** - obliczanie sumy kontrolnej
3. **Bezpieczeństwo danych** - tylko localStorage (brak wysyłania na serwer)

## 🚀 Uruchamianie

### Online (GitHub Pages)
Aplikacja jest dostępna na:
https://skutydawid54-stack.github.io/mObywatel

### Lokalne
1. Sklonuj repozytorium:
```bash
git clone https://github.com/skutydawid54-stack/mObywatel.git
cd mObywatel
```

2. Otwórz `index.html` w przeglądarce:
```bash
open index.html  # macOS
start index.html # Windows
```

3. Lub uruchom lokalny serwer:
```bash
python -m http.server 8000
# Otwórz http://localhost:8000
```

## 🛠️ Technologie

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Biblioteki**: 
  - [QRCode.js](https://davidshimjs.github.io/qrcodejs/) - generowanie QR
  - [Tailwind CSS](https://tailwindcss.com/) - styling

## 📝 Jak używać

1. **Wpisz dane**:
   - IMIĘ i NAZWISKO
   - PESEL (11 cyfr)
   - Data urodzenia oblicza się automatycznie

2. **Dodaj zdjęcie**:
   - Kliknij na pole zdjęcia
   - Wybierz plik z komputera

3. **Wygeneruj QR**:
   - Kliknij "NOWY KOD QR"
   - System wygeneruje QR i losowy kod

4. **Zapisz dane**:
   - Kliknij "ZAPISZ DANE"
   - Dane będą dostępne po przeładowaniu

5. **Drukuj**:
   - Kliknij "DRUKUJ"
   - Wydrukuj w rzeczywistych rozmiarach

## ⚠️ Ważne

- **TO NIE JEST DOKUMENT PRAWNY** - to tylko aplikacja edukacyjna
- **Dane przechowywane lokalnie** - nie są wysyłane na żaden serwer
- **Przykładowy PESEL** (85031212345) jest używany do demonstracji
- Nie należy używać do celów sztucznych lub oszukańczych

## 🔐 Bezpieczeństwo

- Brak wysyłania danych na serwer
- Wszystko dzieje się w przeglądarce (localStorage)
- Możliwy do uruchomienia offline

## 📄 Licencja

MIT License - możesz używać, modyfikować i rozpowszechniać

## 👨‍💻 Autor

@skutydawid54-stack

---

**Zastrzeżenie**: Aplikacja jest edukacyjna. Nie należy jej używać do tworzenia fałszywych dokumentów ani do jakichkolwiek celów niezgodnych z prawem.