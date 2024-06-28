
import CardOne from "../cards/listingCard/ListNowCard"


const ListSection = () => {
  return (
    <section className="flex flex-col lg-flex-row md:flex-row xl:flex-row  lg:mt-10 md:mt-10  mt-24 justify-between lg:px-10 gap-5">
      <div className="w-full h-full">
         <CardOne
            title="Have a Place?"
            description="List to find a roommate."
            buttonText="List a place"
            image="/assets/images/bed.png"
          link="/list/place"
          />
      </div>
      <div className="w-full h-full">
 <CardOne
            title="Need a place?"
            description="List to find a place."
            buttonText="Find a place"
            image="/assets/images/looking.png"
            link="/list/person"
          />
      </div>
         
         
    </section>
  );
}

export default ListSection