import { createClient } from "@supabase/supabase-js";

const url = "https://grivtklckeaphdrjjkpb.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyaXZ0a2xja2VhcGhkcmpqa3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwMTc5NTAsImV4cCI6MjA5OTU5Mzk1MH0.KXR1NTk8vkLR2cpgNpxlatBoiUXq6N7QSGYepcThWaw";

const supabase = createClient(url, key);

const demoRequests = [
  {
    player_name: "ياسين كريم النجار",
    date_of_birth: "2016-04-12",
    age: 10,
    gender: "Male",
    parent_name: "كريم النجار",
    mobile_number: "01012345671",
    whatsapp_number: "01012345671",
    email: "karim.elnaggar@example.com",
    played_before: true,
    tennis_experience: "1–3 Years",
    current_level: "Intermediate",
    tournament_experience: false,
    current_club: "نادي سموحة",
    previous_coach: "كابتن شريف",
    preferred_training_type: "Group Training",
    preferred_days: ["Friday", "Sunday"],
    preferred_time: "Evening",
    additional_notes: "لاعب واعد يرغب في الانضمام لفريق البراعم وتحسين ضربة الباكهاند وضربات التبادلات الطويلة.",
    status: "pending",
    preferred_player_code: "YASSIN10",
  },
  {
    player_name: "فريدة أحمد الشناوي",
    date_of_birth: "2018-02-20",
    age: 8,
    gender: "Female",
    parent_name: "د. أحمد الشناوي",
    mobile_number: "01223456782",
    whatsapp_number: "01223456782",
    email: "dr.shennawy@example.com",
    played_before: false,
    tennis_experience: "Never Played",
    current_level: "Beginner",
    tournament_experience: false,
    preferred_training_type: "Semi-Private",
    preferred_days: ["Saturday", "Tuesday"],
    preferred_time: "Afternoon",
    additional_notes: "مبتدئة تماماً تبدأ التنس لأول مرة، نبحث عن تدريب تأسيسي يركز على التوافق العضلي العصبي وحب اللعبة.",
    status: "pending",
    preferred_player_code: "FARIDA8",
  },
  {
    player_name: "حمزة محمود زهران",
    date_of_birth: "2011-09-05",
    age: 15,
    gender: "Male",
    parent_name: "محمود زهران",
    egypt_tennis_id: "31245",
    mobile_number: "01134567893",
    whatsapp_number: "01134567893",
    email: "zahran.hamza@example.com",
    played_before: true,
    tennis_experience: "More than 3 Years",
    current_level: "Competitive Player",
    tournament_experience: true,
    current_club: "نادي الجزيرة",
    previous_coach: "كابتن حسام",
    preferred_training_type: "Private",
    preferred_days: ["Monday", "Wednesday", "Friday"],
    preferred_time: "Evening",
    additional_notes: "لاعب بطولات حاصل على نقاط بالاتحاد، يحتاج تدريب مكثف على الإرسال والتحضير للبطولات المحلية القادمة.",
    status: "contacted",
    preferred_player_code: "HAMZA15",
  },
  {
    player_name: "نور حازم الباز",
    date_of_birth: "2014-11-18",
    age: 12,
    gender: "Female",
    parent_name: "حازم الباز",
    egypt_tennis_id: "29871",
    mobile_number: "01098765434",
    whatsapp_number: "01098765434",
    email: "hazem.elbaz@example.com",
    played_before: true,
    tennis_experience: "1–3 Years",
    current_level: "Advanced",
    tournament_experience: true,
    current_club: "وادي دجلة",
    preferred_training_type: "Private",
    preferred_days: ["Sunday", "Tuesday", "Thursday"],
    preferred_time: "Afternoon",
    additional_notes: "ترغب في تحسين التمركز في الملعب والكرات الهجومية على الشبكة (Volleys).",
    status: "pending",
    preferred_player_code: "NOUR12",
  },
  {
    player_name: "علي شريف القاضي",
    date_of_birth: "2000-07-01",
    age: 26,
    gender: "Male",
    parent_name: null,
    mobile_number: "01556789015",
    whatsapp_number: "01556789015",
    email: "aly.elkady@example.com",
    played_before: true,
    tennis_experience: "Less than 1 Year",
    current_level: "Intermediate",
    tournament_experience: false,
    preferred_training_type: "Semi-Private",
    preferred_days: ["Friday", "Saturday"],
    preferred_time: "Morning",
    additional_notes: "تدريب للكبار للياقة البدنية وتطوير مستوى اللعب التنافسي في العطلات الأسبوعية.",
    status: "pending",
    preferred_player_code: "ALY26",
  },
];

async function seed() {
  console.log("Seeding demo registration requests...");
  
  for (const item of demoRequests) {
    const { data, error } = await supabase
      .from("player_registration_requests")
      .insert(item)
      .select()
      .single();

    if (error) {
      console.error(`❌ Failed to insert ${item.player_name}:`, error.message);
    } else {
      console.log(`✅ Inserted: ${data.player_name} (ID: ${data.id}, Code: ${data.preferred_player_code})`);
    }
  }

  console.log("All done!");
}

seed();
