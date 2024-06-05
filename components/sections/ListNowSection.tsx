import Link from "next/link";
import CardOne from "../cards/listingCard/ListNowCard"


const ListSection = () => {
  return (
    <section className="flex flex-col xl:flex-row  mt-3 justify-between px-10 ">
      <Link href="/list/place" >
   <CardOne
        title="I need a rommmate"
        description="Create a listing to find a potential roommate."
        buttonText="List a place"
        image="/assets/images/bed.png"
    
      />
      </Link>
      <Link href="list/person">
        <CardOne
        title="I need a room"
        description="Create a listing to find a suitable room."
        buttonText="Find a place"
        image="/assets/images/looking.png"
       
      />
   </Link>
      
    </section>
  );
}

export default ListSection