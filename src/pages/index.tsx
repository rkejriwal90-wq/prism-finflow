import dynamic from "next/dynamic"

const App = dynamic(() => import("../components/App").then(mod => mod.App), { ssr: false })

export default function Home() {
  return <App />
}
