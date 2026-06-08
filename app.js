// ============ WALIDACJA PESEL ============
function validatePESEL(pesel) {
  pesel = pesel.trim();
  
  // Sprawdzenie długości i czy to cyfry
  if (!/^\d{11}$/.test(pesel)) {
    return { valid: false, error: '❌ PESEL musi mieć 11 cyfr' };
  }

  // Wagi do obliczenia sumy kontrolnej
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  
  for (let i = 0; i < 10; i++) {
    sum += parseInt(pesel[i]) * weights[i];
  }
  
  // Obliczenie cyfry kontrolnej
  const checkDigit = (10 - (sum % 10)) % 10;
  const lastDigit = parseInt(pesel[10]);
  
  if (checkDigit !== lastDigit) {
    return { valid: false, error: '❌ Niepoprawna suma kontrolna PESEL' };
  }

  return { valid: true, error: '✅ PESEL prawidłowy' };
}

// ============ OBLICZANIE DATY URODZENIA Z PESEL ============
function calculateBirthDate(pesel) {
  if (!validatePESEL(pesel).valid) return null;

  // RRMMDD - pierwsze 6 cyfr
  const year = parseInt(pesel.substring(0, 2));
  const month = parseInt(pesel.substring(2, 4));
  const day = parseInt(pesel.substring(4, 6));

  // Określenie stulecia na podstawie miesiąca
  let fullYear;
  const monthCode = month % 20; // Miesiąc bez kodu stulecia
  
  if (month >= 1 && month <= 12) {
    fullYear = 1900 + year; // XX wiek
  } else if (month >= 21 && month <= 32) {
    fullYear = 2000 + year; // XXI wiek
  } else if (month >= 41 && month <= 52) {
    fullYear = 2100 + year; // XXII wiek
  } else if (month >= 61 && month <= 72) {
    fullYear = 1800 + year; // XIX wiek
  }

  try {
    const date = new Date(fullYear, monthCode - 1, day);
    if (date.getDate() === day && date.getMonth() === monthCode - 1) {
      return {
        day: String(day).padStart(2, '0'),
        month: String(monthCode).padStart(2, '0'),
        year: fullYear,
        formatted: `${String(day).padStart(2, '0')}.${String(monthCode).padStart(2, '0')}.${fullYear}`
      };
    }
  } catch (e) {
    return null;
  }
  return null;
}

// ============ OKREŚLENIE PŁCI Z PESEL ============
function getGenderFromPESEL(pesel) {
  if (!validatePESEL(pesel).valid) return null;
  const genderDigit = parseInt(pesel[9]); // Przedostatnia cyfra
  return genderDigit % 2 === 0 ? 'KOBIETA' : 'MĘŻCZYZNA';
}

// ============ SŁUCHACZE ZDARZEŃ NA POLU PESEL ============
document.getElementById('pesel').addEventListener('input', function() {
  const pesel = this.value.trim();
  const statusDiv = document.getElementById('pesel-status');
  
  if (pesel.length === 0) {
    statusDiv.innerHTML = '';
    return;
  }
  
  // Walidacja
  const validation = validatePESEL(pesel);
  
  if (!validation.valid) {
    statusDiv.innerHTML = `<div class="pesel-error">${validation.error}</div>`;
    document.getElementById('data').value = '';
    return;
  }
  
  statusDiv.innerHTML = `<div class="pesel-valid">${validation.error}</div>`;
  
  // Obliczenie daty
  const birthDate = calculateBirthDate(pesel);
  if (birthDate) {
    document.getElementById('data').value = birthDate.formatted;
    document.getElementById('display-data').textContent = birthDate.formatted;
    
    // Ustawienie płci
    const gender = getGenderFromPESEL(pesel);
    if (gender) {
      document.getElementById('plec').value = gender;
      document.getElementById('display-plec').textContent = gender;
    }
  }
});

// ============ OBSŁUGA ZDJĘCIA ============
document.getElementById('photo').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const imgData = event.target.result;
      document.getElementById('display-photo').src = imgData;
      document.getElementById('photo-label').innerHTML = '✅ Zdjęcie dodane';
    };
    reader.readAsDataURL(file);
  }
});

// Kliknięcie na container = kliknięcie na input
document.querySelector('.photo-upload-container').addEventListener('click', function() {
  document.getElementById('photo').click();
});

// ============ AKTUALIZACJA WYŚWIETLANYCH DANYCH ============
function updateDisplay() {
  document.getElementById('display-imie').textContent = document.getElementById('imie').value.toUpperCase();
  document.getElementById('display-nazwisko').textContent = document.getElementById('nazwisko').value.toUpperCase();
  document.getElementById('display-pesel').textContent = document.getElementById('pesel').value;
  
  const data = document.getElementById('data').value;
  if (data) {
    document.getElementById('display-data').textContent = data;
  }
}

// Słuchacze do aktualizacji na żywo
document.getElementById('imie').addEventListener('input', updateDisplay);
document.getElementById('nazwisko').addEventListener('input', updateDisplay);
document.getElementById('pesel').addEventListener('input', updateDisplay);

