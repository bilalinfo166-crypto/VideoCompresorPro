const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../src/locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

// Dictionary of translations for popular, new, why_choose for supported locales
const translations = {
  ar: { popular: "شائع", new: "جديد", why_choose: "لماذا تختار" },
  cs: { popular: "Populární", new: "Nový", why_choose: "Proč si vybrat" },
  da: { popular: "Populær", new: "Ny", why_choose: "Hvorfor vælge" },
  de: { popular: "Beliebt", new: "Neu", why_choose: "Warum wählen" },
  el: { popular: "Δημοφιλές", new: "Νέο", why_choose: "Γιατί να επιλέξετε" },
  es: { popular: "Popular", new: "Nuevo", why_choose: "Por qué elegir" },
  fa: { popular: "محبوب", new: "جدید", why_choose: "چرا انتخاب کنید" },
  fi: { popular: "Suosittu", new: "Uusi", why_choose: "Miksi valita" },
  fr: { popular: "Populaire", new: "Nouveau", why_choose: "Pourquoi choisir" },
  he: { popular: "פופולרי", new: "חדש", why_choose: "למה לבחור" },
  hi: { popular: "लोकप्रिय", new: "नया", why_choose: "क्यों चुनें" },
  hu: { popular: "Népszerű", new: "Új", why_choose: "Miért válassza" },
  id: { popular: "Populer", new: "Baru", why_choose: "Mengapa memilih" },
  it: { popular: "Popolare", new: "Nuovo", why_choose: "Perché scegliere" },
  ja: { popular: "人気", new: "新規", why_choose: "選ばれる理由" },
  ko: { popular: "인기", new: "새로운", why_choose: "선택하는 이유" },
  nl: { popular: "Populair", new: "Nieuw", why_choose: "Waarom kiezen" },
  no: { popular: "Populær", new: "Ny", why_choose: "Hvorfor velge" },
  pl: { popular: "Popularne", new: "Nowy", why_choose: "Dlaczego warto wybrać" },
  pt: { popular: "Popular", new: "Novo", why_choose: "Por que escolher" },
  ro: { popular: "Popular", new: "Nou", why_choose: "De ce să alegeți" },
  ru: { popular: "Популярные", new: "Новые", why_choose: "Почему выбирают" },
  sv: { popular: "Populär", new: "Ny", why_choose: "Varför välja" },
  th: { popular: "ยอดนิยม", new: "ใหม่", why_choose: "ทำไมต้องเลือก" },
  tr: { popular: "Popüler", new: "Yeni", why_choose: "Neden seçmelisiniz" },
  uk: { popular: "Популярні", new: "Нові", why_choose: "Чому обирають" },
  vi: { popular: "Phổ biến", new: "Mới", why_choose: "Tại sao chọn" },
  zh: { popular: "热门", new: "最新", why_choose: "为什么选择" }
};

const defaultTranslations = {
  popular: "Popular",
  new: "New",
  why_choose: "Why Choose"
};

console.log(`Auditing and fixing ${files.length} translation files...`);

files.forEach(file => {
  const filePath = path.join(localesDir, file);
  const locale = file.replace('.json', '');
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data.common) {
      data.common = {};
    }
    
    const localeTrans = translations[locale] || defaultTranslations;
    let modified = false;
    
    const keysToEnsure = ['popular', 'new', 'why_choose'];
    keysToEnsure.forEach(key => {
      if (!data.common[key]) {
        data.common[key] = localeTrans[key] || defaultTranslations[key];
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✅ Fixed missing common tokens in: ${file}`);
    }
  } catch (err) {
    console.error(`❌ Error parsing or fixing file ${file}:`, err.message);
  }
});

console.log("Translation tokens audit complete!");
