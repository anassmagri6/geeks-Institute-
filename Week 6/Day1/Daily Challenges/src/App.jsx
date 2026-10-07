import Header from "./components/Header"
import Card from "./components/Card"
import Contact from "./components/Contact"

function App() {
    const features = [
  { icon: "🚀", title: "Fast Performance", description: "Lightning fast loading speeds for optimal user experience." },
  { icon: "⚡", title: "Easy to Use", description: "Intuitive layout and components designed for simple navigation." },
  { icon: "📱", title: "Responsive Design", description: "Looks great on desktop, tablet, and mobile devices." },
]
    return (

<div className="bg-gray-100 min-h-screen flex flex-col justify-between">
<Header />
<main className="max-w-6xl mx-auto my-8 px-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card 
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
                <Contact />
            </main>
</div>





    )

}
export default App;
