import dynamic from "next/dynamic"

const App = dynamic(() => import("../components/App").then(mod => mod.default), { ssr: false })

export default function Home() {
  return <App />
}
