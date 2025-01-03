import LogoutForm from "@/app/components/LogoutForm";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Twój profil</h1>
      <p className="mb-6">Zalogowany użytkownik: [dane użytkownika]</p>
      <LogoutForm />
    </div>
  );
}