// ============ GENEROWANIE QR CODE I KODU ============
function generujQR() {
  const imie = document.getElementById('imie').value;
  const nazwisko = document.getElementById('nazwisko').value;
  const pesel = document.getElementById('pesel').value;
  const data = document.getElementById('data').value;
  
  if (!imie || !nazwisko || !pesel || !data) {
    alert('⚠️ Uzupełnij wszystkie dane!');
    return;
  }
  
  const validation = validatePESEL(pesel);
  if (!validation.valid) {
    alert(validation.error);
    return;
  }
  
  const dane = `mObywatel\n${imie.toUpperCase()} ${nazwisko.toUpperCase()}\nPESEL: ${pesel}\nData ur.: ${data}\nWażny do: ${document.getElementById('valid-to').textContent}`;
  
  // Usunięcie starego QR
  document.getElementById('qrcode').innerHTML = '';
  
  // Generowanie nowego QR
  new QRCode(document.getElementById('qrcode'), {
    text: dane,
    width: 100,
    height: 100,
    colorDark: '#0033A0',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
  
  // Losowy kod
  const kod = Math.floor(100000 + Math.random() * 900000);
  document.getElementById('kod').textContent = kod;
}

// ============ ZAPIS DANYCH DO LOCALSTORAGE ============
function zapiszDane() {
  const photo = document.getElementById('display-photo').src;
  
  const dane = {
    imie: document.getElementById('imie').value,
    nazwisko: document.getElementById('nazwisko').value,
    pesel: document.getElementById('pesel').value,
    data: document.getElementById('data').value,
    narodowość: document.getElementById('narodowość').value,
    plec: document.getElementById('plec').value,
    photo: photo,
    timestamp: new Date().toLocaleString('pl-PL')
  };
  
  // Walidacja
  if (!dane.imie || !dane.nazwisko || !dane.pesel) {
    alert('⚠️ Uzupełnij co najmniej: imię, nazwisko, PESEL');
    return;
  }
  
  const validation = validatePESEL(dane.pesel);
  if (!validation.valid) {
    alert(validation.error);
    return;
  }
  
  localStorage.setItem('mObywatelData', JSON.stringify(dane));
  alert('✅ Dane zostały zapisane!');
}

// ============ WCZYTANIE DANYCH Z LOCALSTORAGE ============
function wczytajDane() {
  const stored = localStorage.getItem('mObywatelData');
  
  if (!stored) {
    alert('⚠️ Brak zapisanych danych');
    return;
  }
  
  const dane = JSON.parse(stored);
  
  document.getElementById('imie').value = dane.imie;
  document.getElementById('nazwisko').value = dane.nazwisko;
  document.getElementById('pesel').value = dane.pesel;
  document.getElementById('data').value = dane.data;
  document.getElementById('narodowość').value = dane.narodowość;
  document.getElementById('plec').value = dane.plec;
  document.getElementById('display-photo').src = dane.photo;
  
  // Aktualizacja wyświetlania
  updateDisplay();
  generujQR();
  
  alert(`✅ Wczytano dane z: ${dane.timestamp}`);
}

// ============ CZYSZCZENIE DANYCH ============
function wyczyscDane() {
  if (confirm('⚠️ Na pewno wyczyścić wszystkie dane?')) {
    document.getElementById('imie').value = 'JAN';
    document.getElementById('nazwisko').value = 'KOWALSKI';
    document.getElementById('pesel').value = '85031212345';
    document.getElementById('data').value = '12.03.1985';
    document.getElementById('narodowość').value = 'POLSKA';
    document.getElementById('plec').value = 'MĘŻCZYZNA';
    document.getElementById('display-photo').src = 'https://i.imgur.com/8Z7Z7zK.jpeg';
    document.getElementById('photo-label').innerHTML = '<div class="text-3xl mb-2">📷</div><p class="text-gray-600 text-sm">Kliknij aby dodać zdjęcie</p>';
    
    updateDisplay();
    generujQR();
  }
}

// ============ DRUKOWANIE ============
function drukuj() {
  window.print();
}

// ============ INICJALIZACJA ============
window.addEventListener('load', function() {
  // Ustawienie daty ważności na 10 lat od dzisiaj
  const today = new Date();
  const validTo = new Date(today.getFullYear() + 10, today.getMonth(), today.getDate());
  document.getElementById('valid-to').textContent = 
    `${String(validTo.getDate()).padStart(2, '0')}.${String(validTo.getMonth() + 1).padStart(2, '0')}.${validTo.getFullYear()}`;
  
  // Wczytaj ostatnie dane jeśli istnieją
  const stored = localStorage.getItem('mObywatelData');
  if (stored) {
    const dane = JSON.parse(stored);
    document.getElementById('imie').value = dane.imie;
    document.getElementById('nazwisko').value = dane.nazwisko;
    document.getElementById('pesel').value = dane.pesel;
    document.getElementById('data').value = dane.data;
    document.getElementById('display-photo').src = dane.photo;
    updateDisplay();
  }
  
  // Generuj QR przy starcie
  setTimeout(generujQR, 300);
});