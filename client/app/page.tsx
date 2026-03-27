import getCurrentUser from "./_actions/getCurrentUser";
import getListings from "./_actions/getListings";
import Container from "./_components/Container";
import EmptyState from "./_components/EmptyState";
import ListingCard from "./_components/ListingCard";

// interface HomeProps {
//   searchParams: IListingParams;
// }

const Home = async () => {
  const listings = await getListings({ userId: "" });
  const currentUser = await getCurrentUser();

  if (listings?.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings?.map((list) => (
          <ListingCard key={list._id} data={list} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
