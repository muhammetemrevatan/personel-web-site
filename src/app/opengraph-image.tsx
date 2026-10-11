import { ImageResponse } from "next/og";
export const alt = "Muhammet Emre Vatan — Software engineer and personal portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{background:"#151616",color:"#e5e5df",width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:"80px"}}><div style={{fontSize:20,color:"#bdc9b3",marginBottom:40}}>PERSONAL PORTFOLIO / SOFTWARE ENGINEER</div><div style={{fontSize:88,letterSpacing:-4}}>Muhammet</div><div style={{fontSize:88,letterSpacing:-4}}>Emre Vatan.</div><div style={{fontSize:24,color:"#a0a39c",marginTop:36}}>Projects, ideas, and development notes.</div></div>, size);
}
