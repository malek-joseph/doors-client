import CardOne from "../cards/listingCard/ListNowCard"


const ListSection = () => {
  return (
    <section className='flex flex-col lg:flex-row  mt-3 '>
             <CardOne
        title="I need a rommmate"
        description="Create a listing to find a potential roommate."
        buttonText="List a place"
        image="/assets/images/bed.png"
      />
             <CardOne
        title="I need a room"
        description="Create a listing to find a suitable room."
        buttonText="Find a place"
        image="/assets/images/looking.png"
      />
        </section> 
      
  )
}

export default ListSection