import Image from 'next/image'
import CardOne from './components/cards/CardOne'

export default function Home() {
  return (
    <main className="">
      <div>
        <section className='flex'>
             <CardOne
        title="I need a rommmate"
        description="Create a listing to find a potential roommate."
        buttonText="List my place"
        image="/assets/images/bed.png"
      />
             <CardOne
        title="Your Title"
        description="Your description goes here."
        buttonText="Click me"
        image="/assets/images/looking.png"
      />
        </section> 
      
      </div> 
    </main>
  )
}
