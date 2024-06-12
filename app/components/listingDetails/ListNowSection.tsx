
import CardOne from "../cards/listingCard/ListNowCard"


const ListSection = () => {
  return (
    <section className="flex flex-col xl:flex-row  lg:mt-10 md:mt-10  mt-20 justify-between px-10 gap-5">
          <CardOne
            title="I need a roommate"
            description="Create a listing to find a potential roommate."
            buttonText="List a place"
            image="/assets/images/bed.png"
          link="/list/place"
          />
          <CardOne
            title="I need a room"
            description="Create a listing to find a suitable place for you."
            buttonText="Find a place"
            image="/assets/images/looking.png"
            link="/list/person"
          />
    </section>
  );
}

export default ListSection