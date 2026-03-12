import { ContactUs } from "@/modules/about/components/ContactUs";

export default async function About() {
  const response = await fetch(`http://localhost:3000/api/about`, {
    cache: "force-cache"
  });
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
