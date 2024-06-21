import Image from "next/image";
import "./global.css";

export default function Home() {
  return (
    <main>
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <h1>--- Home Page ---</h1>
        <a href="/auth">
          <Image src="/logo.png" alt="Tournaments Logo" width={150} height={150}/>
        </a>
        <label >Social Network for teams to compete in worldwide tournaments. 
          Register to create or join a tournament.
        </label>
        <a href="/auth">
          <button>Register</button>
        </a>
      </div>
    </main>
  );
}