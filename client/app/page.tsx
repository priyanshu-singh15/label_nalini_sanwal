import { request } from "http";

export default async function HomePage() {

  const base = 'http://localhost:1337/api';
  const token = '6d25706bb1738ce0d594f814ff3591e77cf34e85efaf1af5676f248759074499d69a478be8463462c128952ed0c883d817fc90022b0b8f72a068a20eb3d4a2496e3b7d84f8f001d268cba769034892bc52cd5f0abdb4b33e743b443aef4299db08ef43c47d2c2de4c9ff9b0180c345bf288030f6b22db502835afd105f6efbd6';
  const requestURL = new URL(`${base}/home-page`);
  requestURL.searchParams.append('populate[navbar][populate][navLinks]', 'navLink');
  const response = await fetch(requestURL.toString(), {
    cache: 'no-store', 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);

  return (
    <main>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
    </main>
  );
}