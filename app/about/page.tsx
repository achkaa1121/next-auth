import { ContactUs } from "@/modules/about/components/ContactUs";
import { GET } from "@/app/api/about/route";

export default async function About() {
  const response = await GET();
  const content = await response.json();

  return (
    <div>
      <h1>About Page</h1>
      <p>About my company</p>
      {content.message}
      <ContactUs />
    </div>
  );
}
